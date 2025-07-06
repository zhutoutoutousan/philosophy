"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, Clock, Users, BookOpen, Crown, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

interface Book {
  id: number
  title: string
  author: string
  difficulty: string
  progress: number
  rating: number
  readers: number
  timeToComplete: string
  xpReward: number
  status: string
  cover: string
  isLegendary?: boolean
  subtitle?: string
  readingPath?: string
}

const books: Book[] = [
  {
    id: 1,
    title: "Kritik der reinen Vernunft",
    author: "Immanuel Kant",
    difficulty: "Legendary",
    progress: 0,
    rating: 5.0,
    readers: 4891,
    timeToComplete: "60h",
    xpReward: 5000,
    status: "available",
    cover: "/placeholder.svg?height=120&width=80",
    isLegendary: true,
    readingPath: "/read/kant-kritik"
  },
  {
    id: 2,
    title: "Instauratio magna",
    subtitle: "Praefatio - De nobis ipsis silemus",
    author: "Francis Bacon",
    difficulty: "Legendary",
    progress: 0,
    rating: 4.9,
    readers: 3267,
    timeToComplete: "40h",
    xpReward: 4500,
    status: "available",
    cover: "/placeholder.svg?height=120&width=80",
    isLegendary: true,
    readingPath: "/read/bacon-instauratio"
  },
  {
    id: 3,
    title: "Critique of Pure Reason",
    author: "Immanuel Kant",
    difficulty: "Expert",
    progress: 23,
    rating: 4.8,
    readers: 1247,
    timeToComplete: "45h",
    xpReward: 2500,
    status: "reading",
    cover: "/placeholder.svg?height=120&width=80"
  },
  {
    id: 4,
    title: "Nicomachean Ethics",
    author: "Aristotle",
    difficulty: "Advanced",
    progress: 100,
    rating: 4.6,
    readers: 2156,
    timeToComplete: "32h",
    xpReward: 2000,
    status: "completed",
    cover: "/placeholder.svg?height=120&width=80"
  },
  {
    id: 5,
    title: "Meditations on First Philosophy",
    author: "René Descartes",
    difficulty: "Intermediate",
    progress: 0,
    rating: 4.4,
    readers: 1834,
    timeToComplete: "18h",
    xpReward: 1200,
    status: "available",
    cover: "/placeholder.svg?height=120&width=80"
  },
  {
    id: 6,
    title: "The Republic",
    author: "Plato",
    difficulty: "Advanced",
    progress: 67,
    rating: 4.7,
    readers: 3421,
    timeToComplete: "38h",
    xpReward: 2200,
    status: "paused",
    cover: "/placeholder.svg?height=120&width=80"
  }
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Legendary":
      return "bg-purple-200 text-purple-900"
    case "Beginner":
      return "bg-green-100 text-green-800"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800"
    case "Advanced":
      return "bg-orange-100 text-orange-800"
    case "Expert":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "reading":
      return "bg-blue-100 text-blue-800"
    case "completed":
      return "bg-green-100 text-green-800"
    case "paused":
      return "bg-yellow-100 text-yellow-800"
    case "available":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function BookLibrary() {
  const router = useRouter()

  const handleBookAction = (book: typeof books[0]) => {
    if (book.status === "available" && book.readingPath) {
      router.push(book.readingPath)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5" />
          <span>Philosophy Library</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.map((book) => (
            <Card 
              key={book.id} 
              className={`overflow-hidden ${
                book.isLegendary 
                  ? 'border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50' 
                  : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <div className="relative">
                    <img
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      className={`w-16 h-20 object-cover rounded shadow-sm ${
                        book.isLegendary ? 'ring-2 ring-purple-500 ring-offset-2' : ''
                      }`}
                    />
                    {book.isLegendary && (
                      <Crown className="absolute -top-2 -right-2 h-5 w-5 text-yellow-500 drop-shadow" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="font-semibold text-sm leading-tight flex items-center gap-2">
                        {book.title}
                        {book.isLegendary && (
                          <Sparkles className="h-4 w-4 text-yellow-500" />
                        )}
                      </h3>
                      {book.subtitle && (
                        <p className="text-xs text-purple-600 italic">{book.subtitle}</p>
                      )}
                      <p className="text-xs text-gray-600">{book.author}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className={getDifficultyColor(book.difficulty)}>
                        {book.difficulty}
                      </Badge>
                      <Badge variant="secondary" className={getStatusColor(book.status)}>
                        {book.status}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Star className={`h-3 w-3 ${book.isLegendary ? 'fill-purple-400 text-purple-400' : 'fill-yellow-400 text-yellow-400'}`} />
                        <span>{book.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{book.readers}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{book.timeToComplete}</span>
                      </div>
                    </div>

                    {book.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{book.progress}%</span>
                        </div>
                        <Progress value={book.progress} className={`h-1 ${book.isLegendary ? 'bg-purple-100' : ''}`} />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${book.isLegendary ? 'text-purple-600' : 'text-green-600'}`}>
                        +{book.xpReward} XP
                      </span>
                      <Button 
                        size="sm" 
                        variant={book.status === "reading" ? "default" : "outline"}
                        onClick={() => handleBookAction(book)}
                        className={book.isLegendary ? 'bg-purple-600 hover:bg-purple-700 text-white' : ''}
                      >
                        {book.status === "completed"
                          ? "Review"
                          : book.status === "reading"
                            ? "Continue"
                            : book.status === "paused"
                              ? "Resume"
                              : "Start"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
