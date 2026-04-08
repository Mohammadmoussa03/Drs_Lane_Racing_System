# DRS Lane Racing System

A full-stack karting management and racing competition system. Features race booking, real-time timing, driver statistics, championship standings, and gamification elements.

**Fully separated monorepo structure** - Frontend and backend are completely independent and can be downloaded/deployed separately.

## Project Structure

```
drs-lane-racing/
├── frontend/               # Next.js 15 Frontend Application
│   ├── README.md          # Frontend documentation
│   ├── package.json       # Frontend dependencies
│   ├── app/               # Next.js App Router
│   ├── components/        # React components
│   ├── lib/               # Utility functions
│   └── [config files]     # tsconfig, next.config, etc.
│
├── backend/               # Django REST Backend
│   ├── README.md          # Backend documentation
│   ├── manage.py          # Django management
│   ├── requirements.txt   # Python dependencies
│   ├── backend/           # Django project config
│   ├── users/             # User management
│   ├── races/             # Race management
│   ├── championships/     # Championship system
│   └── gamification/      # Achievement system
│
└── README.md              # This file
```

## Quick Start

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```

API runs on [http://localhost:8000](http://localhost:8000)

## Features

### Frontend (Next.js)
- Modern F1-inspired racing UI with dark theme
- Homepage with hero section and live race preview
- Race booking system with filters and calendar
- Driver leaderboard with tier badges
- Championship standings and race calendar
- Driver directory with detailed profiles
- User authentication (login/register)
- Responsive mobile design

### Backend (Django)
- User management with email verification
- Race management and scheduling
- Championship system with point calculations
- Gamification with achievements and badges
- Race results and timing system
- Waitlist management
- CSV import/export for race data
- Comprehensive REST API with DRF

## Tech Stack

### Frontend
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Lucide React (20+ icons)
- **State Management**: React hooks + SWR

### Backend
- **Framework**: Django 5.0
- **API**: Django REST Framework
- **Database**: PostgreSQL (recommended) or SQLite
- **Authentication**: JWT tokens
- **Email**: Async task queue compatible

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mohammadmoussa03/Drs_Lane_Racing_System
   cd Drs_Lane_Racing_System
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   pnpm install
   pnpm dev
   ```

3. **Setup Backend**
   ```bash
   cd ../backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

## API Documentation

The backend provides a comprehensive REST API. See `backend/README.md` for detailed endpoint documentation.

### Key Endpoints
- `POST /api/users/register/` - Register new user
- `POST /api/users/login/` - User login
- `GET /api/races/` - List all races
- `POST /api/races/book/` - Book a race
- `GET /api/leaderboard/` - Get driver standings
- `GET /api/championships/` - List championships
- `GET /api/drivers/` - List all drivers

## Deployment

### Frontend (Vercel Recommended)
```bash
cd frontend
vercel
```

Or deploy to any Node.js hosting:
```bash
npm run build
npm start
```

### Backend (Railway, Render, Heroku)
```bash
cd backend
# Follow your hosting provider's deployment guide
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Backend (.env)
```
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=localhost,yourdomain.com
DATABASE_URL=postgresql://user:password@localhost/drs_racing
```

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## Project Highlights

- **Clean Architecture**: Fully separated frontend and backend
- **Modern Stack**: Next.js 15 + Django 5.0
- **F1 Theme**: Professional racing aesthetics with dark mode
- **Responsive**: Mobile-first design approach
- **Type-Safe**: Full TypeScript frontend, typed Python backend
- **Scalable**: Ready for production deployment
- **Documented**: Comprehensive READMEs for both stacks

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
1. Check the [Frontend README](./frontend/README.md)
2. Check the [Backend README](./backend/README.md)
3. Open an issue on GitHub

## Contact

Project Lead: Mohammad Moussa  
GitHub: [@Mohammadmoussa03](https://github.com/Mohammadmoussa03)

---

**Ready to race?** Start with the [Frontend README](./frontend/README.md) or [Backend README](./backend/README.md)
