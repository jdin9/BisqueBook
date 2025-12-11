# BisqueBook Admin Portal

A Next.js (App Router) starter with NextAuth, Prisma, and a Postgres connection (Supabase/Neon ready). Includes a basic admin navigation shell and environment-driven authentication providers (email magic links plus optional SSO).

## Getting started

1. Install dependencies (uses npm by default):

   ```bash
   npm install
   ```

2. Configure environment variables using the template:

   ```bash
   cp .env.example .env.local
   # Fill in database, NextAuth, and provider secrets
   ```

3. Generate the Prisma client after configuring `DATABASE_URL`:

   ```bash
   npm run prisma:generate
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

## Authentication

- Email magic link provider is preconfigured via SMTP environment variables.
- Google SSO is included as an example and only activates when `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are present.
- Prisma adapter persists users, sessions, and tokens in Postgres.

## Database

Prisma is configured for a Postgres datasource and works with managed services like Supabase or Neon. Update `DATABASE_URL` and `DIRECT_URL` in your `.env.local` to point to your instance.
