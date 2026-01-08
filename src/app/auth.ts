import NextAuth from "next-auth"
import { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"

const config: NextAuthConfig = {
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
    // Credentials({
    //     name: "Credentials",
    //     credentials: {
    //         email: { label: "Email", type: "email" },
    //         password: { label: "Password", type: "password" },
    //     },
    //     async authorize(credentials) {
    //         const user = { id: "1", name: "J Smith", email: "jsmith@example.com", role: "admin" }

    //         // Return null if validation fails
    //         if (!user) return null

    //         return user
    //     },
    // }),
  ],
  // callbacks: {
  //     async jwt({ token, user }) {
  //         if (user) {
  //             token.id = user.id
  //             token.role = user.role // Add custom fields
  //         }
  //         return token
  //     },
  //     async session({ session, token }) {
  //         if (session.user) {
  //             session.user.id = token.id as string
  //             session.user.role = token.role as string // Type casting might be needed
  //         }
  //         return session
  //     },
  // },
  // session: { strategy: "jwt" } // Default is "jwt" in v5
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(config);