"use client";

import { useState, useRef } from "react";

export default function RespondPage() {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<any>(null);
  const chunksRef = useRef<any[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = async () => {
    mediaRecorderRef.current.stop();
    setRecording(false);

    const blob = new Blob(chunksRef.current, { type: "audio/webm" });

    const formData = new FormData();
    formData.append("file", blob);

    await fetch("/api/transcribe", {
      method: "POST",
      body: formData,
    });

    alert("Response sent!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Answer Questions</h1>

      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop & Send</button>
      )}
    </div>
  );
}