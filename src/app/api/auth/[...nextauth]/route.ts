import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, User } from "@prisma/client";
import NextAuth from "next-auth/next";
import { MyUser, Session } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

 const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email : ", type: "email", placeholder: "Enter Email" },
        password: {
          label: "Password : ",
          placeholder: "Enter Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const dbUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!dbUser) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          dbUser?.password
        );

        if (!passwordsMatch) {
          return null;
        }
        return {
          id: dbUser.id + "",
          email: dbUser.email,
          name: dbUser.name,
          randomkey: "Hey cool",
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }: { account: any; profile: any }) {
      console.log("****************************************");
      console.log("je suis account", account);
      console.log("****************************************");
      console.log("je suis profile", profile);
      if (account.provider === "google") {
        if (!profile?.email) {
          throw new Error("No profile");
        }
        console.log("ggggoooggggle ");
        await prisma.user.upsert({
          where: {
            email: profile.email,
          },
          create: {
            email: profile.email,
            name: profile.name,
            password: "",
          },
          update: {
            name: profile.name,
          },
        });
      }

      return true;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("je suis la session : ", session, token);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomkey: token.randomkey,
        },
      };
    },

    async jwt({
      token,
      user,
      account,
      profile,
    }: {
      token: JWT;
      user: MyUser;
      account: any;
      profile: any;
    }) {

      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          name: u.name,
          randomkey: u.randomkey,
        };
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET as string,

  session: {
    strategy: "jwt",
  },

  debug: true,
  // process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
