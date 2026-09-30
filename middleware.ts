import NextAuth from "next-auth"
import authConfig from "./auth.config"

export const { auth: middleware } = NextAuth(authConfig)
export default middleware;

export const config = {
  // Защищаем только роуты внутри /res365 (платформа)
  // Публичные страницы (/, /events, /api) не проходят через middleware вообще
  matcher: ["/res365/:path*"],
}
