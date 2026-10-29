import type { IncomingMessage, ServerResponse } from 'node:http';
import nodemailer from 'nodemailer';

const recipient = 'raushankumarlnct007@gmail.com';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

function sendJson(response: ServerResponse, status: number, payload: { success: boolean; message: string }) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.end(JSON.stringify(payload));
}

function readBody(request: IncomingMessage): Promise<ContactPayload> {
  return new Promise((resolve, reject) => {
    let raw = '';
    request.setEncoding('utf8');
    request.on('data', (chunk: string) => {
      raw += chunk;
      if (raw.length > 100_000) reject(new Error('Request body is too large.'));
    });
    request.on('end', () => {
      try {
        resolve(JSON.parse(raw) as ContactPayload);
      } catch {
        reject(new Error('Request body must be valid JSON.'));
      }
    });
    request.on('error', reject);
  });
}

function getText(value: unknown, maximumLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maximumLength) : '';
}

export async function handleContactRequest(request: IncomingMessage, response: ServerResponse) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.statusCode = 204;
    response.end();
    return;
  }

  if (request.method !== 'POST') {
    sendJson(response, 405, { success: false, message: 'Only POST requests are supported.' });
    return;
  }

  try {
    const payload = await readBody(request);
    const name = getText(payload.name, 100);
    const email = getText(payload.email, 254);
    const subject = getText(payload.subject, 180);
    const message = getText(payload.message, 5000);
    const website = getText(payload.website, 200);

    if (website) {
      sendJson(response, 400, { success: false, message: 'Spam submission rejected.' });
      return;
    }

    if (!name || !email || !subject || !message || !emailPattern.test(email)) {
      sendJson(response, 400, { success: false, message: 'Please provide a valid name, email, subject, and message.' });
      return;
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    if (!smtpUser || !smtpPass) {
      console.error('Contact form is missing SMTP_USER or SMTP_PASS.');
      sendJson(response, 503, { success: false, message: 'The email service is not configured yet.' });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== 'false',
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"Portfolio contact form" <${smtpUser}>`,
      to: recipient,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: [`Name: ${name}`, `Email: ${email}`, '', message].join('\n'),
    });

    sendJson(response, 200, { success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Unable to send contact form message.', error);
    sendJson(response, 500, { success: false, message: 'Unable to send the message right now.' });
  }
}
