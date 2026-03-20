import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, questions } = await req.json();

    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    
    const formattedQuestions = questions
      .map((q: string, i: number) => `${i + 1}. ${q}`)
      .join("<br>");

    
    await transporter.sendMail({
      from: `"Question Sender" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Inquiry / Questions",
      html: `
        <p>Good day,</p>

        <p>Please see my questions below:</p>

        <p>${formattedQuestions}</p>

        <p>Thank you, and I look forward to your response.</p>
      `,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
