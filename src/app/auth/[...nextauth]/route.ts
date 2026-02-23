import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const hasGoogleEnv =
  !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;

export const authOptions: NextAuthOptions = {
  providers: [
    // 🔐 Credentials Login (your existing backend)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch("http://localhost:5000/api/customers/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) return null;

          const data = await res.json();

          return {
            id: String(data.id || data.customerId || data.email),
            email: data.email,
            name: data.firstName || data.name,
            role: data.role || "buyer",
            accessToken: data.accessToken, // backend JWT
          } as any;
        } catch (error) {
          console.error("Credentials authorize error:", error);
          return null;
        }
      },
    }),

    // 🌍 Google OAuth
    ...(hasGoogleEnv
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          }),
        ]
      : []),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Credentials login
      if (account?.provider === "credentials" && user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.accessToken = (user as any).accessToken;
        return token;
      }

      // Google login (no backend token yet)
      if (account?.provider === "google") {
        token.id = token.sub;
        token.role = token.role ?? "buyer";
        token.accessToken = undefined;

        if (profile) {
          token.email = (profile as any).email ?? token.email;
          token.name = (profile as any).name ?? token.name;
          (token as any).picture = (profile as any).picture;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role ?? "buyer";
        (session.user as any).image =
          (token as any).picture ?? session.user.image;
      }

      (session as any).accessToken = token.accessToken;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };