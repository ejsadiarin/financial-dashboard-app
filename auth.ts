import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

// this is create for the bcrypt packages, since bcrypt relies on Node.js APIs that are not available in Next.js Middleware
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(7) })
          .safeParse(credentials);
      },
    }),
  ],
});
