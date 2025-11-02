import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export default async function sendEmail({ email, emailType, userId }: any) {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        emailVerificationToken: hashedToken,
        emailVerificationTokenExpiry: Date.now() + 10 * 60 * 1000,
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 10 * 60 * 1000,
      });
    }

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USERID,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const verificationLink = emailType === 'VERIFY'
      ? `${process.env.DOMAIN}/verify-email?token=${hashedToken}`
      : `${process.env.DOMAIN}/reset-password?token=${hashedToken}`;
    const mailOptions = {
      from: 'sudharsan@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>${emailType === 'VERIFY' ? 'Email Verification' : 'Password Reset'
        }</h2>

      <p>
        ${emailType === 'VERIFY'
          ? 'Please click the link below to verify your email address:'
          : 'Please click the link below to reset your password:'

        }
      </p>
      <a href="${verificationLink}" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px">${emailType === 'VERIFY' ? 'Verify Email' : 'Reset Password'}</a>
    </div>
  `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (err: any) {
    throw new Error(err.message);
  }
}