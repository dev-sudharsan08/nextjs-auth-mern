import NextAuth from "next-auth"
import { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { connectDB, User } from "@/lib/paths"
import { authConfig } from "./auth.config"
import bcrypt from "bcryptjs"
import crypto from "crypto";

const config: NextAuthConfig = {
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        }
      }
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID_DEV!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET_DEV!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        }
      }
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) return null;

        await connectDB();

        // 1. Find user
        const user = await User.findOne({ email });
        if (!user) return null; // User not found

        if (!user.isVerified) {
          throw new Error("Please verify your email before logging in.");
        }
        // 2. Check if they are a social login user (no password)
        if (!user.password) return null;

        // 3. Verify Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null; // Wrong password

        // 4. Return user object (Saved to JWT automatically)
        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: '/login', // Redirect here if auth fails in middleware
    error: '/login',  // Redirect here if user cancels or provider fails
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();

      try {
        // 2. Check if user exists based on email
        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          return true;
        }

        // 3. If user doesn't exist, create them
        // Note: Password field is empty since they use social login
        const newUser = new User({
          username: user.name,
          email: user.email,
          profilePicture: user.image,
          isVerified: true,
          authProviderId: account?.providerAccountId, // e.g., the Google ID
          authProvider: account?.provider,
          password: crypto.randomBytes(32).toString("hex"),// "google" or "github"
        });

        await newUser.save();
        return true;

      } catch (err) {
        console.error("Error saving user", err);
        return false;
      }
    },

    // 4. Populate the session with the Database ID
    // By default, the session only has the email/name from Google.
    // You usually want the actual MongoDB _id in the session.
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // We have to fetch the user again here to get the _id
        // (or you can optimize this caching)
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.picture = dbUser.profilePicture || user.image;
        }
      }

      if (trigger === "update" && session?.user) {
        token.picture = session.user.image;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // Maps the Mongo ID to session
        // session.user.role = token.role;
      }
      return session;
    }
  }
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(config);