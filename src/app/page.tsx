import UploadBox from "@/components/UploadBox";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_40%)]" />

      <div className="relative z-10 px-6 py-10 lg:px-10">
        <div className="mb-10">
          <p className="text-blue-500 font-semibold uppercase tracking-[0.25em] text-sm mb-3">
            HookForge AI
          </p>

          <h1 className="text-5xl lg:text-6xl font-black leading-tight max-w-4xl">
            Turn UGC Ads Into
            <span className="text-blue-500"> Conversion Intelligence</span>
          </h1>

          <p className="text-zinc-400 mt-6 text-lg max-w-2xl leading-relaxed">
            Upload ecommerce ad creatives and uncover hook psychology,
            emotional triggers, CTA strength, and conversion insights powered
            by AI.
          </p>
        </div>

        <UploadBox />
      </div>
    </main>
  );
}