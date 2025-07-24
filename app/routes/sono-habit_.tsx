import { Outlet } from "react-router"

export default function SonoHabitLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sono Habit</h1>
        </header>

        <main>
          <Outlet />
        </main>

        <footer className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            © 2024 kbkn3. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}
