"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Thermometer, Leaf, Snowflake, Sun, CloudRain } from "lucide-react"
import { useRecipes } from "@/contexts/RecipeContext"
import RecipeModal from "@/components/recipes/RecipeModal"
import TekaFooter from "./TekaFooter"

interface SeasonalData {
  season: string
  icon: React.ReactNode
  color: string
  description: string
  characteristics: string[]
  recommendedIngredients: string[]
  holidays: Array<{
    name: string
    date: string
    description: string
    traditionalDishes: string[]
  }>
}

const seasonalData: Record<string, SeasonalData> = {
  spring: {
    season: "Spring",
    icon: <Leaf className="h-6 w-6" />,
    color: "bg-green-100 text-green-800",
    description: "Fresh herbs and light, refreshing dishes perfect for Vietnam's warm spring weather.",
    characteristics: ["Fresh herbs", "Light broths", "Raw vegetables", "Cooling foods"],
    recommendedIngredients: ["Fresh mint", "Cilantro", "Bean sprouts", "Cucumber", "Green papaya"],
    holidays: [
      {
        name: "Tết Nguyên Đán (Lunar New Year)",
        date: "January/February",
        description: "The most important Vietnamese holiday celebrating the arrival of spring.",
        traditionalDishes: ["Bánh chưng", "Thịt kho tàu", "Canh măng", "Mứt tết"],
      },
    ],
  },
  summer: {
    season: "Summer",
    icon: <Sun className="h-6 w-6" />,
    color: "bg-yellow-100 text-yellow-800",
    description: "Cool, refreshing dishes to beat the heat with plenty of fresh herbs and cold preparations.",
    characteristics: ["Cold dishes", "Fresh rolls", "Iced drinks", "Minimal cooking"],
    recommendedIngredients: ["Rice paper", "Fresh herbs", "Tropical fruits", "Coconut", "Lime"],
    holidays: [
      {
        name: "Tết Đoan Ngọ (Dragon Boat Festival)",
        date: "June",
        description: "Mid-year festival focusing on health and protection from diseases.",
        traditionalDishes: ["Bánh ít", "Chè", "Rượu nếp", "Fruits"],
      },
    ],
  },
  autumn: {
    season: "Autumn",
    icon: <CloudRain className="h-6 w-6" />,
    color: "bg-orange-100 text-orange-800",
    description: "Hearty soups and warming dishes as the weather begins to cool.",
    characteristics: ["Warming soups", "Braised dishes", "Root vegetables", "Comfort foods"],
    recommendedIngredients: ["Star anise", "Cinnamon", "Ginger", "Pork belly", "Root vegetables"],
    holidays: [
      {
        name: "Tết Trung Thu (Mid-Autumn Festival)",
        date: "September/October",
        description: "Children's festival celebrating the full moon with lanterns and mooncakes.",
        traditionalDishes: ["Bánh nướng", "Bánh dẻo", "Chè", "Seasonal fruits"],
      },
    ],
  },
  winter: {
    season: "Winter",
    icon: <Snowflake className="h-6 w-6" />,
    color: "bg-blue-100 text-blue-800",
    description: "Rich, warming dishes perfect for cooler weather and family gatherings.",
    characteristics: ["Hot soups", "Braised meats", "Warming spices", "Hearty meals"],
    recommendedIngredients: ["Beef bones", "Pork shoulder", "Warming spices", "Root vegetables", "Hot chilies"],
    holidays: [
      {
        name: "Christmas & New Year",
        date: "December/January",
        description: "Modern celebrations often featuring fusion of Vietnamese and Western dishes.",
        traditionalDishes: ["Pho", "Bánh mì", "Spring rolls", "Festive desserts"],
      },
    ],
  },
}

export default function SeasonalRecommendations() {
  const { recipes } = useRecipes()
  const [currentSeason, setCurrentSeason] = useState<string>("spring")
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null)

  useEffect(() => {
    // Determine current season based on month
    const month = new Date().getMonth()
    if (month >= 2 && month <= 4) setCurrentSeason("spring")
    else if (month >= 5 && month <= 7) setCurrentSeason("summer")
    else if (month >= 8 && month <= 10) setCurrentSeason("autumn")
    else setCurrentSeason("winter")
  }, [])

  const getSeasonalRecipes = (season: string) => {
    // Filter recipes based on seasonal characteristics
    const seasonData = seasonalData[season]
    return recipes
      .filter((recipe) => {
        const title = recipe.title.toLowerCase()
        const description = recipe.description.toLowerCase()
        const ingredients = recipe.ingredients.join(" ").toLowerCase()

        // Simple keyword matching for seasonal appropriateness
        if (season === "spring" || season === "summer") {
          return (
            title.includes("fresh") ||
            title.includes("roll") ||
            title.includes("salad") ||
            description.includes("fresh") ||
            description.includes("light") ||
            ingredients.includes("mint") ||
            ingredients.includes("herbs")
          )
        } else {
          return (
            title.includes("soup") ||
            title.includes("pho") ||
            title.includes("braised") ||
            description.includes("warm") ||
            description.includes("comfort") ||
            ingredients.includes("broth") ||
            ingredients.includes("beef")
          )
        }
      })
      .slice(0, 3)
  }

  const currentSeasonData = seasonalData[currentSeason]
  const seasonalRecipes = getSeasonalRecipes(currentSeason)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[300px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/vietnamese-food-top-banner.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Seasonal Vietnamese Cuisine</h1>
            <p className="text-xl">Discover recipes perfect for every season and celebration</p>
          </div>
        </div>
      </section>

      {/* Season Selector */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex justify-center gap-4 flex-wrap">
            {Object.entries(seasonalData).map(([key, data]) => (
              <Button
                key={key}
                variant={currentSeason === key ? "default" : "outline"}
                onClick={() => setCurrentSeason(key)}
                className={`flex items-center gap-2 ${
                  currentSeason === key
                    ? "bg-[#F4D03F] text-gray-800 hover:bg-[#F1C40F]"
                    : "hover:bg-[#F4D03F] hover:text-gray-800"
                }`}
              >
                {data.icon}
                {data.season}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Current Season Overview */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              {currentSeasonData.icon}
              <h2 className="text-3xl font-bold text-gray-800">{currentSeasonData.season} Cuisine</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{currentSeasonData.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Characteristics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5" />
                  Seasonal Characteristics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentSeasonData.characteristics.map((char, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2">
                      {char}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Ingredients */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Key Ingredients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentSeasonData.recommendedIngredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#F4D03F] rounded-full"></span>
                      <span className="text-gray-700">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Holidays */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Seasonal Celebrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentSeasonData.holidays.map((holiday, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-gray-800">{holiday.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{holiday.date}</p>
                      <p className="text-sm text-gray-700">{holiday.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Seasonal Recipe Recommendations */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Perfect for {currentSeasonData.season}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {seasonalRecipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={recipe.imageUrl || "/placeholder.svg?height=192&width=400"}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className={`absolute top-2 right-2 ${currentSeasonData.color}`}>
                      {currentSeasonData.season}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800">{recipe.title}</CardTitle>
                    <p className="text-gray-600 line-clamp-2">{recipe.description}</p>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => setSelectedRecipe(recipe.id)}
                      className="w-full bg-[#F4D03F] hover:bg-[#F1C40F] text-gray-800 font-semibold"
                    >
                      View Recipe
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TekaFooter />

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal recipe={recipes.find((r) => r.id === selectedRecipe)!} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  )
}
