# DRS Racing Frontend

This is the Next.js frontend for the DRS Lane Racing platform.

## Features

- Modern F1-inspired dark UI with red accents
- Race booking and management
- Driver profiles and rankings
- Championship tracking
- Leaderboards and statistics
- Achievement system
- Real-time notifications

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS v4
- **API**: REST API client for Django backend
- **State**: Local component state with React hooks

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install
```

### Development

```bash
# Start the dev server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Project Structure

```
frontend/
├── app/                    # Next.js app router pages
│   ├── auth/              # Authentication pages
│   ├── (dashboard)/       # Protected dashboard routes
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Base UI components
│   ├── racing/            # Racing-specific components
│   └── layout/            # Layout components
├── lib/
│   ├── api.ts             # API client
│   ├── auth.ts            # Auth utilities
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## Available Pages

- `/` - Landing page
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/dashboard` - User dashboard (protected)
- `/races` - Race listings (protected)
- `/drivers` - Driver directory (protected)
- `/leaderboard` - Global leaderboard (protected)
- `/championships` - Championship view (protected)
- `/settings` - User settings (protected)

## Deployment

Deploy to Vercel with:

```bash
vercel deploy
```

Or push to GitHub and connect to Vercel for automatic deployments.

## Support

For issues or questions, please contact the development team.
