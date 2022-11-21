import { createTransport, Transporter } from 'nodemailer';
import { MailOptions } from '../types/MailOptions';

import { IUser } from '../types';
import { env } from '../environments';

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sentEmail = async (data: IUser, password: string) => {
  const emailOptions: MailOptions = {
    from: process.env.SENDER_EMAIL,
    to: data.email,
    cc: data.email,
    bcc: data.email,
    subject: 'Restore password',
    html: `Your password was restored. New password: ${password}`,
  };

  sgMail
    .send(emailOptions)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error: Error) => {
      console.error(error);
    });
};

export const sentGmailEmail = async (data: IUser, password: string) => {
  // Tutorial how to tune gmail - https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer
  const smtpTransporter: Transporter = createTransport({
    host: env.SMTP_OPTIONS.host,
    port: env.SMTP_OPTIONS.port,
    auth: {
      user: (env.SMTP_OPTIONS.auth as any).user,
      pass: (env.SMTP_OPTIONS.auth as any).pass,
    },
  } as any);

  const emailOptions = {
    to: data.email || '',
    from: process.env.SENDER_EMAIL || '',
    subject: 'Restore password',
    text: `Your password was restored. New password: ${password}`,
    html: `Your password was restored. New password: ${password}`,
  };

  try {
    await smtpTransporter.sendMail(emailOptions);
    console.log('Email sent');
  } catch (error) {
    console.log('Email NOT sent', error);
  }
};

export const sentCancelationEmail = async (data: Partial<IUser>) => {
  const emailOptions = {
    to: data.email || '',
    from: process.env.SENDER_EMAIL || '',
    subject: 'Sorry to see you go!',
    text: `Goodbye, ${data.email}. Hope to see you back sometime soon.`,
    html: '',
  };

  sgMail
    .send(emailOptions)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error: Error) => {
      console.error(error);
    });
};
