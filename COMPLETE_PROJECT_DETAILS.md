# Project Velocity: Comprehensive Details & Requirements

## 1. Project Overview
**Goal:** Build "Velocity," an enterprise-grade automotive commerce platform bridging high-fidelity digital customization with physical dealership operations.
**Phase 1 Objective:** Construct the "Steel Thread"—a fully connected, end-to-end architecture (Database ↔ API ↔ Frontend) prioritizing infrastructure, type safety, and data integrity over visual polish.

## 2. Technical Architecture
*   **Strategy:** TypeScript Monorepo via TurboRepo.
*   **Infrastructure:** Docker Compose (MongoDB, Redis, Mongo Express).
*   **Database:** MongoDB (NoSQL Document Store).
*   **ORM:** Prisma (Type-safe access).
*   **Backend:** NestJS (Modular, Scalable Node.js framework).
*   **Frontend:** Next.js 14+ (App Router, Server Components).
*   **Styling:** Tailwind CSS + Shadcn/UI (Theme: "Stealth/Dark Luxury").
*   **State Management:** Zustand.
*   **Visualization:** React Three Fiber (Greybox/Capsule models for Phase 1).

## 3. Monorepo Structure
*   `apps/web`: Next.js Customer Portal.
*   `apps/api`: NestJS Backend Service.
*   `packages/database`: Shared Prisma schema and client.
*   `packages/types`: Shared DTOs and TypeScript interfaces.

## 4. Functional Requirements

### Module 1: Infrastructure & DevOps
*   [x] **Docker Compose**:
    *   MongoDB: Port 27017, persistent volume (`mongo-data`).
    *   Redis: Port 6379.
    *   Mongo Express: Port 8081.
*   [ ] **Environment Variables**:
    *   Strict validation using `zod`.
    *   `.env` file must contain `DATABASE_URL` and `JWT_SECRET`.

### Module 2: Data Layer (Prisma Schema)
*   **User**:
    *   `id`: ObjectID.
    *   `role`: ENUM (CUSTOMER, DEALER, ADMIN).
    *   `kycStatus`: ENUM (PENDING, VERIFIED).
*   **Vehicle**:
    *   `id`: ObjectID.
    *   `basePrice`, `modelName`, `slug`.
*   **ConfigurationOption**:
    *   `id`: ObjectID.
    *   Linked to `Vehicle`.
    *   `incompatibleWith`: JSONB array of conflicting Option IDs.
*   **Booking**:
    *   `id`: ObjectID.
    *   `status`: ENUM (PENDING, CONFIRMED, CANCELLED, COMPLETED).
    *   Composite index on `[dealershipId, scheduledTime]`.
*   **Order**:
    *   `id`: ObjectID.
    *   `configurationSnapshot`: JSON blob for historical accuracy.

### Module 3: Backend API (NestJS)
*   **AuthModule**:
    *   JWT + Refresh Token strategies.
    *   `@Roles` decorator/guard for RBAC.
*   **VehicleModule**:
    *   `GET /vehicles`: Public, cached.
    *   `GET /vehicles/:id/config`: Returns valid configuration tree.
*   **BookingModule**:
    *   Transactional support for slot locking.

### Module 4: Frontend (Next.js)
*   **Theme**: "Dark Luxury" (Slate-950 bg, Zinc-100 text).
*   **3D Configurator**:
    *   React-Three-Fiber primitives (Capsule).
    *   Change color/material based on state.
*   **State Management (Zustand)**:
    *   Track: `currentCarId`, `exteriorColor`, `rims`, `interior`.
    *   Compute: `totalPrice`.
*   **Components**:
    *   `Hero`: Generative background, GSAP text reveal.
    *   `CarCatalogue`: Bento grid, filtering.
    *   `BookingWizard`: Multi-step form (Location -> Date -> Details).

## 5. Data Requirements (Database Seeding)

To fully function, the database needs to be seeded with data that mirrors the frontend's `cars.json` but structured relationally.

### Required Entities

#### 1. Vehicles
| Slug | Model Name | Base Price |
| :--- | :--- | :--- |
| `spectre-gt` | Spectre GT | 125000 |
| `phantom-x` | Phantom X | 180000 |
| `vanguard-s` | Vanguard S | 95000 |

#### 2. Configuration Options (Per Vehicle)

**For Spectre GT (Vehicle ID: A)**
*   **Colors**:
    *   "Void Black" (Price: 0)
    *   "Neon Red" (Price: 5000)
    *   "Cyber Silver" (Price: 2500)
*   **Rims**:
    *   "Turbine 20"" (Price: 0)
    *   "Carbon 21"" (Price: 4000)
*   **Interiors**:
    *   "Midnight Leather" (Price: 0)
    *   "Storm Alcantara" (Price: 3000)

**For Phantom X (Vehicle ID: B)**
*   **Colors**:
    *   "Ghost White" (Price: 0)
    *   "Matte Black" (Price: 6000)
    *   "Neon Blue" (Price: 5000)
*   **Rims**:
    *   "Aero 21"" (Price: 0)
    *   "Stealth 22"" (Price: 5000)
*   **Interiors**:
    *   "Cloud Fabric" (Price: 0)
    *   "Carbon Weave" (Price: 4500)

**For Vanguard S (Vehicle ID: C)**
*   **Colors**:
    *   "Tactical Green" (Price: 0)
    *   "Desert Sand" (Price: 1500)
    *   "Steel Grey" (Price: 0)
*   **Rims**:
    *   "Offroad 19"" (Price: 0)
    *   "Beadlock 20"" (Price: 2500)
*   **Interiors**:
    *   "Urban Camo" (Price: 0)
    *   "Saddle Leather" (Price: 2000)

## 6. Implementation Checklist
1.  **Fix Monorepo Build**: Ensure `npm run build` passes (Completed).
2.  **Linting & Formatting**: Ensure `npm run lint` passes (Completed).
3.  **Database Push** (MongoDB): Run `npx prisma db push` in `packages/database` (Replica Set enabled).
4.  **Seed Database**: Create a seed script to populate `Vehicle` and `ConfigurationOption` tables with the data above.
5.  **API Development**:
    *   Implement `VehicleService` to fetch from DB instead of mock.
    *   Implement `BookingService` with transactions.
6.  **Frontend Integration**:
    *   Fetch cars from `GET /vehicles`.
    *   Submit bookings to `POST /bookings`.
7.  **Testing**:
    *   Unit tests for Services/Controllers.
    *   E2E tests for critical flows (Booking).