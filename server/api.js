/**
 * API handler for challenge form submissions.
 * Works as Vite dev middleware and can be deployed as a serverless function.
 */

export async function handleSubmit(body) {
  const { firstName, lastName, email, idea } = body;

  // Server-side validation
  const errors = [];
  if (!firstName?.trim()) errors.push("firstName is required");
  if (!lastName?.trim()) errors.push("lastName is required");
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("valid email is required");
  if (!idea?.trim()) errors.push("idea is required");

  if (errors.length > 0) {
    return { status: 400, body: { success: false, errors } };
  }

  // In production, integrate with your CRM/email service here:
  // - Send to HubSpot, Salesforce, or Notion
  // - Trigger a confirmation email via SendGrid/Resend
  // - Post to Slack webhook for team notification
  console.log("[Challenge Submission]", { firstName, lastName, email, idea: idea.slice(0, 100) });

  return {
    status: 200,
    body: { success: true, message: "Slot reserved. We'll be in touch within 2 hours." }
  };
}

/**
 * Vite dev server middleware plugin
 */
export function apiMiddleware() {
  return {
    name: "api-middleware",
    configureServer(server) {
      server.middlewares.use("/api/submit-challenge", async (req, res) => {
        if (req.method !== "POST") {
          res.writeHead(405, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        let body = "";
        for await (const chunk of req) body += chunk;

        try {
          const data = JSON.parse(body);
          const result = await handleSubmit(data);
          res.writeHead(result.status, { "Content-Type": "application/json" });
          res.end(JSON.stringify(result.body));
        } catch {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON" }));
        }
      });
    }
  };
}
