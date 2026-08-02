export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 px-8 py-6">
      <header className="flex justify-between items-center mb-8">
        <div className="text-xl font-bold text-green-700">RES365</div>
        <div className="text-sm">Айгуль К. · ЭкоТех LLP</div>
      </header>

      <section className="mb-10">
        <h2 className="font-semibold mb-3">Мои билеты</h2>
        <div className="bg-white border rounded p-4 flex justify-between items-center w-96">
          <div>
            <div className="font-medium">RES Expo 2026</div>
            <div className="text-sm text-gray-500">20–22 мая · Астана</div>
          </div>
          <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs">
            QR
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-3">Мои события (как организатор)</h2>
        <div className="bg-white border rounded p-4 w-96">
          <div className="font-medium">BioHack 2026</div>
          <div className="text-sm text-gray-500 mb-2">15 окт · Астана</div>
          <div className="text-sm">Зарегистрировано: <b>247</b></div>
          <div className="text-sm">Пришли (по чекину): <b>0</b></div>
        </div>
      </section>
    </main>
  );
}