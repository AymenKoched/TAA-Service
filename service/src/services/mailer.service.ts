import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { SendEmailRequest } from '../common';
import { conf } from '../configuration';

@Injectable()
export class MailerService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: conf.mailer.mailHost,
      port: Number(conf.mailer.mailPort),
      secure: false,
      auth: {
        user: conf.mailer.mailUser,
        pass: conf.mailer.mailPassword,
      },
    });
  }

  async sendEmail(request: SendEmailRequest) {
    const mailOptions: Mail.Options = {
      from: request.from ?? {
        name: conf.mailer.mailSenderName,
        address: conf.mailer.mailSender,
      },
      to: request.recipients,
      subject: request.subject,
      html: request.html,
    };

    return this.transporter.sendMail(mailOptions);
  }

  getActivationEmailContent(
    userName: string,
    token: string,
    finalPassword: string,
  ): string {
    const activationUrl = `${conf.front.baseUrl}/${conf.front.activateAccountUri}/${token}`;
    return `<h1>Reset your password</h1>
            <p>Hello ${userName}, Click <a href="${activationUrl}">here</a> to activate your account.</p>
            <p>This is your password: <span>${finalPassword}</span>. You should change it as soon as possible.</p>`;
  }
}
