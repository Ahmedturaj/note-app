import nodemailer from "nodemailer";
import { config } from "../config";

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL_ADDRESS,
      pass: config.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: config.EMAIL_ADDRESS,
    to,
    subject,
    html,
  });
};
