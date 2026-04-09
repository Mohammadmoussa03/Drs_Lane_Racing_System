# DRS Lane Racing - Frontend Setup Complete

## Project Organization

The project is now organized as a **standalone Next.js frontend** in the `/frontend` directory, completely separated from the backend.

### Directory Structure

```
/vercel/share/v0-project/
├── frontend/                   # Complete Next.js frontend app
│   ├── app/                   # All pages and layouts
│   ├── components/            # UI and racing components
│   ├── lib/                   # Utilities, types, API client
│   ├── package.json           # Frontend dependencies
│   ├── next.config.ts         # Next.js configuration
│   ├── tsconfig.json          # TypeScript configuration
│   ├── postcss.config.mjs     # Tailwind CSS config
│   ├── .env.local             # Frontend environment vars
│   └── README.md              # Frontend documentation
│
└── backend/                   # Django backend (separate)
    ├── manage.py
    ├── requirements.txt
    └── [backend apps]
```

## What's Included

### Frontend Features

✅ **Authentication**
- Login & Registration pages
- JWT token management
- Protected routes with middleware

✅ **UI Components**
- Base components: Button, Card, Input, Badge
- Racing components: TierBadge, PositionBadge, RaceCard, DriverCard, LeaderboardRow
- Layout components: Header, Footer

✅ **Pages**
- Landing page
- Auth pages (login, register)
- Dashboard (protected)
- Races listing
- Leaderboard
- Driver profiles
- Settings

✅ **Design System**
- F1-inspired dark theme: #0A0A0A background
- Red accent: #E10600
- Custom animations: skew buttons, racing stripes, slot machine counters
- Responsive Tailwind CSS layout
- Full TypeScript support

### API Integration

- Complete API client for Django backend
- Endpoints for races, drivers, leaderboards, championships, achievements
- Token-based authentication
- Error handling

## Running the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Environment Configuration

The frontend expects the Django API to be running at:
```
http://localhost:8000/api
```

Update `.env.local` if your backend is on a different URL:
```
NEXT_PUBLIC_API_URL=http://your-backend-url/api
```

## Next Steps

1. **Install Dependencies**: `npm install` in the frontend directory
2. **Start Backend**: Ensure Django backend is running on port 8000
3. **Start Frontend**: `npm run dev` to start the frontend
4. **Test**: Visit http://localhost:3000 and try logging in

## Design Specifications

- **Colors**: Dark theme (#0A0A0A), Primary red (#E10600), Accent orange (#FF6B35)
- **Typography**: Inter font, bold headings for racing aesthetic
- **Components**: Skewed buttons, corner brackets, racing stripe dividers
- **Animations**: Hover effects, smooth transitions, pulse effects

## Clean Separation

The `/frontend` directory is completely independent and can be:
- Deployed separately to Vercel
- Run with its own npm scripts
- Version controlled independently
- Scaled independently from the backend

All frontend code is clean, well-typed, and ready for production deployment!
