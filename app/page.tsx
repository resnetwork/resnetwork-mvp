export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <header className="flex justify-between items-center px-8 py-4 border-b">
        <div className="text-xl font-bold text-green-700">RES NETWORK</div>
        <nav className="flex gap-6 text-sm">
          <a href="#">О нас</a>
          <a href="#">Ивенты</a>
          <a href="#">Новости</a>
        </nav>
        <a href="/res365" className="bg-green-700 text-white px-4 py-2 rounded text-sm">
          Создать ивент
        </a>
      </header>

      <section className="px-8 py-16 bg-gray-900 text-white">
        <h1 className="text-4xl font-bold max-w-xl">
          Экологические выставки и события Центральной Азии
        </h1>
        <p className="mt-4 max-w-xl text-gray-300">
          Создавайте события или регистрируйтесь на существующие
        </p>
        <a href="/res365" className="inline-block mt-6 bg-green-600 px-6 py-3 rounded">
          Смотреть ивенты
        </a>
      </section>

      <section className="px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">Ближайшие события</h2>
        <div className="grid grid-cols-3 gap-4">
          {["BioHack 2026", "RES Expo 2026", "Green Finance Forum"].map((name) => (
            <div key={name} className="border rounded p-4">
              <div className="h-32 bg-gray-200 rounded mb-3" />
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-gray-500">Астана, Казахстан</p>
              <a href="/res365" className="text-green-700 text-sm mt-2 inline-block">
                Зарегистрироваться →
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}