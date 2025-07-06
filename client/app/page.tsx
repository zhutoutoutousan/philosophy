import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { BookLibrary } from "@/components/book-library"
import { AchievementPanel } from "@/components/achievement-panel"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Dashboard />
            <BookLibrary />
          </div>
          <div className="space-y-6">
            <AchievementPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
