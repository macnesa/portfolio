## PORTFOLIO

This is my personal portfolio web application, built to showcase my skills and projects in modern web development.

## 🛠 Tech Stack

This project consists of two main parts: **Frontend** (Client) and **Backend** (Server). Below are the key technologies and libraries used on each side:

 ### 🌐 Frontend (Client)

- **Framework**: [Next.js 15](https://nextjs.org/) – App Router + TypeScript
- **UI & Animation**: [React 19](https://reactjs.org/), [Framer Motion](https://www.framer.com/motion/), [Swiper](https://swiperjs.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Utilities**:
  - [Lodash](https://lodash.com/) – Utility functions
  - [Color Thief](https://lokeshdhakar.com/projects/color-thief/) – Extract dominant colors
  - [React Typing Effect](https://github.com/andreopane/react-typing-effect) – Typewriter animations

---

### 🧩 Backend (Server)

- **Runtime & Framework**: [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/) (TypeScript 5)
- **Database**: PostgreSQL via [Kysely](https://kysely.dev/)
- **Validation & Typing**: [Zod](https://zod.dev/) + [zod-to-ts](https://github.com/colinhacks/zod-to-ts)
- **Authentication**: JWT + [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Utilities**:
  - [Axios](https://axios-http.com/) – API requests
  - [Lodash](https://lodash.com/) – Utility functions
  - [Umzug](https://github.com/sequelize/umzug) – Database migrations
  - [Reflect Metadata](https://www.npmjs.com/package/reflect-metadata) – Decorators support
- **Custom Features**:
  - **Auto Route Generator** – Maps controller methods to routes automatically with dynamic URL params support.
  - **@NoAuth Decorator** – Bypass authentication for specific controller methods, useful for public endpoints like login or health checks.

---

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 8+
- PostgreSQL (latest stable version)


### Installation
```bash
git clone <URL_REPO>
```
**server**
```bash
cd server
npm install
```
```sql
-- run on your sql editor 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE migrations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  run_on TIMESTAMP NOT NULL DEFAULT now()
);
```
```sql
-- create .env file and fill up env values based on .env.example
```
```bash
npm run migrate
npm run dev
```
**client**
```bash
cd client
npm install
```
```sql
-- create .env.local file and fill up env values based on .env.example
```
```bash
npm run dev
```

---

### 📁 Directory Structure

```
.
├── client/                     # Frontend application (Next.js)
│   ├── app/                    # App Router structure (pages, layouts)
│   ├── components/             # UI components (atoms, molecules, organisms)
│   ├── constants/              # Application-wide constants
│   ├── containers/             # Higher-order components or feature containers
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # API helpers and utilities
│   ├── public/                 # Static assets (fonts, images, svgs)
│   ├── store/                  # Zustand-based global state
│   ├── style/                  # Custom styles (e.g. font-face)
│   ├── types/                  # Global TypeScript type declarations
│   ├── middleware.ts           # Next.js middleware for auth/redirect
│   ├── next.config.ts          # Next.js configuration
│   ├── postcss.config.mjs      # PostCSS configuration
│   ├── tsconfig.json           # TypeScript configuration
│   └── eslint.config.mjs       # ESLint configuration
│
├── server/                     # Backend application (Express)
│   ├── app.ts                  # Entry point for Express server
│   ├── constants/              # Error codes and URL mappings
│   ├── core/                   # Core files (e.g. base controller, DI)
│   ├── decorators/             # Custom decorators (e.g. @NoAuth)
│   ├── middlewares/            # Express middlewares (auth, error handling)
│   ├── modules/                # API modules grouped by domain (user, auth)
│   ├── routes/                 # Route definitions
│   ├── schemas/                # Zod schemas for validation & types
│   ├── migrations/             # Database migration scripts
│   ├── scripts/                # Utility scripts (e.g. db migrate, generate types)
│   ├── sql/                    # Raw SQL files (e.g. create migrations table)
│   ├── utils/                  # Reusable utility functions
│   └── tsconfig.json           # TypeScript configuration
│
├── package.json                # Root-level dependency declarations
├── package-lock.json           # Lockfile for package versions
└── README.md                   # Project overview

```
