# HookForge AI

Turn UGC ads into conversion intelligence.

## Overview

HookForge AI is an AI-powered creative intelligence platform that analyzes ecommerce UGC ad videos and explains why they convert.

Instead of acting like a traditional ad spy tool, HookForge focuses on:
- Hook psychology
- Emotional triggers
- Script structure
- Visual pacing
- CTA effectiveness
- Conversion intelligence

---

# MVP Features

- MP4 video upload
- AI transcription
- Hook analysis
- Emotional trigger detection
- Script structure breakdown
- Visual pattern analysis
- CTA intelligence
- Structured JSON insights

---

# Tech Stack

## Frontend
- Next.js
- Tailwind CSS
- TypeScript
- shadcn/ui

## Backend
- Supabase
- Supabase Storage
- Supabase Auth

## AI
- Gemini API
- Groq Whisper API

## Hosting
- Vercel

---

# Architecture

```text
USER UPLOAD
↓
SUPABASE STORAGE
↓
TRANSCRIPT EXTRACTION
↓
FRAME EXTRACTION
↓
AI ANALYSIS
↓
STRUCTURED OUTPUT
↓
USER DASHBOARD
```

---

# Project Structure

```text
src/
├── app/
├── components/
├── lib/
├── services/
├── utils/
├── types/
├── hooks/
└── styles/
```

---

# Branch Strategy

## Main Branches

```text
main
develop
```

## Feature Branches

```text
feature/upload-system
feature/transcription
feature/gemini-analysis
feature/dashboard
```

---

# Current Development Roadmap

## Phase 1 — MVP
- [ ] Video Upload
- [ ] Storage Integration
- [ ] Transcription
- [ ] AI Analysis
- [ ] Results Dashboard

## Phase 2 — Intelligence Engine
- [ ] Hook Scoring
- [ ] Emotion Detection
- [ ] Script Breakdown
- [ ] CTA Intelligence

## Phase 3 — Scale
- [ ] Predictive Scoring
- [ ] AI Script Generator
- [ ] Creative Trend Intelligence

---

# Local Development

## Install dependencies

```bash
npm install
```

## Run development server

```bash
npm run dev
```

---

# Environment Variables

Create:

```env
.env.local
```

Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

GEMINI_API_KEY=
GROQ_API_KEY=
```

---

# Deployment

Frontend:
- Vercel

Backend:
- Supabase

---

# Vision

HookForge AI aims to become a full AI Creative Intelligence Platform that helps ecommerce brands understand and optimize high-converting ad creatives.

---

# License

MIT