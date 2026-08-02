export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className="text-center mb-6">
          <div className="text-xl font-bold text-green-700">RES365</div>
          <p className="text-sm text-gray-500 mt-1">Вход в единую платформу RES Network</p>
        </div>
        <input placeholder="Email" className="w-full border rounded px-3 py-2 mb-3 text-sm" />
        <input placeholder="Пароль" type="password" className="w-full border rounded px-3 py-2 mb-4 text-sm" />
        <a href="/res365/dashboard" className="block text-center bg-green-700 text-white py-2 rounded text-sm">
          Войти
        </a>
        <p className="text-center text-sm text-gray-500 mt-4">
          Нет аккаунта? <a href="#" className="text-green-700">Зарегистрироваться</a>
        </p>
      </div>
    </main>
  );
}