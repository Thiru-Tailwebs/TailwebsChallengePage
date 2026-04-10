# Implementation Steps: Google Sheets + reCAPTCHA (Apps Script Only)

## Architecture

```
User submits form
       │
       ▼
React Frontend (ChallengeForm.jsx)
  ├─ Gets reCAPTCHA v3 token (client-side)
  └─ Sends form data + token to Apps Script
       │
       ▼
Google Apps Script (server-side)
  ├─ Verifies reCAPTCHA token via Google API
  ├─ Rejects bots (score < 0.5)
  └─ Appends data to Google Sheet
       │
       ▼
Google Sheet (stores submissions)
```

No Cloud Functions needed. Everything runs free on Google's infrastructure.

---

## Step 1: Create the Google Sheet (already done)

Add these headers in Row 1:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | First Name | Last Name | Email | Phone | Company | Idea | Budget | How Did You Hear |

---

## Step 2: Update the Apps Script

Go to your spreadsheet → **Extensions → Apps Script**

Replace the code in `Code.gs` with this:

```javascript
var RECAPTCHA_SECRET = "6LcADbAsAAAAAD3Tm_5s7WqmxhfCuyrAz913s8_9";
var SHEET_NAME = "Sheet1";
var SCORE_THRESHOLD = 0.5;

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Verify reCAPTCHA token
    if (data.recaptchaToken) {
      var recaptchaResult = verifyRecaptcha(data.recaptchaToken);
      if (!recaptchaResult.success || recaptchaResult.score < SCORE_THRESHOLD) {
        return sendResponse({ status: "error", message: "reCAPTCHA verification failed" });
      }
    } else {
      return sendResponse({ status: "error", message: "Missing reCAPTCHA token" });
    }

    // Append to sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    sheet.appendRow([
      new Date(),
      data.firstName || "",
      data.lastName || "",
      data.email || "",
      data.phone || "",
      data.company || "",
      data.idea || "",
      data.budget || "",
      data.hear || ""
    ]);

    return sendResponse({ status: "success" });

  } catch (error) {
    return sendResponse({ status: "error", message: error.toString() });
  }
}

function verifyRecaptcha(token) {
  var url = "https://www.google.com/recaptcha/api/siteverify";
  var payload = {
    secret: RECAPTCHA_SECRET,
    response: token
  };

  var options = {
    method: "post",
    payload: payload,
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, options);
  return JSON.parse(response.getContentText());
}

function sendResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## Step 3: Re-deploy the Apps Script

Since you already have a deployment, you need to update it:

1. In Apps Script editor, click **Deploy → Manage deployments**
2. Click the **pencil icon** (edit) on your existing deployment
3. Under **Version**, select **New version**
4. Click **Deploy**

> The URL stays the same — no code changes needed in your React app.

---

## Step 4: Test

Run this in your terminal:

```bash
curl -L -X POST "https://script.google.com/macros/s/AKfycbxyE2xReTTut1PtbmOv68K4qFcIu6ctTdPYIne-RRvfAJCQ4NYK0LJZZmIZY8zgBccNEQ/exec" -H "Content-Type: application/json" -d '{"recaptchaToken":"test","firstName":"Test","lastName":"User","email":"test@example.com","idea":"Test idea"}'
```

> Note: The test token will fail reCAPTCHA verification (expected). A real submission from the browser with a valid token will work.

---

## What's Already Done (React Frontend)

These files are already updated — no action needed:

- **`index.html`** — reCAPTCHA v3 script loaded with your site key
- **`src/components/ChallengeForm.jsx`** — Gets reCAPTCHA token, sends to Apps Script
- **`.env`** — Contains `VITE_RECAPTCHA_SITE_KEY` and `VITE_APPS_SCRIPT_URL`

---

## Security Notes

- reCAPTCHA **secret key** is in Apps Script (server-side, never exposed to browser)
- reCAPTCHA **site key** is in the frontend (this is safe — it's meant to be public)
- reCAPTCHA v3 is invisible — no user interaction needed
- Bot submissions with score < 0.5 are rejected before writing to the sheet

---

## Before Going Live

- [ ] Update Apps Script code and re-deploy (Step 2 & 3 above)
- [ ] Test form submission locally (`npm run dev`)
- [ ] Verify data appears in Google Sheet
- [ ] Add your production domain to reCAPTCHA allowed domains
- [ ] Set `.env` values in your hosting platform (Vercel/Netlify/etc.)
