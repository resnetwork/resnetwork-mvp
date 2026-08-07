export default function Dashboard() {
  return (
    <main className="min-h-screen px-8 py-6" style={{ backgroundColor: "#003C32" }}>
      <header className="flex justify-between items-center mb-8">
        <a href="/"><img src="/logo1.png.png" alt="RES Network" className="h-10" /></a>
        <div className="text-sm" style={{ color: "#A1BB94" }}>Айгуль К. · ЭкоТех LLP</div>
      </header>

      <section className="mb-10">
        <h2 className="font-semibold text-white mb-3">Мои билеты</h2>
        <div className="rounded p-4 flex justify-between items-center w-96" style={{ backgroundColor: "#02493F" }}>
          <div>
            <div className="font-medium text-white">RES Expo 2027</div>
            <div className="text-sm" style={{ color: "#A1BB94" }}>20–22 мая · Астана</div>
          </div>
          <div className="w-16 h-16 flex items-center justify-center text-xs rounded" style={{ backgroundColor: "#FFFFFF", color: "#003C32" }}>
            QR
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-white mb-3">Мои события (как организатор)</h2>
        <div className="rounded p-4 w-96" style={{ backgroundColor: "#02493F" }}>
          <div className="font-medium text-white">BioHack 2026</div>
          <div className="text-sm mb-2" style={{ color: "#A1BB94" }}>15 окт · Астана</div>
          <div className="text-sm" style={{ color: "#D9E3DC" }}>Зарегистрировано: <b style={{ color: "#2E8656" }}>247</b></div>
          <div className="text-sm" style={{ color: "#D9E3DC" }}>Пришли (по чекину): <b style={{ color: "#2E8656" }}>0</b></div>
        </div>
      </section>
    </main>
  );
}