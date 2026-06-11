import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, company, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: "Email service not configured." });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Athena Data Contact Form <info@athenadata.ca>",
      to: ["info@athenadata.ca"],
      reply_to: email,
      subject: `New inquiry from ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #1a2744; margin-top: 0;">New inquiry from athenadata.ca</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 100px; vertical-align: top;"><strong>Name</strong></td>
              <td style="padding: 8px 0; color: #1a2744;">${name}</td>
            </tr>
            ${company ? `<tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Company</strong></td>
              <td style="padding: 8px 0; color: #1a2744;">${company}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Email</strong></td>
              <td style="padding: 8px 0; color: #1a2744;"><a href="mailto:${email}" style="color: #c9a84c;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Message</strong></td>
              <td style="padding: 8px 0; color: #1a2744; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;" />
          <p style="color: #999; font-size: 12px; margin: 0;">Sent from the contact form at athena-dataservices.com</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Failed to send message. Please try again." });
  }

  return res.status(200).json({ success: true });
}
