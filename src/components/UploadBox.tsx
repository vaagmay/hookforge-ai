"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function UploadBox() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [transcript, setTranscript] = useState("");
  

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);
    setMessage("");

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("hookforge_videos")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      setMessage("Upload failed.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("hookforge_videos")
      .getPublicUrl(fileName);

    setVideoUrl(data.publicUrl);
    
    setMessage("Transcribing video...");

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
      "/api/transcribe",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result.text) {
      setTranscript(result.text);
    }

    setMessage("Upload successful!");
    setUploading(false);
  };

  return (
    <div className="w-full max-w-xl p-8 rounded-3xl border border-zinc-800 bg-zinc-950">
      <div className="flex flex-col items-center text-center">
        <UploadCloud size={48} className="mb-4 text-blue-500" />

        <h2 className="text-2xl font-bold mb-2">
          Upload UGC Ad Video
        </h2>

        <p className="text-zinc-400 mb-6">
          Upload MP4 ad creatives for AI analysis
        </p>

        <input
          type="file"
          accept="video/mp4"
          onChange={handleUpload}
          className="mb-4"
        />

        {uploading && (
          <p className="text-blue-400">
            Uploading video...
          </p>
        )}

        {message && (
          <p className="mt-4 text-green-400">
            {message}
          </p>
        )}

        {videoUrl && (
          <video
            src={videoUrl}
            controls
            className="mt-6 rounded-xl"
          />
        )}

        {transcript && (
          <div className="mt-6 w-full text-left">
            <h3 className="text-xl font-bold mb-2">
              Transcript
            </h3>

            <div className="p-4 rounded-xl bg-zinc-900 text-zinc-300">
              {transcript}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}