# Gio CRM (Conversion-First MVP)

A production-ready MVP CRM focused on helping small business owners and sales teams capture leads, follow up on time, move deals through a pipeline, and close more revenue.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- NextAuth (credentials)
- Zod validation

## Features
- Authentication + role-based access (OWNER / MANAGER / REP)
- Dashboard widgets for:
  - New leads today
  - Leads needing follow-up
  - Deals closing this week
  - Revenue won this month
  - Conversion rate by source
  - Recent activity
- Lead capture form + lead source tracking
- Pipeline view for deals
- Task system + overdue follow-up visibility
- Contacts and companies records
- Reports page for conversion analytics
- Notes and communication history model support
- CRUD creation flows for Leads, Contacts, Companies, Deals, Tasks
- Seed script with realistic sample data

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file:
   ```bash
   cp .env.example .env
   ```
3. Run migrations and generate client:
   ```bash
   npx prisma migrate dev --name init
   npm run prisma:generate
   ```
4. Seed data:
   ```bash
   npm run prisma:seed
   ```
5. Start app:
   ```bash
   npm run dev
   ```

## Demo login
- `owner@giocrm.com`
- `password123`

## Product decisions
- The dashboard intentionally prioritizes urgency (follow-up and close deadlines) to maximize conversion behavior.
- Every entity is relational to support complete timeline context around leads and deals.
- Minimal, fast UI with server actions for low-friction CRUD.
