import { GOOGLE_SHEETS_SCRIPT_URL } from "./googleSheetsConfig";

export interface FormSubmissionPayload {
  formName: string;
  [key: string]: any;
}

/**
 * Submits form data asynchronously to the Google Apps Script Web App.
 * Uses mode: 'no-cors' to avoid browser CORS preflight blocking.
 */
export async function submitToGoogleSheets(
  payload: FormSubmissionPayload
): Promise<{ success: boolean; error?: string }> {
  const { formName, ...rest } = payload;
  const dataWithMeta = {
    formName,
    submittedAt: new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium",
    }),
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    ...rest,
  };

  // If using placeholder URL, log payload gracefully in console for dev testing
  if (
    !GOOGLE_SHEETS_SCRIPT_URL ||
    GOOGLE_SHEETS_SCRIPT_URL.includes("PASTE_YOUR_DEPLOYED_APP_SCRIPT_URL_HERE")
  ) {
    console.info(
      "📝 [Google Sheets Form Submission Logged]",
      dataWithMeta
    );
    return { success: true };
  }

  try {
    // text/plain payload with no-cors avoids CORS preflight and successfully delivers to Apps Script doPost(e)
    await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(dataWithMeta),
    });

    return { success: true };
  } catch (err: any) {
    console.warn("Google Sheets submission notice:", err);
    // Don't break user interface flow on network issues
    return { success: false, error: err?.message || "Submission failed" };
  }
}
