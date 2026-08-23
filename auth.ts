import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Nodemailer from "next-auth/providers/nodemailer"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./app/lib/prisma"
import authConfig from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // При использовании PrismaAdapter с Edge Middleware, стратегия сессий должна быть jwt
  secret: process.env.AUTH_SECRET,
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Nodemailer({
      server: process.env.EMAIL_SERVER || "smtp://dummy",
      from: process.env.EMAIL_FROM || "noreply@resnetwork.kz",
    }),
    Credentials({
      name: "Тестовый вход (Пароль)",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        
        // Для MVP пропускаем любой email, если пароль admin (для тестов)
        if (credentials.password !== "admin") return null;

        // Ищем или создаем юзера в базе для связи с билетами
        let user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: credentials.email as string,
              name: (credentials.email as string).split('@')[0],
              role: credentials.email === "admin@resnetwork.kz" ? "SYSTEM_ADMIN" : "EMPLOYEE"
            }
          });
        }

        // Гарантируем, что у админа есть привязанная компания, чтобы он мог создавать ивенты
        if (user.email === "admin@resnetwork.kz" && !user.companyId) {
          let sysCompany = await prisma.company.findFirst({ where: { name: "RES Network (System)" }});
          if (!sysCompany) {
            sysCompany = await prisma.company.create({ 
              data: { name: "RES Network (System)", bin: "000000000000", status: "APPROVED" }
            });
          }
          user = await prisma.user.update({
            where: { id: user.id },
            data: { companyId: sysCompany.id, role: "SYSTEM_ADMIN" }
          });
        }

        return user;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
})
