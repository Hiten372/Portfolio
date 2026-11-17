// SMTP contact handler. Works as a Vercel serverless function (/api/contact)
// and is also mounted by server.js for local use / Render / VPS hosting.
const nodemailer = require("nodemailer");

// ---- tiny in-memory rate limit (5 requests / 10 min per IP) ----
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
function isLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const oneLine = (s) =>
  String(s)
    .replace(/[\r\n]+/g, " ")
    .trim();

let transporter;
function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, // true for 465, false for 587 (STARTTLS)
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed." });
  }

  const body = req.body || {};

  // Honeypot: bots tick the hidden checkbox. Pretend success, send nothing.
  if (body.botcheck)
    return res.status(200).json({ success: true, message: "Message sent." });

  const ip = String(
    req.headers["x-forwarded-for"] ||
      (req.socket && req.socket.remoteAddress) ||
      "",
  )
    .split(",")[0]
    .trim();
  if (isLimited(ip)) {
    return res
      .status(429)
      .json({
        success: false,
        message: "Too many messages. Please try again later.",
      });
  }

  const name = oneLine(body.name || "");
  const email = oneLine(body.email || "");
  const topic = oneLine(body.project_type || "");
  const message = String(body.message || "").trim();

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Name, email and message are required.",
      });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter a valid email address." });
  }
  if (name.length > 100 || topic.length > 150 || message.length > 5000) {
    return res
      .status(400)
      .json({ success: false, message: "One of the fields is too long." });
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("SMTP environment variables are missing.");
    return res
      .status(500)
      .json({ success: false, message: "Mail server is not configured." });
  }

  try {
    await getTransporter().sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_FROM || SMTP_USER}>`,
      to: process.env.MAIL_TO || SMTP_USER,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`, // hitting Reply goes to the visitor
      subject: `New portfolio message from ${name}${topic ? ` — ${topic}` : ""}`,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic || "-"}\n\n${message}`,

      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:30px 15px;background:#f3f4f8;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">

  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(15,23,42,0.08);">

    <!-- Header -->
    <div style="background:#111827;padding:35px 30px;text-align:center;">
      <div style="display:inline-block;padding:8px 16px;border-radius:30px;background:rgba(139,92,246,0.15);color:#c4b5fd;font-size:12px;font-weight:bold;letter-spacing:1.5px;margin-bottom:15px;">
        PORTFOLIO CONTACT
      </div>

      <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">
        You've Got a New Message!
      </h1>

      <p style="margin:12px 0 0;color:#9ca3af;font-size:14px;line-height:1.6;">
        Someone just reached out through your portfolio website.
      </p>
    </div>

    <!-- Content -->
    <div style="padding:30px;">

      <h2 style="margin:0 0 20px;font-size:17px;color:#111827;">
        Contact Information
      </h2>

      <!-- Name -->
      <div style="padding:15px;background:#f8fafc;border-radius:10px;margin-bottom:12px;">
        <p style="margin:0 0 5px;color:#94a3b8;font-size:11px;font-weight:bold;letter-spacing:1px;">
          FULL NAME
        </p>
        <p style="margin:0;color:#1e293b;font-size:15px;font-weight:600;">
          ${esc(name)}
        </p>
      </div>

      <!-- Email -->
      <div style="padding:15px;background:#f8fafc;border-radius:10px;margin-bottom:12px;">
        <p style="margin:0 0 5px;color:#94a3b8;font-size:11px;font-weight:bold;letter-spacing:1px;">
          EMAIL ADDRESS
        </p>
        <a href="mailto:${esc(email)}" style="color:#7c3aed;text-decoration:none;font-size:15px;font-weight:600;">
          ${esc(email)}
        </a>
      </div>

      <!-- Topic -->
      <div style="padding:15px;background:#f8fafc;border-radius:10px;margin-bottom:25px;">
        <p style="margin:0 0 5px;color:#94a3b8;font-size:11px;font-weight:bold;letter-spacing:1px;">
          MESSAGE TOPIC
        </p>
        <p style="margin:0;color:#1e293b;font-size:15px;font-weight:600;">
          ${esc(topic || "-")}
        </p>
      </div>

      <!-- Message -->
      <h2 style="margin:0 0 12px;font-size:17px;color:#111827;">
        Message Details
      </h2>

      <div style="background:#faf8ff;border-left:4px solid #8b5cf6;padding:20px;border-radius:4px 10px 10px 4px;">
        <p style="margin:0;color:#475569;font-size:14px;line-height:1.8;white-space:pre-wrap;overflow-wrap:anywhere;">${esc(message)}</p>
      </div>

      <!-- Reply Button -->
      <div style="text-align:center;margin-top:30px;">
        <a href="mailto:${esc(email)}"
           style="display:inline-block;background:#7c3aed;color:#ffffff;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:14px;font-weight:bold;">
          Reply to ${esc(name)}
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background:#f8fafc;padding:22px 30px;text-align:center;border-top:1px solid #e5e7eb;">
      <p style="margin:0 0 6px;color:#64748b;font-size:12px;">
        This message was sent through your portfolio contact form.
      </p>
      <p style="margin:0;color:#94a3b8;font-size:11px;">
        &copy; ${new Date().getFullYear()} Portfolio Website. All rights reserved.
      </p>
    </div>

  </div>

</body>
</html>
`,
    });
    return res.status(200).json({ success: true, message: "Message sent." });
  } catch (err) {
    console.error("SMTP send failed:", err.message);
    return res
      .status(500)
      .json({
        success: false,
        message: "Could not send the message. Please try again.",
      });
  }
};
