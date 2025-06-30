"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRecipes } from "@/contexts/RecipeContext"
import RecipeModal from "@/components/recipes/RecipeModal"
import TekaFooter from "./TekaFooter"

export default function TekaHome() {
  const { recipes } = useRecipes()
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null)
  const [showMore, setShowMore] = useState(false)

  // Initial featured recipes (first 3)
  const initialFeaturedRecipes = recipes.slice(0, 3)
  // Additional featured recipes (next 3, shown when "More" is clicked)
  const additionalFeaturedRecipes = recipes.slice(3, 6)
  // Recent recipes (next 3, shown when "More" is clicked)
  const recentRecipes = recipes.slice(6, 9)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/vietnamese-food-top-banner.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">VIETNAMESE DISHES COOKING RECIPES</h1>
          </div>
        </div>
      </section>

      {/* Initial Featured Recipes */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {initialFeaturedRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <img
                    src={recipe.imageUrl || "/placeholder.svg?height=256&width=400"}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{recipe.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{recipe.description}</p>
                  <Button
                    onClick={() => setSelectedRecipe(recipe.id)}
                    className="bg-[#F4D03F] hover:bg-[#F1C40F] text-gray-800 font-semibold rounded-full px-6 py-2"
                  >
                    About
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* More Button - only show if not expanded */}
          {!showMore && (
            <div className="text-center">
              <Button
                onClick={() => setShowMore(true)}
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full px-8 py-3"
              >
                More
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Additional Content - shown when "More" is clicked */}
      {showMore && (
        <>
          {/* Additional Featured Recipes */}
          <section className="py-8 px-6">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {additionalFeaturedRecipes.map((recipe) => (
                  <Card key={recipe.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative h-64">
                      <img
                        src={recipe.imageUrl || "/placeholder.svg?height=256&width=400"}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-800">{recipe.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{recipe.description}</p>
                      <Button
                        onClick={() => setSelectedRecipe(recipe.id)}
                        className="bg-[#F4D03F] hover:bg-[#F1C40F] text-gray-800 font-semibold rounded-full px-6 py-2"
                      >
                        About
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Recipes */}
          <section className="py-16 px-6 bg-gray-50">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Recent recipe</h2>

              <div className="space-y-8">
                {recentRecipes.map((recipe) => (
                  <Card key={recipe.id} className="overflow-hidden shadow-lg">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img
                          src={recipe.imageUrl || "/placeholder.svg?height=200&width=300"}
                          alt={recipe.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <CardContent className="md:w-2/3 p-8">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">{recipe.title}</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">{recipe.description}</p>
                        <Button
                          onClick={() => setSelectedRecipe(recipe.id)}
                          className="bg-[#F4D03F] hover:bg-[#F1C40F] text-gray-800 font-semibold rounded-full px-6 py-2"
                        >
                          About
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Show Less Button - positioned at the bottom */}
          <section className="py-8 px-6">
            <div className="container mx-auto text-center">
              <Button
                onClick={() => setShowMore(false)}
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full px-8 py-3"
              >
                Show Less
              </Button>
            </div>
          </section>
        </>
      )}

      <TekaFooter />

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal recipe={recipes.find((r) => r.id === selectedRecipe)!} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  )
}
