import { NextResponse } from "next/server";
import { getPlanById } from "@/lib/plans";
import {
  buildAdminLeadHtml,
  buildCustomerInvoiceHtml,
  buildCustomerInvoiceText,
  sendEmail,
} from "@/lib/email";
import { isDevEmailMode, isSmtpConfigured } from "@/lib/smtp";
import { BRAND } from "@/lib/brand";
import type { InvoiceRequest } from "@/lib/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!isSmtpConfigured()) {
    return NextResponse.json(
      {
        error:
          "Email is not configured on the server. Add SMTP settings to .env.local (see .env.example) and restart the dev server.",
      },
      { status: 503 }
    );
  }

  let body: InvoiceRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const planId = body.planId?.trim();

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!planId) {
    return NextResponse.json({ error: "Plan is required." }, { status: 400 });
  }

  const plan = getPlanById(planId);

  if (!plan || plan.price <= 0) {
    return NextResponse.json({ error: "Invalid consulting pass selected." }, { status: 400 });
  }

  const timestamp = new Date().toISOString();
  const adminEmail = process.env.ADMIN_EMAIL!;

  try {
    await Promise.all([
      sendEmail({
        to: email,
        subject: `Order confirmation: ${plan.name} — ${BRAND.product}`,
        html: buildCustomerInvoiceHtml(plan, name),
        text: buildCustomerInvoiceText(plan, name),
        replyTo: adminEmail,
      }),
      sendEmail({
        to: adminEmail,
        subject: `[Lead] ${plan.name} — ${name}`,
        html: buildAdminLeadHtml(name, email, plan, timestamp),
        text: `New lead\nName: ${name}\nEmail: ${email}\nTier: ${plan.name}\nToken: ${plan.accessToken}\nTime: ${timestamp}`,
        replyTo: email,
      }),
    ]);
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("[invoice] SMTP failed", err);
    return NextResponse.json(
      {
        error:
          "Unable to send invoice. Check SMTP credentials in .env.local and restart the server.",
        detail: process.env.NODE_ENV === "development" ? detail : undefined,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: isDevEmailMode()
      ? "Invoice simulated (dev mode) — check your terminal logs. Configure SMTP for real emails."
      : "Invoice sent to your email — check spam.",
    devMode: isDevEmailMode(),
  });
}
