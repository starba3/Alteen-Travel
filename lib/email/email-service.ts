import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import VisaStatusEmail from './templates/VisaStatusEmail';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(config: EmailConfig) {
    this.transporter = nodemailer.createTransport(config);
  }

  async sendEmail(options: EmailOptions) {
    try {
      const result = await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        ...options,
      });
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendVisaStatusUpdate({
    to,
    visaId,
    status,
    applicantName,
    locale = 'en'
  }: {
    to: string;
    visaId: string;
    status: 'approved' | 'rejected' | 'pending';
    applicantName: string;
    locale?: string;
  }) {
    const emailHtml = render(
      VisaStatusEmail({
        visaId,
        status,
        applicantName,
        locale
      })
    );

    return this.sendEmail({
      to,
      subject: `Visa Application ${status.toUpperCase()} - ${visaId}`,
      html: await emailHtml,
    });
  }
}

// Create and export a singleton instance
const emailService = new EmailService({
  host: process.env.EMAIL_HOST || '',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || '',
  },
});

export default emailService; 