# ColorStack @ UTSA - Member Registration Site

A modern, animated member registration portal for the ColorStack UTSA chapter.

## Features

- ✨ Beautiful glassmorphism UI with animated backgrounds
- 📝 Member registration form with validation
- 🔒 Duplicate prevention for email and UTSA ID
- 💾 PostgreSQL database integration (AWS RDS)
- 🚀 Serverless deployment on Vercel

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: Vercel Serverless Functions
- **Database**: PostgreSQL (AWS RDS)

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your database credentials:
```env
DB_HOST=your-database-host.rds.amazonaws.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_password
PORT=3001
```

3. Run development servers:
```bash
npm run dev:all
```

This starts:
- Frontend: http://localhost:5173/
- Backend: http://localhost:3001/

## Database Schema

```sql
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  school_id VARCHAR(50) NOT NULL,
  position VARCHAR(50) NOT NULL,
  date_joined TIMESTAMP DEFAULT NOW(),
  email VARCHAR(255) NOT NULL UNIQUE,
  grad_year INTEGER NOT NULL,
  major VARCHAR(255) NOT NULL
);

CREATE INDEX idx_email ON members(email);
CREATE INDEX idx_school_id ON members(school_id);
```

## Deploy to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/ColorStack-UTSA-AlphaSite.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_NAME`
   - `DB_USER`
   - `DB_PASSWORD`
5. Click "Deploy"

### Step 3: Update AWS Security Group

Add Vercel's IP ranges to your RDS security group to allow connections. You can find these at: https://vercel.com/guides/how-to-allowlist-deployment-ip-address

Or simpler: Allow all IPs (`0.0.0.0/0`) for port 5432 (less secure but works).

## Scripts

- `npm run dev` - Start Vite dev server only
- `npm run server` - Start Express server only
- `npm run dev:all` - Start both frontend and backend
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables

Required for production deployment:

- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port (usually 5432)
- `DB_NAME` - Database name
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password

## License

© 2025 ColorStack @ UTSA
