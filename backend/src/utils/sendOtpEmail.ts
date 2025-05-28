import { IEmail } from "../types/Email";
import nodeMailer, { SentMessageInfo } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export class SendEmail implements IEmail {
  async sentEmailVerification(
    name: string,
    email: string,
    verificationCode: string
  ): Promise<SentMessageInfo> {
    const userEmail = process.env.USER_EMAIL;
    const userPassword = process.env.USER_PASSWORD;

    if (!userEmail || !userPassword) {
      throw new Error("Email credentials are not set in the environment");
    }

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: userEmail,
        pass: userPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: userEmail,
      to: email,
      subject: "🌟 Welcome to ulearn - Verify Your Email 🌟",
      text: `Hello ${name},\n\nYour verification code is: ${verificationCode}\n\nThanks,\nThe ulearn Team`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; text-align: center; border-radius: 8px; background-color: #f7f7f7; background: url('https://cdn.wallpapersafari.com/13/89/wb4WOU.jpg') no-repeat center center; background-size: cover;">
          <div style="background-color: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 8px; display: inline-block; width: 80%; max-width: 600px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #4CAF50; margin-bottom: 10px;">Welcome to ulearn, ${name}!</h2>
            <p style="font-size: 1.1em; margin-bottom: 20px;">We're excited to have you onboard. Please use the verification code below to complete your email verification:</p>
            <div style="margin: 20px 0; font-size: 1.5em; font-weight: bold; color: #4CAF50; background: #f0f0f0; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
              ${verificationCode}
            </div>
            <p>If you didn’t request this, please ignore this email.</p>
            <br>
            <p>Thank you, ${name}</p>
            <p><strong>The Ulearn Team</strong></p>
            <div style="margin-top: 20px; font-size: 0.9em; color: #777;">
              <p>Follow us on:</p>
              <a href="https://twitter.com/Ulearn" style="margin: 0 5px; text-decoration: none; color: #4CAF50;">Twitter</a> |
              <a href="https://facebook.com/Ulearn" style="margin: 0 5px; text-decoration: none; color: #4CAF50;">Facebook</a> |
              <a href="https://instagram.com/Ulearn" style="margin: 0 5px; text-decoration: none; color: #4CAF50;">Instagram</a>
            </div>
          </div>
        </div>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send verification email");
    }
  }
}