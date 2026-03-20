import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import OpenAI from "openai";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "audio.webm");
  await writeFile(filePath, buffer);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const transcription = await openai.audio.transcriptions.create({
    file: require("fs").createReadStream(filePath),
    model: "gpt-4o-transcribe",
  });

  const text = transcription.text;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "Response Received",
    text: text,
  });

  return NextResponse.json({ text });
}