##  🎵 Project Overview

**Resonate** is a music insight web application built in multiple phases to provide a rich and engaging user experience:

1. **Phase 1:** Clone of Spotify’s core experience by combining features and design elements inspired by both Spotify and Apple Music.  
2. **Phase 2:** Development of a scrobble server that collects and stores user listening data into a database, enabling deeper music insights and analytics.  
3. **Phase 3:** Implementation of social features such as user following and real-time chat to foster community interaction around music.

The frontend is built with Next.js and React, while the backend uses Express and TypeScript. The project emphasizes modularity, scalability, and modern best practices, including  custom auto-routing system and schema validation with Zod.

Resonate aims to become more than just a music insights — it’s a platform for discovery, personalization, and social connection around music.


## 🛠 Tech Stack

This project consists of two main parts: **Frontend** (Client) and **Backend** (Server). Below are the key technologies and libraries used on each side:


---

### 🌐 Frontend (Client)

- **Framework**: [Next.js 15](https://nextjs.org/) - App Router (TypeScript)
- **Library UI**: [React 19](https://reactjs.org/), [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Utilities**:
  - [Lodash](https://lodash.com/) – Utility functions
  - [Color Thief](https://lokeshdhakar.com/projects/color-thief/) – Dominant color extraction
  - [tailwind-merge](https://github.com/dcastil/tailwind-merge) – Class merging

---

### 🧩 Backend (Server)

- **Runtime**: [Node.js](https://nodejs.org/) with [Express 5](https://expressjs.com/)
- **Type Checking**: [TypeScript 5](https://www.typescriptlang.org/)
- **Validation**: [Zod](https://zod.dev/) + `zod-to-ts` for schema-based typing
- **Custom Features**:
  - **Auto Route Generator**  
    Automatically maps controller methods to Express routes based on naming conventions. No need for manual route definitions. Supports dynamic URL params and built-in auth handling via decorators.
  - **@NoAuth Decorator**  
    Allows specific controller methods to bypass authentication by applying the `@NoAuth()` decorator. Useful for public endpoints like login or health checks.

---

### 📦 Shared Tools

- **Monorepo Setup** with separate `client/` and `server/` directories
- **Type Safety** across client and server using generated types from Zod schemas
- **Package Managers**: NPM (`package-lock.json` in both root and subdirectories)

---


### 🚀 Development Tools

- `ts-node`, `ts-node-dev` for local backend development
- Custom scripts (e.g., `generateTypes.ts`) for automating type generation
- ESLint configuration shared via `eslint.config.mjs`

---

### 📁 Directory Structure

```
.
├── client/                     # Frontend application (Next.js)
│   ├── app/                    # App Router structure (pages, layouts)
│   ├── components/             # UI components (atoms, molecules, organisms)
│   ├── constants/              # Application-wide constants
│   ├── containers/             # Higher-order components or feature containers
│   ├── lib/                    # API helpers and utilities
│   ├── public/                 # Static assets (fonts, images, svgs)
│   ├── store/                  # Zustand-based global state
│   ├── style/                  # Custom styles (e.g. font-face)
│   ├── types/                  # Global TypeScript type declarations
│   ├── middleware.ts           # Next.js middleware for auth/redirect
│   ├── next.config.ts          # Next.js configuration
│   └── ...
│
├── server/                     # Backend application (Express)
│   ├── app.ts                  # Entry point for Express server
│   ├── constants/              # Error codes and URL mappings
│   ├── core/                   # Core files (e.g. dependency injection)
│   ├── decorators/             # Custom decorators (e.g. @NoAuth)
│   ├── middlewares/            # Express middlewares (auth, error handling)
│   ├── modules/                # API modules grouped by domain (user, auth, etc.)
│   ├── routes/                 # Auto route generator
│   ├── schemas/                # Zod schemas for validation & types
│   ├── scripts/                # Utility scripts (e.g. type generators)
│   ├── utils/                  # Reusable utility functions
│   └── ...
│
├── package.json                # Root-level dependency declarations
```
