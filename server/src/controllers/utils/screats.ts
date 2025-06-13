import { google } from "googleapis";

// Drive - Service Account
export const drive = google.drive({
    version: 'v3', auth: new google.auth.GoogleAuth({
        credentials: JSON.parse(process.env.JOU_CLOUD_CREDENTIALS!),
        scopes: ['https://www.googleapis.com/auth/drive']
    })
});