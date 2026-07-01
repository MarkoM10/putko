# Putko — Trip Cost Calculator

> A full-stack web application for calculating, splitting, and tracking travel expenses between two locations.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Cost Calculation Logic](#cost-calculation-logic)

---

## Overview

**Putko** solves the common problem of estimating and splitting road trip costs. Users enter an origin and destination (powered by Google Places Autocomplete), provide their vehicle's fuel consumption, current fuel price, and any toll costs, and the app automatically fetches the real driving distance via the Google Distance Matrix API and computes the total trip cost — with an option to split it among multiple passengers.

All trips are saved to the user's account, enabling full trip history tracking, route bookmarking, and downloadable PDF expense reports.

---

## Features

| Feature                     | Description                                                                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Trip Calculator**         | Enter origin, destination, fuel consumption, fuel price, tolls, number of passengers, and round-trip toggle to get total and per-person costs |
| **Google Maps Integration** | Real-time address autocomplete and interactive map with route visualization                                                                   |
| **Trip History**            | View, sort, and search all past trips; delete trips you no longer need                                                                        |
| **Favorite Routes**         | Bookmark frequently used routes with custom alias names; edit aliases at any time                                                             |
| **PDF Reports**             | Generate and download PDF expense reports for any trip; all reports persisted and accessible later                                            |
| **Currency Display**        | All costs shown in both RSD (Serbian Dinar) and EUR                                                                                           |
| **Authentication**          | Secure sign-up and login with JWT-based session management                                                                                    |

---

## Tech Stack

### Frontend

| Technology             | Version | Role                              |
| ---------------------- | ------- | --------------------------------- |
| React                  | 18.3.1  | UI framework                      |
| TypeScript             | —       | Type safety                       |
| Redux Toolkit          | —       | Global state management           |
| Redux Persist          | —       | Token & state persistence         |
| React Router           | v6      | Client-side routing               |
| @react-google-maps/api | —       | Google Maps & Places Autocomplete |
| Tailwind CSS           | —       | Utility-first styling             |
| Axios                  | —       | HTTP client                       |
| jsPDF                  | —       | Client-side PDF generation        |
| Lucide React           | —       | Icon library                      |

### Backend

| Technology        | Version | Role                        |
| ----------------- | ------- | --------------------------- |
| Node.js + Express | —       | REST API server             |
| TypeScript        | —       | Type safety                 |
| Prisma ORM        | 6.12.0  | Database access layer       |
| PostgreSQL        | —       | Relational database         |
| JSON Web Tokens   | —       | Authentication tokens       |
| Argon2            | —       | Password hashing (argon2id) |
| PDFKit            | —       | Server-side PDF generation  |
| Axios             | —       | Google Maps API calls       |

---

## Architecture

```
putko/
├── app/
│   ├── backend/          # Express REST API (Node.js + TypeScript)
│   │   ├── src/
│   │   │   ├── controllers/   # Route handlers (auth, trips, favorites, reports)
│   │   │   ├── routes/        # Express route definitions
│   │   │   ├── middlewares/   # JWT auth middleware
│   │   │   ├── interfaces/    # TypeScript interfaces
│   │   │   ├── utils/         # Helpers (euro conversion)
│   │   │   └── config/        # App configuration
│   │   ├── prisma/
│   │   │   └── schema.prisma  # Database schema
│   │   └── reports/files/     # Generated PDF files (static)
│   │
│   └── frontend/         # React SPA (TypeScript)
│       └── src/
│           ├── components/    # Reusable UI components
│           ├── pages/         # Page-level components
│           ├── services/      # Axios API call abstractions
│           ├── redux/         # Redux store, slices
│           ├── interfaces/    # TypeScript interfaces
│           └── utils/         # Cost calculation, PDF, validation helpers
```

**Request flow:**

1. React frontend authenticates and receives a JWT token
2. Token stored in Redux (persisted to `localStorage` via Redux Persist)
3. All subsequent API calls include `Authorization: Bearer <token>`
4. Express middleware validates the token on every protected route
5. Controllers query PostgreSQL through Prisma ORM

---

## Database Schema

```
users
  id            Int       PK, auto-increment
  username      String    Unique
  email         String    Unique
  password      String    Argon2id hash
  date_created  DateTime  Default now()

trips
  id                Int       PK
  user_id           Int       FK → users.id  (cascade delete)
  origin            String
  destination       String
  distance_km       Float
  fuel_consumption  Float     (L/100km)
  fuel_price        Float     (RSD/L)
  tolls             Float     (RSD)
  passengers        Int
  is_round_trip     Boolean
  total_cost        Float     (RSD)
  cost_per_person   Float     (RSD)
  created_at        DateTime

favorite_routes
  id           Int       PK
  user_id      Int       FK → users.id  (cascade delete)
  trip_id      Int       FK → trips.id  (cascade delete)
  origin       String
  destination  String
  alias        String
  created_at   DateTime

pdf_reports
  id           Int       PK
  trip_id      Int       FK → trips.id  (cascade delete)
  file_url     String
  date_created DateTime
```

---

## API Reference

All endpoints except `/signup` and `/login` require the `Authorization: Bearer <token>` header.

### Authentication

| Method | Endpoint  | Body                            | Description                |
| ------ | --------- | ------------------------------- | -------------------------- |
| `POST` | `/signup` | `{ username, email, password }` | Register a new user        |
| `POST` | `/login`  | `{ email, password }`           | Login; returns `{ token }` |

### Trips

| Method   | Endpoint     | Body / Params                                                                         | Description                                    |
| -------- | ------------ | ------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `POST`   | `/trips`     | `{ origin, destination, fuelConsumption, fuelPrice, tolls, passengers, isRoundTrip }` | Create trip (distance fetched from Google API) |
| `GET`    | `/trips`     | —                                                                                     | Get all trips for the authenticated user       |
| `DELETE` | `/trips/:id` | —                                                                                     | Delete a trip by ID                            |

### Favorites

| Method   | Endpoint         | Body / Params        | Description                                        |
| -------- | ---------------- | -------------------- | -------------------------------------------------- |
| `POST`   | `/favorites`     | `{ trip_id, alias }` | Save a trip as a favorite route                    |
| `GET`    | `/favorites`     | —                    | Get all favorite routes for the authenticated user |
| `DELETE` | `/favorites`     | `{ trip_id }`        | Remove a route from favorites                      |
| `PATCH`  | `/favorites/:id` | `{ alias }`          | Update the alias of a favorite route               |

### Reports

| Method | Endpoint                   | Body / Params | Description                                |
| ------ | -------------------------- | ------------- | ------------------------------------------ |
| `POST` | `/reports`                 | `{ trip_id }` | Generate a PDF report for a trip           |
| `GET`  | `/reports`                 | —             | Get all reports for the authenticated user |
| `GET`  | `/reports/files/:filename` | —             | Download / view a generated PDF file       |

---

## Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+
- **PostgreSQL** database (local or hosted)
- **Google Maps API key** with the following APIs enabled:
  - Maps JavaScript API
  - Places API
  - Distance Matrix API

### Environment Variables

**Backend** — create `app/backend/.env`:

```env
PORT=3000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/putko
JWT_SECRET=your_jwt_secret_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

**Frontend** — create `app/frontend/.env`:

```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Installation

```bash
# 1. Install backend dependencies
cd app/backend
npm install

# 2. Apply database schema and generate Prisma client
npx prisma db push
npx prisma generate

# 3. Install frontend dependencies
cd ../frontend
npm install
```

### Running the App

**Backend** (runs on `http://localhost:3000`):

```bash
cd app/backend
npm start
```

**Frontend** (runs on `http://localhost:3001` or next available port):

```bash
cd app/frontend
npm start
```

---

## Project Structure

```
app/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── reports/files/            # Static PDF output directory
│   └── src/
│       ├── app.ts                # Express app setup, middleware, routes
│       ├── server.ts             # HTTP server entry point
│       ├── config/config.ts      # Environment config
│       ├── controllers/
│       │   ├── authController.ts
│       │   ├── tripController.ts
│       │   ├── favoritesController.ts
│       │   └── reportController.ts
│       ├── middlewares/
│       │   └── authMiddleware.ts # JWT verification
│       ├── routes/
│       │   ├── authRoutes.ts
│       │   ├── tripRoutes.ts
│       │   ├── favoritesRoutes.ts
│       │   └── reportRoutes.ts
│       ├── interfaces/interfaces.ts
│       └── utils/euroConversion.ts
│
└── frontend/
    └── src/
        ├── App.tsx
        ├── components/
        │   ├── TripCalc.tsx      # Main calculator form
        │   ├── CalcResult.tsx    # Calculation result display
        │   ├── Trips.tsx         # Trip history table
        │   ├── Favorites.tsx     # Saved routes management
        │   ├── Reports.tsx       # PDF reports list
        │   ├── Map.tsx           # Google Maps route view
        │   ├── Sidebar.tsx       # Navigation sidebar
        │   ├── LoginForm.tsx
        │   ├── SignInForm.tsx
        │   └── ...
        ├── pages/
        │   ├── Homepage.tsx
        │   └── Authpage.tsx
        ├── redux/
        │   ├── store.ts
        │   └── ...slices
        ├── services/             # Axios API call functions
        ├── interfaces/interfaces.ts
        └── utils/
            ├── calculateTripCosts.ts
            ├── euroConversion.ts
            ├── generatePDF.ts
            └── formValidation.ts
```

---

## Cost Calculation Logic

```
distance        = fetched from Google Distance Matrix API (km)

fuelCost        = (fuelConsumption × fuelPrice × distance) / 100

totalCost       = fuelCost + tolls
                  × 2  (if round trip)

costPerPerson   = totalCost / passengers  (if passengers > 0)

EUR equivalent  = RSD / 117  (fixed exchange rate)
```

All monetary values are stored and calculated in **RSD (Serbian Dinar)** and displayed alongside their **EUR** equivalent.

---

## License

This project is for personal and educational use.
