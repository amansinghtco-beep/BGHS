// Configuration for Google Sheets Integration via Google Apps Script
// Deployed BGHS Google Apps Script Web App URL:
export const GOOGLE_SHEETS_SCRIPT_URL: string =
  (import.meta as any).env?.VITE_GOOGLE_SHEETS_WEBAPP_URL ||
  "https://script.google.com/macros/s/AKfycbyfVGsWdmY__CzsShvF4PlaCq6U6Z8sTXospViv4pF9v8a8KWU4ouThjCs6qsnTPQuj/exec";
