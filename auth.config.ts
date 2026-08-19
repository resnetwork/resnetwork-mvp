import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

// Этот файл используется для Middleware (Edge Runtime). 
// Здесь нет PrismaAdapter и Nodemailer, так как они зависят от Node.js API.

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/res365",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isDashboardRoute = nextUrl.pathname.startsWith("/res365/dashboard")
      
      if (isDashboardRoute) {
        if (isLoggedIn) return true
        return false // Редирект на страницу входа
      } else if (isLoggedIn && nextUrl.pathname === "/res365") {
        // Если уже залогинен и зашел на логин - кидаем в дашборд
        return Response.redirect(new URL("/res365/dashboard", nextUrl))
      }
      return true
    },
  },
} satisfies NextAuthConfig
