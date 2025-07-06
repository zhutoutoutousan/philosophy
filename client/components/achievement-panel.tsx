import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, BookOpen, Clock, Star, Zap } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first chapter",
    icon: BookOpen,
    earned: true,
    rarity: "Common",
    xp: 100,
  },
  {
    id: 2,
    title: "Kant Enthusiast",
    description: "Read 3 Kant works",
    icon: Star,
    earned: true,
    rarity: "Rare",
    xp: 500,
  },
  {
    id: 3,
    title: "Deep Thinker",
    description: "Spend 50 hours reading",
    icon: Clock,
    earned: false,
    progress: 94,
    rarity: "Epic",
    xp: 1000,
  },
  {
    id: 4,
    title: "Philosophy Master",
    description: "Complete 10 philosophy books",
    icon: Trophy,
    earned: false,
    progress: 70,
    rarity: "Legendary",
    xp: 2500,
  },
]

const dailyQuests = [
  {
    id: 1,
    title: "Daily Reading",
    description: "Read for 30 minutes",
    progress: 67,
    xp: 50,
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Quiz Master",
    description: "Complete 3 comprehension quizzes",
    progress: 33,
    xp: 75,
    icon: Target,
  },
  {
    id: 3,
    title: "Streak Keeper",
    description: "Maintain your reading streak",
    progress: 100,
    xp: 25,
    icon: Zap,
  },
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "Common":
      return "bg-gray-100 text-gray-800"
    case "Rare":
      return "bg-blue-100 text-blue-800"
    case "Epic":
      return "bg-purple-100 text-purple-800"
    case "Legendary":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function AchievementPanel() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <span>Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border ${achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${achievement.earned ? "bg-green-100" : "bg-gray-100"}`}>
                    <Icon className={`h-4 w-4 ${achievement.earned ? "text-green-600" : "text-gray-400"}`} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      <Badge variant="secondary" className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{achievement.description}</p>

                    {!achievement.earned && achievement.progress && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-1" />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-600 font-medium">+{achievement.xp} XP</span>
                      {achievement.earned && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Earned
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-500" />
            <span>Daily Quests</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {dailyQuests.map((quest) => {
            const Icon = quest.icon
            return (
              <div key={quest.id} className="p-3 rounded-lg border bg-blue-50 border-blue-200">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="font-medium text-sm">{quest.title}</h4>
                    <p className="text-xs text-gray-600">{quest.description}</p>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{quest.progress}%</span>
                      </div>
                      <Progress value={quest.progress} className="h-1" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-600 font-medium">+{quest.xp} XP</span>
                      {quest.progress === 100 && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Complete
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
