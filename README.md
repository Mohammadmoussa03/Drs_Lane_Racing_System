# DRS Lane Racing System - Frontend

A professional racing platform built with Next.js 15, featuring driver management, race bookings, championships, gamification, and real-time leaderboards.

## Features

- **Race Management**: Browse upcoming races, view details, and make bookings with waitlist support
- **Driver Profiles**: Complete driver profiles with stats, achievements, and skill progression
- **Leaderboards**: Real-time driver rankings with tier progression system
- **Championships**: Multi-race championships with standings and season tracking
- **Gamification**: Achievement badges, points system, and tier progression (Rookie → Pro → Champion)
- **Head-to-Head**: Compare driver statistics and performance metrics
- **Responsive Design**: F1-inspired dark theme with modern racing aesthetic

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, custom racing components
- **State Management**: SWR for data fetching and caching
- **Backend API**: Django REST Framework (separate repo)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Access to the Django backend API (running on `http://localhost:8000`)

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
bun install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` if needed:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
app/
├── (dashboard)/           # Protected dashboard routes
│   ├── dashboard/         # Main dashboard
│   ├── races/            # Race browsing and booking
│   ├── drivers/          # Driver profiles and comparison
│   ├── leaderboard/      # Driver rankings
│   ├── championships/    # Championship standings
│   └── settings/         # User settings
├── auth/                 # Authentication pages
│   ├── login/           # Login page
│   └── register/        # Registration page
└── page.tsx             # Landing page

components/
├── ui/                  # Base UI components (button, card, input, etc.)
├── racing/              # Racing-specific components
│   ├── race-card
│   ├── driver-card
│   ├── leaderboard-row
│   ├── tier-badge
│   ├── achievement-badge
│   └── ...
└── layout/              # Header, footer

lib/
├── api.ts               # API client functions
├── types.ts             # TypeScript type definitions
├── utils.ts             # Utility functions
└── auth-context.tsx     # Authentication context
```

## Key Components

### Racing Components
- `RaceCard`: Displays race information with booking functionality
- `DriverCard`: Shows driver profile summary with tier and stats
- `LeaderboardRow`: Single driver row in leaderboard with position
- `TierBadge`: Visual indicator for driver skill tier
- `AchievementBadge`: Display for unlocked achievements
- `PodiumDisplay`: Podium visualization for top 3 drivers
- `StatsCounter`: Animated counter for racing statistics

### Pages

- **Landing (`/`)**: Hero section with CTA for signup/login
- **Dashboard (`/dashboard`)**: User overview with upcoming races and stats
- **Races (`/races`)**: Browse all races with filters and book race slots
- **Race Detail (`/races/[id]`)**: Full race information, booking, and results
- **Drivers (`/drivers`)**: Browse all drivers and their profiles
- **Driver Profile (`/drivers/[id]`)**: Individual driver stats and achievements
- **Driver Comparison (`/drivers/[id]/compare`)**: Head-to-head driver statistics
- **Leaderboard (`/leaderboard`)**: Global driver rankings by tier
- **Championships (`/championships`)**: Active and past championship standings
- **Settings (`/settings`)**: User profile and preferences

## API Integration

The frontend connects to the Django REST API with the following main endpoints:

### Users
- `POST /api/users/login/` - User login
- `POST /api/users/register/` - User registration
- `GET /api/users/profile/` - Get user profile
- `PATCH /api/users/profile/` - Update user profile

### Races
- `GET /api/races/` - List all races
- `GET /api/races/{id}/` - Get race details
- `POST /api/races/{id}/book/` - Book a race slot
- `GET /api/races/{id}/results/` - Get race results

### Drivers
- `GET /api/drivers/` - List drivers
- `GET /api/drivers/{id}/` - Get driver profile
- `GET /api/drivers/{id}/stats/` - Get driver statistics

### Championships
- `GET /api/championships/` - List championships
- `GET /api/championships/{id}/standings/` - Get championship standings

### Gamification
- `GET /api/achievements/` - List achievements
- `GET /api/badges/` - List driver badges
- `GET /api/tiers/` - Tier progression system

## Styling & Theme

The application uses a custom F1-inspired theme:

- **Primary Colors**: `#0A0A0A` (background), `#E10600` (F1 red accent)
- **Typography**: Custom racing fonts with sharp, modern aesthetic
- **Animations**: Skewed buttons, corner brackets, racing stripe dividers
- **Responsive**: Mobile-first design with Tailwind CSS

## Authentication

The app uses JWT token-based authentication:

1. User registers or logs in
2. Backend returns access token
3. Token stored in localStorage
4. Sent in Authorization header for protected API calls
5. Token automatically cleared on logout

Protected routes redirect to `/auth/login` if not authenticated.

## Development

### Building for Production

```bash
npm run build
npm run start
```

### Code Style

The project uses:
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- Shadcn components for base UI

## Deployment

This Next.js app can be deployed to:
- Vercel (recommended)
- AWS, Google Cloud, Azure
- Any Node.js hosting platform

Simply connect your Git repository and deploy.

## Contributing

1. Create a feature branch
2. Make changes following the existing code style
3. Test thoroughly
4. Submit a pull request

## Backend Setup

The frontend requires a running Django backend. See the backend repository for setup instructions.

Key requirements:
- Django REST Framework running on `http://localhost:8000`
- CORS enabled for frontend domain
- All required models and endpoints created

## Troubleshooting

### API Connection Issues
- Ensure Django backend is running on port 8000
- Check CORS settings in Django backend
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`

### Authentication Issues
- Clear browser localStorage and cookies
- Re-login with valid credentials
- Check JWT token expiration

### Styling Issues
- Ensure Tailwind CSS is compiled: `npm run build`
- Clear `.next` folder and restart dev server
- Check CSS file imports in `globals.css`

## License

This project is part of the DRS Lane Racing System.
