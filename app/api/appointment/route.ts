import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL ?? "";
const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID ?? "";
const SHEET_NAME = "Appointments";

export async function POST(req: Request) {
  try {
    const { name, mobile, email, type, service, date, time, message } = await req.json();

    if (!name || !mobile || !email || !type || !service || !date || !time) {
      return NextResponse.json({ message: "All fields except message are required" }, { status: 400 });
    }

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
      throw new Error("Missing Google Sheets API credentials");
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: 'v4', auth });

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

    // Generate timestamp
    const createdAt = new Date().toISOString();

    console.log("Attempting to append data to sheet...");
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A:I`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, mobile, email, type, service, date, time, message || '', createdAt]],
      },
    });

    console.log("Sheets API Response:", response.data);

    return NextResponse.json({ 
      message: "Appointment saved successfully!",
      updatedRange: response.data.updates?.updatedRange
    }, { status: 200 });

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
      message: "Error saving appointment",
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}