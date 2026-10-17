import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { isDevEmailMode, isSmtpConfigured } from "@/lib/smtp";
import { BRAND } from "@/lib/brand";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!isSmtpConfigured()) {
    return NextResponse.json(
      {
        error:
          "Contact form is temporarily unavailable. Email me directly using the address on the contact page.",
      },
      { status: 503 }
    );
  }

  let body: { name?: string; email?: string; subject?: string; message?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const subject = body.subject?.trim() || "General inquiry";
  const message = body.message?.trim();

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  if (!message || message.length < 10) {
    return NextResponse.json({ error: "Please enter a message (at least 10 characters)." }, { status: 400 });
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? BRAND.email;
  const timestamp = new Date().toISOString();

  const html = `
<!DOCTYPE html>
<html><body style="font-family: system-ui, sans-serif; padding: 20px;">
  <h2 style="color: #059669;">Contact form — ${BRAND.product}</h2>
  <p><strong>Name:</strong> ${escapeHtml(name)}</p>
  <p><strong>Email:</strong> ${escapeHtml(email)}</p>
  <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
  <p><strong>Time:</strong> ${escapeHtml(timestamp)}</p>
  <hr />
  <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
</body></html>`;

  const text = `Contact from ${name} <${email}>\nSubject: ${subject}\nTime: ${timestamp}\n\n${message}`;

  try {
    await Promise.all([
      sendEmail({
        to: adminEmail,
        subject: `[Contact] ${subject} — ${name}`,
        html,
        text,
        replyTo: email,
      }),
      sendEmail({
        to: email,
        subject: `I received your message — ${BRAND.product}`,
        html: `<p>Hi ${escapeHtml(name)},</p><p>Thank you for contacting me. I received your message and will reply within one business day.</p><p>— ${BRAND.name}</p>`,
        text: `Hi ${name},\n\nThank you for contacting me. I received your message and will reply within one business day.\n\n— ${BRAND.name}`,
        replyTo: adminEmail,
      }),
    ]);
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Unable to send message. Please try again later." }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: isDevEmailMode()
      ? "Message logged (dev mode). Configure SMTP for real delivery."
      : "Message sent — I'll reply within one business day.",
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
