# RizzMaxx 🔥

AI-powered Rizz & Looksmaxing platform built with React + Claude API.

## Features
- 📊 **PSL Rater** — AI rates your looks 1-10 with full breakdown
- 💬 **Rizz Coach** — Get elite dating advice for any situation
- 📖 **Glow-Up Guide** — Full self-improvement guides
- ⚔️ **Rizz Battle** — AI judges who wins the rizz showdown
- 🏆 **Tier List** — Quiz-based rizz tier placement
- 👑 **Leaderboard** — Top rated faces

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Add your API key**
   ```bash
   cp .env.example .env
   # Edit .env and add your Anthropic API key
   ```

   Get your API key at: https://console.anthropic.com

3. **Run locally**
   ```bash
   npm start
   ```

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. In **Environment Variables**, add:
   - `REACT_APP_ANTHROPIC_API_KEY` = your Anthropic API key
4. Click **Deploy** ✅

> ⚠️ **Important:** Never commit your `.env` file. The `.env.example` is safe to commit.

## Tech Stack
- React 18
- React Router v6
- Anthropic Claude API (claude-sonnet-4)
- CSS Modules
