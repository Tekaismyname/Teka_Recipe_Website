"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChefHat, Clock } from "lucide-react"
import TekaFooter from "./TekaFooter"

interface Technique {
  id: string
  name: string
  vietnameseName: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  timeRequired: string
  steps: string[]
  tips: string[]
  commonUses: string[]
  imageUrl: string
}

const cookingTechniques: Technique[] = [
  {
    id: "1",
    name: "Making Perfect Pho Broth",
    vietnameseName: "Nấu Nước Dùng Phở",
    description:
      "The art of creating a clear, aromatic broth that forms the soul of Vietnamese pho. This technique requires patience and attention to detail.",
    difficulty: "Advanced",
    timeRequired: "6-8 hours",
    steps: [
      "Char onions and ginger over open flame until fragrant and slightly blackened",
      "Parboil beef bones for 5 minutes, then rinse thoroughly to remove impurities",
      "Toast whole spices (star anise, cinnamon, cloves) in a dry pan until fragrant",
      "Combine bones, charred vegetables, and spices in a large pot with cold water",
      "Bring to a gentle simmer and cook for 6-8 hours, skimming foam regularly",
      "Strain through fine mesh and season with fish sauce, salt, and rock sugar",
    ],
    tips: [
      "Never let the broth boil vigorously - it will become cloudy",
      "Skim foam every 30 minutes for the first 2 hours",
      "Add brisket in the last 2 hours for tender meat",
      "Taste and adjust seasoning gradually",
    ],
    commonUses: ["Pho Bo", "Pho Ga", "Other Vietnamese soups"],
    imageUrl: "/images/Cooking_Technical/Nuoc Dung Pho.png?height=300&width=400",
  },
  {
    id: "2",
    name: "Rolling Fresh Spring Rolls",
    vietnameseName: "Cuốn Gỏi Cuốn",
    description:
      "The delicate technique of working with rice paper to create beautiful, translucent fresh spring rolls filled with herbs and proteins.",
    difficulty: "Beginner",
    timeRequired: "30 minutes",
    steps: [
      "Prepare all fillings: cook shrimp, soak vermicelli, wash herbs",
      "Fill a large bowl with warm water",
      "Dip rice paper in water for 2-3 seconds until pliable",
      "Place on clean, damp surface",
      "Add fillings in the lower third, leaving space on sides",
      "Fold bottom edge over filling, fold in sides, then roll tightly",
    ],
    tips: [
      "Don't oversoak rice paper - it continues to soften",
      "Work quickly but gently to prevent tearing",
      "Keep finished rolls under damp towel",
      "Place colorful ingredients against the rice paper for visual appeal",
    ],
    commonUses: ["Goi Cuon", "Fresh herb rolls", "Vegetarian spring rolls"],
    imageUrl: "/images/Cooking_Technical/Cach cuon goi cuon.png?height=300&width=400",
  },
  {
    id: "3",
    name: "Vietnamese Caramelization",
    vietnameseName: "Làm Nước Màu",
    description:
      "Creating the signature caramel sauce that gives Vietnamese dishes their distinctive sweet-savory flavor and beautiful amber color.",
    difficulty: "Intermediate",
    timeRequired: "15 minutes",
    steps: [
      "Heat sugar in a heavy-bottomed pan over medium heat",
      "Stir constantly until sugar melts and turns golden amber",
      "Continue cooking until it reaches deep caramel color",
      "Carefully add a splash of water (it will bubble vigorously)",
      "Stir until smooth and add fish sauce",
      "Add protein or vegetables to coat with caramel",
    ],
    tips: [
      "Watch carefully - caramel can burn quickly",
      "Have water ready before starting",
      "Use a light-colored pan to see color changes",
      "Don't stir until sugar starts melting",
    ],
    commonUses: ["Thit Kho", "Ca Kho To", "Caramel chicken", "Braised pork"],
    imageUrl: "/images/Cooking_Technical/lam nuoc mau.png?height=300&width=400",
  },
]

export default function CookingTechniques() {
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Vietnamese Cooking Techniques</h1>
            <p className="text-xl">Master the traditional methods behind authentic Vietnamese cuisine</p>
          </div>
        </div>
      </section>

      {/* Techniques Grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {cookingTechniques.map((technique) => (
              <Card key={technique.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <img
                    src={technique.imageUrl || "/placeholder.svg"}
                    alt={technique.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={getDifficultyColor(technique.difficulty)}>{technique.difficulty}</Badge>
                    <Badge className="bg-white/90 text-gray-800">
                      <Clock className="h-3 w-3 mr-1" />
                      {technique.timeRequired}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">{technique.name}</CardTitle>
                  <p className="text-lg text-[#E67E22] font-medium">{technique.vietnameseName}</p>
                  <p className="text-gray-600">{technique.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Common Uses:</h4>
                    <div className="flex flex-wrap gap-2">
                      {technique.commonUses.map((use, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {use}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedTechnique(technique)}
                    className="w-full bg-[#F4D03F] hover:bg-[#F1C40F] text-gray-800 font-semibold"
                  >
                    <ChefHat className="h-4 w-4 mr-2" />
                    Learn Technique
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technique Detail Modal */}
      {selectedTechnique && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedTechnique.name}</h2>
                  <p className="text-xl text-[#E67E22] font-medium">{selectedTechnique.vietnameseName}</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedTechnique(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Step-by-Step Instructions</h3>
                  <ol className="space-y-3">
                    {selectedTechnique.steps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-[#F4D03F] text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Pro Tips</h3>
                    <ul className="space-y-2">
                      {selectedTechnique.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-[#E67E22] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Technique Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(selectedTechnique.difficulty)}>
                          {selectedTechnique.difficulty}
                        </Badge>
                        <span className="text-gray-600">Difficulty Level</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{selectedTechnique.timeRequired}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <TekaFooter />
    </div>
  )
}
