import nodemailer from 'nodemailer';
import { envs } from '../../plugins/envs.plugins';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

interface Attachments {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECERT,
    },
  });

  constructor() {}

  async sendMail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments } = options;

    try {
      await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  sendEmailWithFileSystemLogs = async (
    to: string | string[]
  ): Promise<boolean> => {
    const attachments: Attachments[] = [
      {
        filename: 'logs-all.log',
        path: 'logs/logs-all.log',
      },
    ];

    const sent = await this.sendMail({
      to,
      subject: 'Logs de sistema',
      htmlBody: `
      <h1>Logs sistema NOC</h1>
      <p>Se adjunta los logs del sistema</p>
      <p>Saludos</p>`,
      attachments,
    });

    console.log({ sent });

    return sent;
  };
}
