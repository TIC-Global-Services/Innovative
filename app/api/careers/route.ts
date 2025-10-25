import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';

const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL ?? "";
const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID ?? "";
const GOOGLE_DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID ?? "";
const SHEET_NAME = "Careers";

// Helper function to convert File to stream
const bufferToStream = (buffer: Buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

export async function POST(req: Request) {
  try {
    // Parse multipart form data
    const formData = await req.formData();
    
    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const department = formData.get('department') as string;
    const experience = formData.get('experience') as string;
    const location = formData.get('location') as string;
    const message = formData.get('message') as string || '';
    const resumeFile = formData.get('resume') as File | null;

    // Validate required fields
    const requiredFields = { name, email, department, experience, location };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json({
        message: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    if (!resumeFile) {
      return NextResponse.json({
        message: "Resume file is required"
      }, { status: 400 });
    }

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID || !GOOGLE_DRIVE_FOLDER_ID) {
      return NextResponse.json({
        message: "Server configuration error - missing Google API credentials"
      }, { status: 500 });
    }

    // Setup Google Auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY,
      },
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file"
      ],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const drive = google.drive({ version: 'v3', auth });

    // Verify spreadsheet access
    try {
      await sheets.spreadsheets.get({
        spreadsheetId: GOOGLE_SHEET_ID,
      });
    } catch (verifyError) {
      console.error("Spreadsheet verification failed:", verifyError);
      return NextResponse.json({
        message: "Error accessing spreadsheet. Please check the sheet ID and permissions.",
        error: verifyError instanceof Error ? verifyError.message : "Unknown error"
      }, { status: 500 });
    }

    // Upload file to Google Drive
    let resumeUrl = '';
    let resumeFileId = '';
    
    try {
      // Convert File to Buffer
      const fileBuffer = Buffer.from(await resumeFile.arrayBuffer());
      
      // Generate unique filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_');
      const fileExtension = resumeFile.name.split('.').pop() || 'pdf';
      const fileName = `Resume_${sanitizedName}_${timestamp}.${fileExtension}`;
      
      // Create readable stream from buffer
      const fileStream = bufferToStream(fileBuffer);
      
      // Upload to Google Drive
      const driveResponse = await drive.files.create({
        requestBody: {
          name: fileName,
          mimeType: resumeFile.type || 'application/octet-stream',
          parents: [GOOGLE_DRIVE_FOLDER_ID],
        },
        media: {
          mimeType: resumeFile.type || 'application/octet-stream',
          body: fileStream,
        },
        fields: 'id,webViewLink',
      });

      resumeFileId = driveResponse.data.id || '';
      
      if (resumeFileId) {
        // Set permissions to view (not edit)
        await drive.permissions.create({
          fileId: resumeFileId,
          requestBody: {
            role: 'reader',
            type: 'anyone',
          },
        });
        
        // Get the webViewLink if available, or construct the URL
        resumeUrl = driveResponse.data.webViewLink || 
                    `https://drive.google.com/file/d/${resumeFileId}/view`;
      }
      
      console.log(`File uploaded successfully: ${fileName} (ID: ${resumeFileId})`);
    } catch (uploadError) {
      console.error("File upload failed:", uploadError);
      return NextResponse.json({
        message: "Error uploading resume file",
        error: uploadError instanceof Error ? uploadError.message : "Unknown error"
      }, { status: 500 });
    }

    // Generate timestamp
    const createdAt = new Date().toISOString();

  
    const rowData = [
   
      name,
      email,
      department,
      experience,
      location,
      message,
      resumeUrl,
      createdAt,
    ];

    // Append data to sheet
    try {
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${SHEET_NAME}!A:I`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [rowData],
        },
      });

      return NextResponse.json({
        success: true,
        message: "Career application submitted successfully!",
        data: {
          name,
          email,
          department,
          resumeUrl,
          submittedAt: createdAt
        }
      }, { status: 200 });

    } catch (sheetError) {
      console.error("Error writing to sheet:", sheetError);
      
      // Attempt to delete the uploaded file if sheet update failed
      if (resumeFileId) {
        try {
          await drive.files.delete({ fileId: resumeFileId });
          console.log(`Deleted orphaned file ${resumeFileId} after sheet update failed`);
        } catch (deleteError) {
          console.error("Error deleting orphaned file:", deleteError);
        }
      }
      
      return NextResponse.json({
        message: "Error saving application data",
        error: sheetError instanceof Error ? sheetError.message : "Unknown error"
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Career submission error:", error);
    return NextResponse.json({
      message: "Internal server error while processing application",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
      throw new Error("Missing Google Sheets API credentials");
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A:I`,
    });

    const rows = response.data.values || [];
    if (rows.length === 0) {
      return NextResponse.json({
        applications: [],
        total: 0
      }, { status: 200 });
    }

    const [headers, ...dataRows] = rows;
    const applications = dataRows.map(row => ({
      createdAt: row[0] || '',
      name: row[1] || '',
      email: row[2] || '',
      department: row[3] || '',
      experience: row[4] || '',
      location: row[5] || '',
      message: row[6] || '',
      resumeUrl: row[7] || '',
     
    }));

    return NextResponse.json({
      applications,
      total: applications.length
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({
      message: "Error fetching applications",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}