import type { ConsultingPlan } from "./types";
import { BRAND } from "./brand";
import { formatPriceLabel } from "./plans";
import { createTransporter, getSmtpConfig, isDevEmailMode, isSmtpConfigured } from "./smtp";

export function buildCustomerInvoiceHtml(plan: ConsultingPlan, customerName: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: system-ui, sans-serif; color: #1e293b; max-width: 560px; margin: 0 auto; padding: 24px;">
  <h1 style="color: #059669; font-size: 22px;">${BRAND.product} — Order confirmation</h1>
  <p>Hi ${escapeHtml(customerName)},</p>
  <p>Thank you for requesting a <strong>${escapeHtml(plan.name)}</strong>. Below are your order details.</p>
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <tr style="background: #f8fafc;">
      <td style="padding: 12px; border: 1px solid #e2e8f0;">Consulting Pass</td>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">${escapeHtml(plan.name)}</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">One-time price</td>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">${formatPriceLabel(plan.price)}</td>
    </tr>
    <tr style="background: #f8fafc;">
      <td style="padding: 12px; border: 1px solid #e2e8f0;">Report Generators</td>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">${plan.toolsUnlocked} unlocked</td>
    </tr>
  </table>
  <p>Please reply to this message to confirm your order, and we will provide the payment details. Thank you.</p>
  <p style="font-size: 13px; color: #64748b;">${BRAND.name} typically responds within one business day.</p>
  <p style="font-size: 12px; color: #94a3b8; margin-top: 32px;">© ${BRAND.year} ${BRAND.product}. Personal Portfolio &amp; Consulting Services.</p>
</body>
</html>`;
}

export function buildCustomerInvoiceText(plan: ConsultingPlan, customerName: string): string {
  return `Hi ${customerName},

Thank you for requesting the ${plan.name}.

Consulting Pass: ${plan.name}
Price: ${formatPriceLabel(plan.price)} (one-time)
Report Generators unlocked: ${plan.toolsUnlocked}

Please reply to this message to confirm your order, and we will provide the payment details. Thank you.

— ${BRAND.product}`;
}

export function buildAdminLeadHtml(
  name: string,
  email: string,
  plan: ConsultingPlan,
  timestamp: string
): string {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; padding: 20px;">
  <h2 style="color: #059669;">New consulting pass lead — manual review</h2>
  <ul>
    <li><strong>Name:</strong> ${escapeHtml(name)}</li>
    <li><strong>Email:</strong> ${escapeHtml(email)}</li>
    <li><strong>Tier:</strong> ${escapeHtml(plan.name)} (Tier ${plan.tier})</li>
    <li><strong>Price:</strong> ${formatPriceLabel(plan.price)}</li>
    <li><strong>Tools:</strong> ${plan.toolsUnlocked} generators</li>
    <li><strong>Access Token to send:</strong> <code>${escapeHtml(plan.accessToken)}</code></li>
    <li><strong>Time:</strong> ${escapeHtml(timestamp)}</li>
  </ul>
  <p>Fulfill token <strong>${escapeHtml(plan.accessToken)}</strong> after payment confirmation. Reply-To: ${escapeHtml(email)}</p>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  if (isDevEmailMode()) {
    console.info("[email dev mode — not sent]", {
      to: options.to,
      subject: options.subject,
      replyTo: options.replyTo,
      preview: options.text.slice(0, 400),
    });
    return;
  }

  if (!isSmtpConfigured()) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, and ADMIN_EMAIL."
    );
  }

  const { from } = getSmtpConfig();
  const transporter = createTransporter();

  try {
    await transporter.sendMail({
      from: `"${BRAND.product}" <${from!}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "SMTP send failed";
    console.error("[email] SMTP error:", message);
    throw new Error(`Failed to send email: ${message}`);
  }
}
