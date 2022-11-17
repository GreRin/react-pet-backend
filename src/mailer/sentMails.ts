// import {MailOptions} from "../types/MailOptions";
// import {createTransport, Transporter} from "nodemailer";
// import { env } from '../environments';

import { IUser } from '../types';

const sgMail = require('@sendgrid/mail');

export const sentEmail = async (data: IUser) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // const smtpTransporter: Transporter = createTransport({
  //   host: env.SMTP_OPTIONS.host,
  //   port: env.SMTP_OPTIONS.port,
  //   auth: {
  //     user: (env.SMTP_OPTIONS.auth as any).user,
  //     pass: (env.SMTP_OPTIONS.auth as any).pass,
  //   },
  // } as any);
  //
  const emailOptions = {
    to: '',
    from: '',
    subject: '',
    text: '',
    html: '',
  };

  emailOptions.to = data.email;
  emailOptions.from = process.env.SENDER_EMAIL || '';
  emailOptions.subject = 'Restore password';
  emailOptions.text = `Your password was restored. New password: ${data.password}`;
  emailOptions.html = `Your password was restored. New password: ${data.password}`;

  sgMail
    .send(emailOptions)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error: Error) => {
      console.error(error);
    });
};
