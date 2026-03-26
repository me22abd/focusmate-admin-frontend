<<<<<<< HEAD
# FocusMate Admin Frontend
=======
# FocusMate
>>>>>>> ae6d4a4 (Final submission cleanup - removed sensitive data and unnecessary files)

Full-stack productivity web application with:
- a user-facing frontend
- an admin dashboard
- a backend API (REST + WebSocket)

<<<<<<< HEAD
## Quick Start

```bash
# Install dependencies
npm install

# Run development server (port 3002)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Access

- **Development**: http://localhost:3002
- **Login**: Use admin credentials from backend

## Features

- ✅ Admin login with email/password
- ✅ Dashboard with system statistics
- ✅ Users management (view, suspend, delete)
- ✅ Sessions management
- ✅ Analytics overview
- ✅ Achievements management
- ✅ Notifications management
- ✅ Route protection with AdminGuard
- ✅ Persistent authentication (localStorage)
- ✅ Authorization header-based auth (no cookie conflicts)

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Project Structure

```
admin-frontend/
├── app/              # Next.js pages
├── components/       # React components
├── lib/             # Utilities and API
├── types/           # TypeScript types
└── public/          # Static assets
```

## Documentation

See `/docs/admin-frontend.md` for complete documentation.









=======
## Project layout

```
focusmate-app/
├── backend/          # NestJS API
├── frontend/         # Next.js user application
├── admin-frontend/   # Next.js admin dashboard
├── docs/             # Technical documentation (features, modules, setup)
└── ARCHITECTURE.md   # Architecture overview
```

## Tech stack (summary)

- **Backend**: NestJS (TypeScript), PostgreSQL, TypeORM, Swagger, Socket.io
- **Frontend**: Next.js (TypeScript), TailwindCSS
- **Admin**: Next.js (TypeScript)

## Local setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

- **API**: `http://localhost:3001`
- **Swagger**: `http://localhost:3001/docs`

### Frontend (user app)

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

- **App**: `http://localhost:3000`

### Admin frontend

```bash
cd admin-frontend
npm install
cp .env.example .env.local
npm run dev
```

- **Admin**: `http://localhost:3002`

## Documentation

- `ARCHITECTURE.md`
- `docs/README.md`
- `docs/environment-variables.md`
- `docs/deployment.md`
>>>>>>> ae6d4a4 (Final submission cleanup - removed sensitive data and unnecessary files)

