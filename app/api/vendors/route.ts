import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';

const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL ?? "";
const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID ?? "";
const GOOGLE_DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID ?? "";
const SHEET_NAME = "Vendors";

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
    
    // Extract all form fields
    const companyName = formData.get('companyName') as string;
    const registeredAddress = formData.get('registeredAddress') as string;
    const yearEstablished = formData.get('yearEstablished') as string;
    const gstNumber = formData.get('gstNumber') as string;
    const website = formData.get('website') as string || '';
    const contactName = formData.get('contactName') as string;
    const contactEmail = formData.get('contactEmail') as string;
    const contactPhone = formData.get('contactPhone') as string;
    const designation = formData.get('designation') as string;
    const productCategory = formData.get('productCategory') as string;
    const productDescription = formData.get('productDescription') as string;
    const businessType = formData.get('businessType') as string;
    const clientele = formData.get('clientele') as string || '';
    const certifications = formData.get('certifications') as string || '';
    const paymentTerms = formData.get('paymentTerms') as string;
    const deliveryTerms = formData.get('deliveryTerms') as string;
    const additionalInfo = formData.get('additionalInfo') as string || '';
    const productCatalogFile = formData.get('productCatalog') as File | null;

    // Validate required fields
    const requiredFields = {
      companyName,
      registeredAddress,
      yearEstablished,
      gstNumber,
      contactName,
      contactEmail,
      contactPhone,
      designation,
      productCategory,
      productDescription,
      businessType,
      paymentTerms,
      deliveryTerms
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      }, { status: 400 });
    }

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID || !GOOGLE_DRIVE_FOLDER_ID) {
      return NextResponse.json({
        message: "Server configuration error - missing Google API credentials"
      }, { status: 500 });
    }

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

    // First, verify the spreadsheet exists and get sheet info
    console.log("Verifying spreadsheet access...");
    try {
      const spreadsheetInfo = await sheets.spreadsheets.get({
        spreadsheetId: GOOGLE_SHEET_ID,
      });
      
      console.log("Spreadsheet found:", spreadsheetInfo.data.properties?.title);
      console.log("Available sheets:", spreadsheetInfo.data.sheets?.map(s => s.properties?.title));
      
      // Check if our target sheet exists
      const targetSheet = spreadsheetInfo.data.sheets?.find(
        s => s.properties?.title === SHEET_NAME
      );
      
      if (!targetSheet) {
        console.error(`Sheet "${SHEET_NAME}" not found. Available sheets:`, 
          spreadsheetInfo.data.sheets?.map(s => s.properties?.title)
        );
        return NextResponse.json({
          message: `Sheet "${SHEET_NAME}" not found`,
          availableSheets: spreadsheetInfo.data.sheets?.map(s => s.properties?.title)
        }, { status: 400 });
      }
      
    } catch (verifyError) {
      console.error("Spreadsheet verification failed:", verifyError);
      
      if (verifyError instanceof Error) {
        if (verifyError.message.includes('not found')) {
          return NextResponse.json({
            message: "Spreadsheet not found. Check your GOOGLE_SHEET_ID.",
            error: "Invalid spreadsheet ID or insufficient permissions"
          }, { status: 404 });
        }
        
        if (verifyError.message.includes('permission')) {
          return NextResponse.json({
            message: "Permission denied. Make sure the service account has access to the spreadsheet.",
            error: "Insufficient permissions"
          }, { status: 403 });
        }
      }
      
      throw verifyError;
    }

    // Handle product catalog file upload if provided
    let productCatalogUrl = '';
    let catalogFileId = '';
    
    if (productCatalogFile) {
      try {
        // Convert File to Buffer
        const fileBuffer = Buffer.from(await productCatalogFile.arrayBuffer());
        
        // Generate unique filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const sanitizedCompanyName = companyName.replace(/[^a-zA-Z0-9]/g, '_');
        const fileExtension = productCatalogFile.name.split('.').pop() || 'pdf';
        const fileName = `ProductCatalog_${sanitizedCompanyName}_${timestamp}.${fileExtension}`;
        
        // Create readable stream from buffer
        const fileStream = bufferToStream(fileBuffer);
        
        // Upload to Google Drive
        const driveResponse = await drive.files.create({
          requestBody: {
            name: fileName,
            mimeType: productCatalogFile.type || 'application/octet-stream',
            parents: [GOOGLE_DRIVE_FOLDER_ID],
          },
          media: {
            mimeType: productCatalogFile.type || 'application/octet-stream',
            body: fileStream,
          },
          fields: 'id,webViewLink',
        });

        catalogFileId = driveResponse.data.id || '';
        
        if (catalogFileId) {
          // Set permissions to view (not edit)
          await drive.permissions.create({
            fileId: catalogFileId,
            requestBody: {
              role: 'reader',
              type: 'anyone',
            },
          });
          
          // Get the webViewLink if available, or construct the URL
          productCatalogUrl = driveResponse.data.webViewLink || 
                              `https://drive.google.com/file/d/${catalogFileId}/view`;
        }
        
        console.log(`Product catalog uploaded successfully: ${fileName} (ID: ${catalogFileId})`);
      } catch (uploadError) {
        console.error("Product catalog upload failed:", uploadError);
        return NextResponse.json({
          message: "Error uploading product catalog file",
          error: uploadError instanceof Error ? uploadError.message : "Unknown error"
        }, { status: 500 });
      }
    }

    // Generate timestamp
    const createdAt = new Date().toISOString();

    // Prepare row data in the order of spreadsheet columns
    const rowData = [
      companyName || '',
      registeredAddress || '',
      yearEstablished || '',
      gstNumber || '',
      website || '',
      contactName || '',
      contactEmail || '',
      contactPhone || '',
      designation || '',
      productCategory || '',
      productDescription || '',
      productCatalogUrl || '', // Now contains the Google Drive URL or empty string
      businessType || '',
      clientele || '',
      certifications || '',
      paymentTerms || '',
      deliveryTerms || '',
      additionalInfo || '',
      createdAt
    ];

    console.log("Attempting to append vendor data to sheet...");
    
    try {
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${SHEET_NAME}!A:S`, // Adjusted range for all columns (A to S = 19 columns)
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [rowData],
        },
      });

      console.log("Sheets API Response:", response.data);

      return NextResponse.json({ 
        success: true,
        message: "Vendor registration submitted successfully!",
        updatedRange: response.data.updates?.updatedRange,
        vendorInfo: {
          companyName,
          contactEmail,
          productCatalogUrl,
          submittedAt: createdAt
        }
      }, { status: 200 });

    } catch (sheetError) {
      console.error("Error writing to sheet:", sheetError);
      
      // Attempt to delete the uploaded file if sheet update failed
      if (catalogFileId) {
        try {
          await drive.files.delete({ fileId: catalogFileId });
          console.log(`Deleted orphaned file ${catalogFileId} after sheet update failed`);
        } catch (deleteError) {
          console.error("Error deleting orphaned file:", deleteError);
        }
      }
      
      return NextResponse.json({
        message: "Error saving vendor registration data",
        error: sheetError instanceof Error ? sheetError.message : "Unknown error"
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Google Sheets API Error:", error);
    
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      
      // Handle specific error types
      if (error.message.includes('not found')) {
        return NextResponse.json({
          message: "Spreadsheet or sheet not found",
          error: "Check your GOOGLE_SHEET_ID and sheet name",
          details: error.message
        }, { status: 404 });
      }
      
      if (error.message.includes('permission') || error.message.includes('forbidden')) {
        return NextResponse.json({
          message: "Permission denied",
          error: "Service account needs access to the spreadsheet",
          details: error.message
        }, { status: 403 });
      }
      
      if (error.message.includes('invalid_grant')) {
        return NextResponse.json({
          message: "Authentication failed",
          error: "Check your service account credentials",
          details: error.message
        }, { status: 401 });
      }
    }

    return NextResponse.json({
      message: "Error submitting vendor registration",
      error: error instanceof Error ? error.message : String(error)
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
      range: `${SHEET_NAME}!A:S`,
    });

    const rows = response.data.values || [];
    if (rows.length === 0) {
      return NextResponse.json({
        vendors: [],
        total: 0
      }, { status: 200 });
    }

    const [headers, ...dataRows] = rows;
    const vendors = dataRows.map(row => ({
      companyName: row[0] || '',
      registeredAddress: row[1] || '',
      yearEstablished: row[2] || '',
      gstNumber: row[3] || '',
      website: row[4] || '',
      contactName: row[5] || '',
      contactEmail: row[6] || '',
      contactPhone: row[7] || '',
      designation: row[8] || '',
      productCategory: row[9] || '',
      productDescription: row[10] || '',
      productCatalogUrl: row[11] || '',
      businessType: row[12] || '',
      clientele: row[13] || '',
      certifications: row[14] || '',
      paymentTerms: row[15] || '',
      deliveryTerms: row[16] || '',
      additionalInfo: row[17] || '',
      createdAt: row[18] || '',
    }));

    return NextResponse.json({
      vendors,
      total: vendors.length
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching vendors:", error);
    return NextResponse.json({
      message: "Error fetching vendors",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}