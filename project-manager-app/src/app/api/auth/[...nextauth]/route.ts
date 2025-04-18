import NextAuth from "next-auth";
import type { NextAuthOptions, SessionStrategy } from "next-auth";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import prisma from "../../../../lib/prisma";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) return null;
  
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
  
          if (!user || !user.hashedPassword) return null;
  
          const isValid = await compare(credentials.password, user.hashedPassword);
          if (!isValid) return null;
  
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        },
      }),
    ],
    pages: {
      signIn: "/login",
    },
    callbacks: {
      async session({ session, token }: { session: Session; token: JWT }) {
        if (token) {
          session.user.id = token.sub!;
        }
        return session;
      },
      async jwt({ token, user }: { token: any, user: any }) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
    },
  };
  

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
