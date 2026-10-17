import nodemailer from "nodemailer";

export function isDevEmailMode(): boolean {
  return process.env.SMTP_DEV_MODE === "true";
}

export function getSmtpConfig() {
  return {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    admin: process.env.ADMIN_EMAIL,
  };
}

export function isSmtpConfigured(): boolean {
  if (isDevEmailMode()) return true;
  const { host, user, pass, from, admin } = getSmtpConfig();
  return Boolean(host && user && pass && from && admin);
}

export function createTransporter() {
  const { host, port, user, pass } = getSmtpConfig();
  if (!host || !user || !pass) {
    throw new Error("SMTP is not configured");
  }
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}
