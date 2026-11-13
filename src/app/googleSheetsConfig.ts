// Configuration for Google Sheets Integration via Google Apps Script
// You can either paste your deployed Google Apps Script Web App URL below,
// or provide it in a .env file as VITE_GOOGLE_SHEETS_WEBAPP_URL.

export const GOOGLE_SHEETS_SCRIPT_URL: string =
  (import.meta as any).env?.VITE_GOOGLE_SHEETS_WEBAPP_URL ||
  "https://script.google.com/macros/s/AKfycby_PASTE_YOUR_DEPLOYED_APP_SCRIPT_URL_HERE/exec";
