"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState<string[]>([""]);

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const updateQuestion = (value: string, index: number) => {
    const newQ = [...questions];
    newQ[index] = value;
    setQuestions(newQ);
  };

  const sendEmail = async () => {
    await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({ email, questions }),
    });
    alert("Email sent!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {/* Email Container */}
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl border border-gray-200">

        {/* Header */}
        <div className="border-b px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Compose Email
          </h1>
          <p className="text-sm text-gray-500">
            Write your questions in a formal email format
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* To Field */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">To:</label>
            <input
              type="email"
              placeholder="recipient@email.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Subject (optional styling feel) */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Subject:</label>
            <input
              type="text"
              value="Inquiry / Questions"
              readOnly
              className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500"
            />
          </div>

          {/* Message Body */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Message:
            </label>

            <div className="border border-gray-300 rounded-lg p-4 space-y-3 bg-gray-50">
              <p className="text-sm text-gray-700">Good day,</p>

              {questions.map((q, i) => (
                <input
                  key={i}
                  placeholder={`Enter question ${i + 1}`}
                  value={q}
                  onChange={(e) => updateQuestion(e.target.value, i)}
                  className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              ))}

              <p className="text-sm text-gray-700">
                Thank you, and I look forward to your response.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={addQuestion}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add another question
            </button>

            <button
              onClick={sendEmail}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow"
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}