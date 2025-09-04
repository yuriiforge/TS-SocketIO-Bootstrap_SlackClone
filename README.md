# SlackClone

A real-time chat application inspired by Slack, built with **Node.js**, **Express**, **Socket.IO**, and **TypeScript**.

## Features

- Real-time messaging using WebSockets (Socket.IO)
- Multiple namespaces (like Slack teams)
- Multiple rooms per namespace
- Room-specific message history
- Frontend served from a static `public` folder
- Dynamic room join/leave functionality
- Users can see the number of participants in each room

## Tech Stack

- **Backend:** Node.js, Express, Socket.IO, TypeScript
- **Frontend:** Vanilla JS + HTML + CSS (served from `/public`)
- **Build Tools:** TypeScript (`tsc`), optionally `tsx` for development
- **Hosting:** Can be hosted on Node-compatible platforms (Vercel frontend only, backend must be on persistent server for WebSockets)

## Setup

### 1. Install dependencies

```bash
npm install
```

2. Run in development mode

```bash
npm run dev
```

Uses tsx to run TypeScript directly without building.

3. Build for production

```bash
npm run build
```

Compiles TypeScript into dist/

4. Start server

```bash
npm start
```
