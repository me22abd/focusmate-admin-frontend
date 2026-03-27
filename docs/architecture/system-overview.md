# System Architecture Overview

FocusMate is a full-stack web application with three runtime components:

- **User Frontend** (`frontend/`): Next.js application for student users.
- **Admin Frontend** (`admin-frontend/`): Next.js application for administrative workflows.
- **Backend API** (`backend/`): NestJS service providing REST APIs, WebSocket events, and database access.

## High-Level Design

- Frontends communicate with the backend via HTTP APIs.
- Real-time features (matchmaking/session sync/chat) use WebSockets.
- PostgreSQL is used for persistent data (users, sessions, analytics, admin data).
- Authentication is JWT-based with role-aware access control.

## Module Boundaries (Backend)

- **Authentication/Authorization**: login, registration, token flows, protected routes.
- **Sessions**: focus session lifecycle, matchmaking, timing, and history.
- **Analytics**: productivity metrics, streaks, and summaries.
- **Admin**: dashboard operations and management endpoints.

## Deployment Topology

- Frontends are deployed independently from backend.
- Backend is deployed as a standalone service with environment-based configuration.
- Environment variables provide service URLs, database credentials, and secrets.

## Related Technical References

- Backend authentication details: `backend/AUTH_ARCHITECTURE.md`
- Backend real-time details: `backend/WEBSOCKET_INTEGRATION_GUIDE.md`
- Deployment guide: `docs/deployment/deployment-guide.md`
