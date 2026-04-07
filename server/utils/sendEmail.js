import nodemailer from 'nodemailer';

const hasConfiguredEmailCredentials = () => {
  const requiredValues = [
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS,
  ];

  if (requiredValues.some((value) => !value)) {
    return false;
  }

  const placeholders = new Set(['your_user', 'your_pass', 'dummy_user', 'dummy_pass']);
  return !placeholders.has(process.env.EMAIL_USER) && !placeholders.has(process.env.EMAIL_PASS);
};

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
  port: Number(process.env.EMAIL_PORT) || 2525,
  auth: {
    user: process.env.EMAIL_USER || 'dummy_user',
    pass: process.env.EMAIL_PASS || 'dummy_pass',
  },
});

const sendEmail = async (options) => {
  const mailOptions = {
    from: 'Technosphere 2026 <noreply@technosphere.edu>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export const sendOTPEmail = async (email, otp, name) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
          .header { background: #1a1a1a; color: #fff; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background: #fff; padding: 20px; }
          .otp { font-size: 32px; font-weight: bold; color: #007bff; text-align: center; margin: 20px 0; letter-spacing: 5px; }
          .footer { background: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; color: #666; }
          .note { color: #666; font-size: 14px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Technosphere 2026</h1>
            <p>Admin Registration - Email Verification</p>
          </div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>Thank you for registering as an admin for Technosphere 2026. Please use the OTP below to verify your email address.</p>
            <div class="otp">${otp}</div>
            <p class="note">
              <strong>Important:</strong><br>
              - This OTP is valid for 10 minutes only<br>
              - Do not share this OTP with anyone<br>
              - If you didn't request this, please ignore this email
            </p>
          </div>
          <div class="footer">
            <p>&copy; 2026 Technosphere, Netaji Subhas University</p>
          </div>
        </div>
      </body>
    </html>
  `;

  if (!hasConfiguredEmailCredentials()) {
    console.warn(`[OTP FALLBACK] Email credentials not configured. OTP for ${email}: ${otp}`);
    return { delivered: false, fallback: 'console' };
  }

  const mailOptions = {
    from: 'Technosphere 2026 <noreply@technosphere.edu>',
    to: email,
    subject: 'Admin Email Verification - OTP',
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { delivered: true, fallback: null };
  } catch (error) {
    console.error('OTP email delivery failed:', error.message);
    console.warn(`[OTP FALLBACK] Using console OTP for ${email}: ${otp}`);
    return { delivered: false, fallback: 'console' };
  }
};

export default sendEmail;
