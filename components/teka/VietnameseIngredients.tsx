"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import TekaFooter from "./TekaFooter"

interface Ingredient {
  id: string
  name: string
  vietnameseName: string
  description: string
  category: string
  imageUrl: string
  substitutes?: string[]
  whereToFind: string
}

const vietnameseIngredients: Ingredient[] = [
  {
    id: "1",
    name: "Fish Sauce (Nước Mắm)",
    vietnameseName: "Nước Mắm",
    description:
      "The cornerstone of Vietnamese cuisine, fish sauce is a salty, umami-rich condiment made from fermented anchovies. It adds depth and complexity to dishes.",
    category: "Condiments",
    imageUrl: "/images/Vietnamese_Ingredients/nuoc mam.png",
    substitutes: ["Soy sauce (less authentic)", "Salt (in small amounts)"],
    whereToFind: "Asian grocery stores, most supermarkets in international aisle",
  },
  {
    id: "2",
    name: "Rice Paper (Bánh Tráng)",
    vietnameseName: "Bánh Tráng",
    description:
      "Thin, translucent sheets made from rice flour and water. Essential for making fresh spring rolls (gỏi cuốn) and crispy fried rolls.",
    category: "Starches",
    imageUrl:
      "/images/Vietnamese_Ingredients/banh trang.png",
    substitutes: ["Lettuce leaves (for wrapping)", "Thin crepes"],
    whereToFind: "Asian grocery stores, online retailers",
  },
  {
    id: "3",
    name: "Vietnamese Mint (Rau Răm)",
    vietnameseName: "Rau Răm",
    description:
      "Also known as Vietnamese coriander, this herb has a spicy, peppery flavor with hints of cilantro. Essential for authentic pho and fresh rolls.",
    category: "Herbs",
    imageUrl:
      "/images/Vietnamese_Ingredients/rau ram.png",
    substitutes: ["Regular mint + cilantro", "Thai basil"],
    whereToFind: "Vietnamese grocery stores, some Asian markets",
  },
  {
    id: "4",
    name: "Tamarind Paste (Me Chua)",
    vietnameseName: "Me Chua",
    description:
      "Sour, tangy paste made from tamarind pods. Adds the characteristic sour note to dishes like canh chua (sour soup).",
    category: "Condiments",
    imageUrl:
      "/images/Vietnamese_Ingredients/me chua.png",
    substitutes: ["Lime juice + brown sugar", "White vinegar + sugar"],
    whereToFind: "Asian grocery stores, Indian grocery stores",
  },
  {
    id: "5",
    name: "Star Anise (Hồi)",
    vietnameseName: "Hồi",
    description:
      "Star-shaped spice with a sweet, licorice-like flavor. Essential for pho broth and other Vietnamese soups.",
    category: "Spices",
    imageUrl:
       "/images/Vietnamese_Ingredients/hoa hoi.png",
    substitutes: ["Fennel seeds (less intense)", "Anise seeds"],
    whereToFind: "Most grocery stores in spice aisle, Asian markets",
  },
  {
    id: "6",
    name: "Rice Vermicelli (Bún)",
    vietnameseName: "Bún",
    description:
      "Thin rice noodles that are soft and delicate. Used in bún bò Huế, bún chả, and many other Vietnamese dishes.",
    category: "Starches",
    imageUrl:  "/images/Vietnamese_Ingredients/bun.png",
    substitutes: ["Angel hair pasta (emergency)", "Thin rice noodles"],
    whereToFind: "Asian grocery stores, most supermarkets",
  },
]

export default function VietnameseIngredients() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", "Herbs", "Spices", "Condiments", "Starches", "Vegetables", "Proteins"]

  const filteredIngredients = vietnameseIngredients.filter((ingredient) => {
    const matchesSearch =
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient.vietnameseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || ingredient.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[300px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/vietnamese-food-top-banner.jpeg)" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Vietnamese Ingredients Guide</h1>
            <p className="text-xl">Essential ingredients for authentic Vietnamese cooking</p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 rounded-full"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedCategory === category
                      ? "bg-[#F4D03F] text-gray-800 hover:bg-[#F1C40F]"
                      : "hover:bg-[#F4D03F] hover:text-gray-800"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all" ? "All Categories" : category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredIngredients.map((ingredient) => (
              <Card key={ingredient.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <img
                    src={ingredient.imageUrl || "/placeholder.svg"}
                    alt={ingredient.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-[#F4D03F] text-gray-800">{ingredient.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">{ingredient.name}</CardTitle>
                  <p className="text-lg text-[#E67E22] font-medium">{ingredient.vietnameseName}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">{ingredient.description}</p>

                  {ingredient.substitutes && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Substitutes:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {ingredient.substitutes.map((substitute, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-[#F4D03F] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {substitute}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Where to Find:</h4>
                    <p className="text-sm text-gray-600">{ingredient.whereToFind}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredIngredients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No ingredients found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      <TekaFooter />
    </div>
  )
}
