import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, questions } = await req.json();

  const token = Math.random().toString(36).substring(2);
  const link = `${process.env.BASE_URL}/respond?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const questionList = questions
    .map((q: string, i: number) => `Q${i + 1}: ${q}`)
    .join("\n");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Please answer these questions",
    text: `${questionList}\n\nClick here to respond:\n${link}`,
  });

  return NextResponse.json({ success: true });
}