"use client";

import { useState } from "react";

import {
  UploadCloud,
  Loader2,
  CheckCircle2,
  Sparkles,
  BrainCircuit,
  BarChart3,
  WandSparkles,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

import AnalysisDashboard from "./AnalysisDashboard";

export default function UploadBox() {
  const [uploading, setUploading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [videoUrl, setVideoUrl] =
    useState("");

  const [transcript, setTranscript] =
    useState("");

  const [analysis, setAnalysis] =
    useState<any>(null);

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file =
        event.target.files?.[0];

      if (!file) return;

      setUploading(true);

      setMessage("Uploading creative...");

      const fileName = `${Date.now()}-${file.name}`;

      const { error } =
        await supabase.storage
          .from("hookforge_videos")
          .upload(fileName, file);

      if (error) {
        console.error(error);

        setMessage("Upload failed.");

        setUploading(false);

        return;
      }

      const { data } =
        supabase.storage
          .from("hookforge_videos")
          .getPublicUrl(fileName);

      setVideoUrl(data.publicUrl);

      setMessage(
        "Generating transcript..."
      );

      const formData =
        new FormData();

      formData.append("file", file);

      const response = await fetch(
        "/api/transcribe",
        {
          method: "POST",
          body: formData,
        }
      );

      const result =
        await response.json();

      if (result.text) {
        setTranscript(result.text);

        setMessage(
          "Analyzing conversion psychology..."
        );

        const analysisResponse =
          await fetch(
            "/api/analyze",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                transcript:
                  result.text,
              }),
            }
          );

        const analysisData =
          await analysisResponse.json();

        try {
          const cleaned =
            analysisData.analysis
              .replace(
                /```json/g,
                ""
              )
              .replace(/```/g, "")
              .trim();

          const parsed =
            JSON.parse(cleaned);

          setAnalysis(parsed);

          setMessage(
            "AI intelligence ready"
          );
        } catch (error) {
          console.error(
            "JSON parse error:",
            error
          );

          setMessage(
            "Analysis parsing failed"
          );
        }
      }

      setUploading(false);
    } catch (error) {
      console.error(error);

      setMessage(
        "Something went wrong"
      );

      setUploading(false);
    }
  };

  return (
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute -top-20 left-1/3 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full" />

      <div className="grid xl:grid-cols-[430px_1fr] gap-8 relative z-10">
        {/* LEFT SIDEBAR */}
        <div className="sticky top-6 h-fit">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-zinc-900 to-black backdrop-blur-2xl shadow-[0_0_60px_rgba(59,130,246,0.15)]">
            {/* Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_45%)]" />

            <div className="relative p-7">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 shadow-lg shadow-blue-500/10">
                  <WandSparkles
                    size={30}
                    className="text-blue-400"
                  />
                </div>

                <div>
                  <h2 className="text-3xl font-black tracking-tight">
                    HookForge AI
                  </h2>

                  <p className="text-zinc-400">
                    Creative Intelligence
                    Platform
                  </p>
                </div>
              </div>

              {/* Upload Card */}
              <label className="group relative flex flex-col items-center justify-center rounded-[28px] border border-dashed border-zinc-700 bg-zinc-900/70 p-10 cursor-pointer overflow-hidden transition-all duration-500 hover:border-blue-500 hover:scale-[1.01]">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-500" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex items-center justify-center w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 shadow-lg shadow-blue-500/10">
                    <UploadCloud
                      size={42}
                      className="text-blue-400"
                    />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">
                    Upload Ad Creative
                  </h3>

                  <p className="text-zinc-400 text-center leading-relaxed max-w-xs">
                    Drop your ecommerce UGC
                    video and unlock AI
                    conversion intelligence
                  </p>
                </div>

                <input
                  type="file"
                  accept="video/mp4"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>

              {/* Status */}
              <div className="mt-6 rounded-3xl border border-white/10 bg-zinc-900/70 p-5 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                    {uploading ? (
                      <Loader2 className="animate-spin text-blue-400" />
                    ) : (
                      <CheckCircle2 className="text-emerald-400" />
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-lg">
                      AI Pipeline
                    </p>

                    <p className="text-sm text-zinc-400">
                      {message ||
                        "System ready"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4 text-center">
                  <BrainCircuit className="mx-auto mb-2 text-violet-400" />

                  <p className="text-xs text-zinc-400">
                    AI Hooks
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4 text-center">
                  <Sparkles className="mx-auto mb-2 text-yellow-400" />

                  <p className="text-xs text-zinc-400">
                    Emotions
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4 text-center">
                  <BarChart3 className="mx-auto mb-2 text-cyan-400" />

                  <p className="text-xs text-zinc-400">
                    Conversion
                  </p>
                </div>
              </div>

              {/* Video Preview */}
              {videoUrl && (
                <div className="mt-6">
                  <video
                    src={videoUrl}
                    controls
                    className="w-full rounded-3xl border border-white/10 shadow-2xl"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-8">
          {/* Transcript */}
          {transcript && (
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-zinc-900 to-black backdrop-blur-2xl shadow-[0_0_60px_rgba(59,130,246,0.08)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_35%)]" />

              <div className="relative p-7">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-blue-400 text-sm uppercase tracking-[0.25em] mb-2">
                      AI Transcript
                    </p>

                    <h2 className="text-3xl font-black">
                      Creative Script
                    </h2>
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold">
                    Generated
                  </div>
                </div>

                <div className="max-h-[340px] overflow-y-auto pr-2 text-zinc-300 leading-relaxed whitespace-pre-wrap text-[15px]">
                  {transcript}
                </div>
              </div>
            </div>
          )}

          {/* AI Analysis */}
          {analysis && (
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-zinc-900 to-black backdrop-blur-2xl shadow-[0_0_60px_rgba(59,130,246,0.08)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.15),transparent_35%)]" />

              <div className="relative p-7">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                  <div>
                    <p className="text-blue-400 text-sm uppercase tracking-[0.25em] mb-2">
                      AI Intelligence
                    </p>

                    <h2 className="text-4xl font-black leading-tight">
                      Conversion Psychology
                      Dashboard
                    </h2>

                    <p className="text-zinc-400 mt-3 max-w-2xl">
                      Advanced AI breakdown
                      of emotional triggers,
                      hooks, CTAs, and script
                      conversion structure.
                    </p>
                  </div>

                  <div className="px-5 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold h-fit">
                    Analysis Complete
                  </div>
                </div>

                <AnalysisDashboard
                  analysis={analysis}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}