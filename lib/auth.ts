import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from './prisma';
import { PrismaAdapter } from './prisma-adapter';

const providers = [
  EmailProvider({
    server: {
      host: process.env.EMAIL_SERVER_HOST ?? 'smtp.example.com',
      port: Number(process.env.EMAIL_SERVER_PORT ?? 587),
      auth: {
        user: process.env.EMAIL_SERVER_USER ?? 'user',
        pass: process.env.EMAIL_SERVER_PASSWORD ?? 'password',
      },
    },
    from: process.env.EMAIL_FROM ?? 'no-reply@example.com',
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers,
  session: {
    strategy: 'database',
  },
  trustHost: true,
  pages: {
    signIn: '/api/auth/signin',
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
