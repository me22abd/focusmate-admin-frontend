# FocusMate Admin Frontend

Standalone Next.js admin dashboard for managing the FocusMate platform.

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








