# DRS Lane Racing - Frontend

Modern F1-inspired Next.js frontend for the DRS Lane Racing System. Built with Next.js 15, TypeScript, Tailwind CSS, and Lucide React icons.

## Features

- **Responsive Design** - Mobile-first approach with full responsive support
- **Racing Theme** - Bold F1-style aesthetics with racing stripe animations, checkered patterns, and dynamic effects
- **Pages**:
  - **Homepage** - Hero section with upcoming races, top drivers, championships, and features
  - **Races** - Browse and filter race listings by type, date, and availability
  - **Leaderboard** - Competitive driver standings with tier badges and statistics
  - **Championships** - Championship standings and race calendar
  - **Drivers** - Driver directory with detailed profiles and statistics
  - **Authentication** - Login and registration with F1 theme

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Icons**: Lucide React (20+ icons)
- **Fonts**: Geist Sans & Mono (from Vercel)

## Getting Started

### Prerequisites

- Node.js 18+ or pnpm equivalent
- pnpm (or npm/yarn/bun)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with navigation & footer
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles & design tokens
│   ├── races/              # Races page
│   ├── leaderboard/        # Leaderboard page
│   ├── championships/      # Championships page
│   ├── drivers/            # Drivers directory
│   ├── login/              # Login page
│   └── register/           # Registration page
├── components/
│   ├── navigation.tsx      # Main navigation bar
│   ├── footer.tsx          # Footer component
│   ├── home/               # Homepage sections
│   │   ├── hero-section.tsx
│   │   ├── stats-section.tsx
│   │   ├── upcoming-races.tsx
│   │   ├── top-drivers.tsx
│   │   ├── championship-banner.tsx
│   │   └── features-section.tsx
│   ├── races/              # Race-related components
│   │   ├── race-list.tsx
│   │   ├── race-filters.tsx
│   │   └── race-calendar.tsx
│   ├── leaderboard/        # Leaderboard components
│   │   ├── leaderboard-table.tsx
│   │   ├── top-three-podium.tsx
│   │   └── leaderboard-stats.tsx
│   ├── championships/      # Championship components
│   │   ├── championships-list.tsx
│   │   ├── championship-standings.tsx
│   │   └── championship-hero.tsx
│   ├── drivers/            # Driver components
│   │   └── drivers-grid.tsx
│   └── auth/               # Authentication forms
│       ├── login-form.tsx
│       └── register-form.tsx
├── lib/
│   └── utils.ts           # Utility functions
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── next.config.ts         # Next.js config
├── postcss.config.mjs     # PostCSS config
└── tailwind.config.ts     # Tailwind CSS config (if exists)
```

## Design System

### Colors
- **Primary**: `#e10600` (F1 Red) - Primary brand color
- **Background**: `#0a0a0a` (Dark) - Main background
- **Card**: `#111111` (Slightly lighter dark)
- **Gold**: `#fbbf24` - 1st place podium
- **Silver**: `#94a3b8` - 2nd place podium
- **Bronze**: `#d97706` - 3rd place podium

### Custom CSS
- **Racing Stripes** - Animated red and transparent pattern
- **Checkered Flag** - Chess pattern for visual interest
- **Speed Lines** - Animation effect for motion
- **Card Glow** - Hover effect with red shadow

## Scripts

```bash
# Development
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run TypeScript linter
pnpm lint
```

## API Integration

The frontend is designed to connect to the DRS Lane Racing backend API. Update the API base URL in your environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy with one click

### Docker
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN pnpm install && pnpm build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
RUN pnpm install --prod
EXPOSE 3000
CMD ["pnpm", "start"]
```

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, please open an issue in the main repository.
