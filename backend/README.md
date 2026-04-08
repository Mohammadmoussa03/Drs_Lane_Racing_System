# DRS Lane Racing System - Backend API

A comprehensive Django REST Framework API for the DRS Lane Racing System. Handles race management, user accounts, championships, gamification, and timing data.

## Features

- **User Management**: Registration, login, email verification, password reset
- **Race Management**: Create, schedule, and manage races with different types
- **Timing System**: Real-time lap timing and race results
- **Championships**: Multi-race championships with automatic point calculation
- **Gamification**: Achievement system with badges and rewards
- **Statistics**: Detailed driver statistics and performance tracking
- **Waitlist**: Race waitlist management for full races
- **CSV Import**: Bulk import race data from CSV files
- **Admin Panel**: Django admin interface for management

## Tech Stack

- **Framework**: Django 5.0
- **API**: Django REST Framework 3.14+
- **Database**: PostgreSQL (recommended), SQLite for development
- **Authentication**: Django REST Framework TokenAuthentication + JWT
- **Async Tasks**: Celery compatible
- **Validation**: DRF Serializers

## Project Structure

```
backend/
├── backend/              # Django project settings
│   ├── settings.py      # Configuration
│   ├── urls.py          # URL routing
│   ├── wsgi.py          # WSGI app
│   └── asgi.py          # ASGI app
├── users/               # User management app
│   ├── models.py        # User, PasswordResetToken models
│   ├── views.py         # Authentication endpoints
│   ├── serializers.py   # User serializers
│   └── email_utils.py   # Email sending utilities
├── races/               # Race management app
│   ├── models.py        # Race, RaceResult, RaceWaitlist models
│   ├── views.py         # Race endpoints
│   ├── services/
│   │   ├── points_service.py      # Point calculation
│   │   ├── csv_import_service.py  # CSV import
│   │   └── waitlist_service.py    # Waitlist logic
│   └── serializers.py   # Race serializers
├── championships/       # Championship management
│   ├── models.py        # Championship, ChampionshipRound models
│   ├── views.py         # Championship endpoints
│   └── serializers.py   # Championship serializers
├── gamification/        # Achievement system
│   ├── models.py        # Achievement, Badge models
│   ├── views.py         # Achievement endpoints
│   ├── services/
│   │   └── achievement_service.py # Achievement logic
│   └── serializers.py   # Achievement serializers
├── manage.py            # Django CLI
├── requirements.txt     # Python dependencies
└── README.md            # This file
```

## Getting Started

### Prerequisites

- Python 3.11+
- pip or poetry
- PostgreSQL (optional, SQLite for development)

### Installation

1. **Clone and navigate to backend**
   ```bash
   git clone https://github.com/Mohammadmoussa03/Drs_Lane_Racing_System
   cd Drs_Lane_Racing_System/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create .env file**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser (admin)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run development server**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication

```
POST   /api/users/register/           # Register new user
POST   /api/users/login/              # User login
POST   /api/users/logout/             # User logout
POST   /api/users/refresh-token/      # Refresh JWT token
POST   /api/users/password-reset/     # Request password reset
POST   /api/users/password-reset-confirm/  # Confirm password reset
GET    /api/users/profile/            # Get current user profile
PUT    /api/users/profile/            # Update user profile
```

### Races

```
GET    /api/races/                    # List all races
POST   /api/races/                    # Create race (admin)
GET    /api/races/<id>/               # Get race details
PUT    /api/races/<id>/               # Update race (admin)
DELETE /api/races/<id>/               # Delete race (admin)
POST   /api/races/<id>/book/          # Book a race
POST   /api/races/<id>/cancel-booking/  # Cancel booking
GET    /api/races/<id>/results/       # Get race results
POST   /api/races/<id>/results/       # Create race results (admin)
GET    /api/races/<id>/waitlist/      # Get waitlist
```

### Leaderboard

```
GET    /api/leaderboard/              # Get global leaderboard
GET    /api/leaderboard/<user_id>/    # Get user leaderboard position
GET    /api/leaderboard/stats/        # Get aggregate statistics
```

### Drivers

```
GET    /api/drivers/                  # List all drivers
GET    /api/drivers/<nickname>/       # Get driver profile
GET    /api/drivers/<id>/stats/       # Get driver statistics
GET    /api/drivers/<id>/races/       # Get driver's race history
```

### Championships

```
GET    /api/championships/            # List all championships
POST   /api/championships/            # Create championship (admin)
GET    /api/championships/<id>/       # Get championship details
GET    /api/championships/<id>/standings/  # Get championship standings
POST   /api/championships/<id>/join/  # Join championship
GET    /api/championships/<id>/leaderboard/  # Get championship leaderboard
```

### Achievements

```
GET    /api/achievements/             # List all achievements
GET    /api/users/<id>/achievements/  # Get user achievements
POST   /api/users/<id>/achievements/  # Award achievement (admin)
```

## Database Models

### User
```python
- id (UUID)
- email
- username/nickname
- password (hashed)
- is_email_verified
- tier (Bronze, Silver, Gold, Elite)
- total_points
- created_at
```

### Race
```python
- id
- title
- type (Grand Prix, Qualifying, Practice)
- date
- time
- track
- max_drivers
- current_drivers
- price
- status
```

### Championship
```python
- id
- name
- season
- start_date
- end_date
- max_drivers
- races (M2M)
```

### Achievement
```python
- id
- name
- description
- icon
- points_reward
- condition
```

## Authentication

The API uses JWT (JSON Web Token) authentication:

1. User registers or logs in
2. Backend returns access token and refresh token
3. Client includes `Authorization: Bearer <token>` in requests
4. Tokens expire after configurable time (default: 24 hours)
5. Use refresh token to get new access token

## Configuration

Key settings in `backend/settings.py`:

```python
# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'drs_racing',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# JWT Settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ALGORITHM': 'HS256',
}

# CORS
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Next.js development
    "https://yourdomain.com",  # Production
]
```

## Running Tests

```bash
python manage.py test
python manage.py test races.tests.RaceTestCase
pytest  # If using pytest
```

## Management Commands

```bash
# Create superuser
python manage.py createsuperuser

# Run migrations
python manage.py migrate

# Create demo data
python manage.py seed_achievements

# Create test races
python manage.py create_test_races

# Import races from CSV
python manage.py import_races_csv races.csv
```

## Admin Panel

Access Django admin at `http://localhost:8000/admin`

- Manage users and permissions
- Create and edit races
- View race results
- Manage championships
- Monitor achievements

## Deployment

### Environment Variables

Create `.env` file with:
```
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:password@host:5432/dbname
CSRF_TRUSTED_ORIGINS=https://yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### Using Docker

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
```

### Deploying to Production

1. **Railway, Render, or Heroku**
   - Connect GitHub repository
   - Add environment variables
   - Deploy with one click

2. **Manual Server Deployment**
   ```bash
   # Use Gunicorn + Nginx
   pip install gunicorn
   gunicorn backend.wsgi:application --bind 0.0.0.0:8000
   ```

## Performance Optimization

- Database query optimization with `select_related()` and `prefetch_related()`
- Caching with Django's cache framework
- Pagination for list endpoints
- Async tasks with Celery for email sending
- Database indexing on frequently queried fields

## Security

- Password hashing with Django's default algorithm
- CSRF protection enabled
- CORS properly configured
- SQL injection prevention via ORM
- XSS protection headers
- Rate limiting (via throttle classes)
- Input validation and sanitization

## Troubleshooting

**Database connection error**
```bash
# Ensure PostgreSQL is running
# Check DATABASE_URL in .env
# Run migrations: python manage.py migrate
```

**Port 8000 already in use**
```bash
python manage.py runserver 8001  # Use different port
```

**Email not sending**
```bash
# Check EMAIL_* variables in .env
# Enable "Less secure app access" for Gmail
# Use app-specific password, not regular password
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes and test
4. Commit (`git commit -m 'Add amazing feature'`)
5. Push (`git push origin feature/amazing-feature`)
6. Open Pull Request

## License

MIT License - See LICENSE file for details

## Support

- **Documentation**: This README
- **Issues**: GitHub Issues
- **Email**: support@drslangracing.com

---

**Happy Racing!** 🏎️
