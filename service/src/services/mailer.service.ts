import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { SendEmailRequest, UserResponse } from '../common';
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

  async sendActivationEmail(
    user: UserResponse,
    token: string,
    finalPassword?: string,
  ): Promise<void> {
    const emailRequest = new SendEmailRequest({
      recipients: [{ name: user.name, address: user.email }],
      subject: 'Activate your account',
      html: this.getActivationEmailContent(user.name, token, finalPassword),
    });
    await this.sendEmail(emailRequest);
  }

  async sendResetPasswordEmail(
    user: UserResponse,
    token: string,
  ): Promise<void> {
    const emailRequest = new SendEmailRequest({
      recipients: [{ name: user.name, address: user.email }],
      subject: 'Reset your password',
      html: this.getResetPasswordEmailContent(user.name, token),
    });
    await this.sendEmail(emailRequest);
  }

  async sendAdherentEmail(
    user: UserResponse,
    finalPassword?: string,
  ): Promise<void> {
    const emailRequest = new SendEmailRequest({
      recipients: [{ name: user.name, address: user.email }],
      subject: 'Welcome aboard',
      html: this.getAdherentEmailContent(user.name, finalPassword),
    });
    await this.sendEmail(emailRequest);
  }

  private getActivationEmailContent(
    userName: string,
    token: string,
    finalPassword?: string,
  ): string {
    const activationUrl = `${conf.front.baseUrl}/${conf.front.activateAccountUri}/${token}`;
    const passwordSection = finalPassword
      ? `<p>This is your password: <span>${finalPassword}</span>. You should change it as soon as possible.</p>`
      : '';

    return `<h1>Activate your account</h1>
            <p>Hello ${userName}, Click <a href="${activationUrl}">here</a> to activate your account.</p>
            ${passwordSection}`;
  }

  private getResetPasswordEmailContent(
    userName: string,
    token: string,
  ): string {
    const activationUrl = `${conf.front.baseUrl}/${conf.front.resetPasswordUri}/${token}`;
    return `<h1>Reset your password</h1>
            <p>Hello ${userName}, Click <a href="${activationUrl}">here</a> to reset your password.</p>`;
  }

  private getAdherentEmailContent(
    userName: string,
    finalPassword: string,
  ): string {
    return `<h1>Welcome to TAA platform</h1>
            <p>Hello ${userName}, This is your password: <span>${finalPassword}</span>. You should change it as soon as possible.</p>`;
  }
}
