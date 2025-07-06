import { BookOpen, Trophy, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function Header() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">PhilosoQuest</h1>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Level 12 Philosopher
            </Badge>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="font-medium">2,847 XP</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span className="font-medium">23 Achievements</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>PH</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
