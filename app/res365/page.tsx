export default function Login() {
  return (
    <main className="min-h-screen flex" style={{ backgroundColor: "#003C32" }}>
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm flex flex-col items-center text-center">
          <a href="/"><img src="/logo1.png.png" alt="RES Network" style={{ height: "120px" }} className="mb-8" /></a>

          <h1 className="text-2xl font-bold text-white mb-8">Войти в аккаунт</h1>

          <button className="w-full rounded px-3 py-3 mb-3 text-sm flex items-center justify-center gap-2" style={{ backgroundColor: "#02493F", border: "1px solid #0B5A4C", color: "#FFFFFF" }}>Войти через Google</button>
          <button className="w-full rounded px-3 py-3 mb-3 text-sm flex items-center justify-center gap-2" style={{ backgroundColor: "#02493F", border: "1px solid #0B5A4C", color: "#FFFFFF" }}>Войти через Apple</button>

          <div className="flex items-center gap-2 my-6 w-full">
            <div className="flex-1 h-px" style={{ backgroundColor: "#0B5A4C" }} />
            <span className="text-xs" style={{ color: "#A1BB94" }}>ИЛИ</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#0B5A4C" }} />
          </div>

          <h1 className="text-2xl font-bold text-white mb-8">Войти через email</h1>
          <input placeholder="Email" className="w-full rounded px-3 py-3 mb-3 text-sm" style={{ backgroundColor: "#003C32", border: "1px solid #0B5A4C", color: "#FFFFFF" }} />
          <input placeholder="Пароль" type="password" className="w-full rounded px-3 py-3 mb-2 text-sm" style={{ backgroundColor: "#003C32", border: "1px solid #0B5A4C", color: "#FFFFFF" }} />
          <a href="#" className="text-sm underline self-end" style={{ color: "#A1BB94" }}>Забыли пароль?</a>

          <a href="/res365/dashboard" className="block text-center py-3 rounded text-sm text-white mt-6 w-full" style={{ backgroundColor: "#2E8656" }}>Войти</a>

          <p className="text-center text-sm mt-6" style={{ color: "#A1BB94" }}>Нет аккаунта? <a href="#" className="underline" style={{ color: "#FFFFFF" }}>Зарегистрироваться</a></p>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 relative">
        <img
          src="https://i.pinimg.com/originals/c5/3e/5c/c53e5c45a8482094bf91494beee302b6.jpg"
          alt="RES Expo 2027"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,20,15,0.85), rgba(0,20,15,0.1))" }} />
        <div className="absolute bottom-10 left-10">
          <div className="text-sm mb-4 font-semibold" style={{ color: "#E0EAB8" }}>ФЛАГМАНСКОЕ СОБЫТИЕ</div>
          <h2 className="text-5xl font-bold text-white leading-tight mb-4">RES EXPO<br/>2026</h2>
          <p className="text-xl" style={{ color: "#D9E3DC" }}>20–22 мая, Астана, Казахстан</p>
        </div>
      </div>
    </main>
  );
}