import NextAuth from "next-auth"
import authConfig from "./auth.config"

export const { auth: middleware } = NextAuth(authConfig)
export default middleware;

export const config = {
  // Защищаем все роуты внутри /res365, кроме самой страницы входа /res365
  // Исключаем статику, картинки, api и публичные роуты
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
