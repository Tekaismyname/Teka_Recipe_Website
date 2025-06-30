"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, SortAsc, Clock, Users, Star } from "lucide-react"
import { useRecipes } from "@/contexts/RecipeContext"
import RecipeModal from "@/components/recipes/RecipeModal"
import AddToCollectionButton from "@/components/collections/AddToCollectionButton"
import TekaFooter from "./TekaFooter"

export default function TekaExplore() {
  const { recipes, favorites, toggleFavorite } = useRecipes()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [maxCookingTime, setMaxCookingTime] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null)

  const categories = ["all", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack"]
  const timeFilters = [
    { value: "all", label: "Any time" },
    { value: "15", label: "Under 15 min" },
    { value: "30", label: "Under 30 min" },
    { value: "60", label: "Under 1 hour" },
  ]

  const filteredAndSortedRecipes = useMemo(() => {
    let filtered = recipes

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(query)),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((recipe) => recipe.category === selectedCategory)
    }

    // Cooking time filter
    if (maxCookingTime !== "all") {
      filtered = filtered.filter((recipe) => recipe.cookingTime <= Number.parseInt(maxCookingTime))
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "time":
        filtered.sort((a, b) => a.cookingTime - b.cookingTime)
        break
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return filtered
  }, [recipes, searchQuery, selectedCategory, maxCookingTime, sortBy])

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Vietnamese Recipes</h1>
            <p className="text-xl">Discover authentic flavors and traditional cooking methods</p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 rounded-full"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-gray-300 rounded-full">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Time Filter */}
            <Select value={maxCookingTime} onValueChange={setMaxCookingTime}>
              <SelectTrigger className="border-gray-300 rounded-full">
                <SelectValue placeholder="Cooking time" />
              </SelectTrigger>
              <SelectContent>
                {timeFilters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-gray-300 rounded-full">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="rating">Highest rated</SelectItem>
                <SelectItem value="time">Quickest first</SelectItem>
                <SelectItem value="alphabetical">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1 bg-[#F4D03F] text-gray-800">
                Search: {searchQuery}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setSearchQuery("")}
                >
                  ×
                </Button>
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1 bg-[#F4D03F] text-gray-800">
                Category: {selectedCategory}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setSelectedCategory("all")}
                >
                  ×
                </Button>
              </Badge>
            )}
            {maxCookingTime !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1 bg-[#F4D03F] text-gray-800">
                Under {maxCookingTime} min
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setMaxCookingTime("all")}
                >
                  ×
                </Button>
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredAndSortedRecipes.length} Recipe{filteredAndSortedRecipes.length !== 1 ? "s" : ""}
            </h2>
          </div>

          {/* Recipe Grid */}
          {filteredAndSortedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedRecipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={recipe.imageUrl || "/placeholder.svg?height=192&width=400"}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/90 hover:bg-white rounded-full"
                      onClick={() => toggleFavorite(recipe.id)}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          favorites.includes(recipe.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
                        }`}
                      />
                    </Button>
                    <Badge className="absolute bottom-2 left-2 bg-[#F4D03F] text-gray-800">{recipe.category}</Badge>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{recipe.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{recipe.cookingTime} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{recipe.servings} servings</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{recipe.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Button
                        onClick={() => setSelectedRecipe(recipe.id)}
                        className="bg-[#F4D03F] hover:bg-[#F1C40F] text-gray-800 font-semibold rounded-full px-6 py-2"
                      >
                        About
                      </Button>
                      <AddToCollectionButton recipeId={recipe.id} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No recipes found matching your criteria.</p>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>

      <TekaFooter />

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={filteredAndSortedRecipes.find((r) => r.id === selectedRecipe)!}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  )
}
