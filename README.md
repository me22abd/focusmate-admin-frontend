# FocusMate

Full-stack productivity platform with:
- user-facing frontend
- admin dashboard
- backend API (REST + WebSocket)

## Project Layout

```text
focusmate-app/
├── backend/          # NestJS API
├── frontend/         # Next.js user application
├── admin-frontend/   # Next.js admin dashboard
└── docs/             # Submission documentation
```

## Local Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

- API: `http://localhost:3001`

### Frontend (User)

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

- App: `http://localhost:3000`

### Frontend (Admin)

```bash
cd admin-frontend
npm install
cp .env.example .env.local
npm run dev
```

- Admin: `http://localhost:3002`

## Documentation Structure

- `docs/architecture/` - system architecture and technical overview
- `docs/deployment/` - deployment guidance and troubleshooting
- `docs/setup/` - environment and setup instructions
- `docs/testing/` - demo and verification guides

## Core Docs

- `docs/architecture/system-overview.md`
- `docs/deployment/deployment-guide.md`
- `docs/setup/environment-variables.md`
- `docs/testing/demo-script-15-min.md`
