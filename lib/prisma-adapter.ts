import { PrismaClient } from '@prisma/client';
import type { Adapter, AdapterAccount } from 'next-auth/adapters';

export function PrismaAdapter(prisma: PrismaClient): Adapter {
  return {
    createUser: (data) => prisma.user.create({ data }),
    getUser: (id) => prisma.user.findUnique({ where: { id } }),
    getUserByEmail: (email) =>
      prisma.user.findUnique({
        where: { email: email ?? undefined },
      }),
    getUserByAccount: ({ provider, providerAccountId }) =>
      prisma.account
        .findUnique({
          where: { provider_providerAccountId: { provider, providerAccountId } },
          include: { user: true },
        })
        .then((result) => result?.user ?? null),
    updateUser: (data) =>
      prisma.user.update({
        where: { id: data.id },
        data: { ...data, id: undefined },
      }),
    deleteUser: (id) => prisma.user.delete({ where: { id } }),
    linkAccount: (data) =>
      prisma.account.create({
        data: normalizeAccount(data),
      }),
    unlinkAccount: ({ provider, providerAccountId }) =>
      prisma.account.delete({
        where: { provider_providerAccountId: { provider, providerAccountId } },
      }),
    createSession: (data) => prisma.session.create({ data }),
    getSessionAndUser: (sessionToken) =>
      prisma.session
        .findUnique({
          where: { sessionToken },
          include: { user: true },
        })
        .then((session) =>
          session
            ? {
                session,
                user: session.user,
              }
            : null
        ),
    updateSession: (data) =>
      prisma.session.update({
        where: { sessionToken: data.sessionToken },
        data,
      }),
    deleteSession: (sessionToken) =>
      prisma.session.delete({
        where: { sessionToken },
      }),
    createVerificationToken: (data) =>
      prisma.verificationToken.create({
        data,
      }),
    useVerificationToken: ({ identifier, token }) =>
      prisma.verificationToken
        .delete({
          where: { identifier_token: { identifier, token } },
        })
        .catch(() => null),
  };
}

function normalizeAccount(account: AdapterAccount) {
  return {
    ...account,
    id_token: account.id_token ?? null,
    session_state: account.session_state ?? null,
    refresh_token: account.refresh_token ?? null,
    access_token: account.access_token ?? null,
    scope: account.scope ?? null,
    token_type: account.token_type ?? null,
    expires_at: account.expires_at ?? null,
  } satisfies AdapterAccount;
}
