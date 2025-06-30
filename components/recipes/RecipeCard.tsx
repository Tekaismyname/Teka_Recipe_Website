"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Clock, Users, Star, MessageCircle, Share2, Edit, Trash2 } from "lucide-react"
import type { Recipe } from "@/contexts/RecipeContext"
import { useRecipes } from "@/contexts/RecipeContext"
import { useAuth } from "@/contexts/AuthContext"
import RecipeModal from "./RecipeModal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AddToCollectionButton from "@/components/collections/AddToCollectionButton"

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { favorites, toggleFavorite, deleteRecipe } = useRecipes()
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const isFavorite = favorites.includes(recipe.id)
  const isOwner = user?.id === recipe.createdBy

  const handleShare = async (platform: string) => {
    const url = `${window.location.origin}/recipe/${recipe.id}`
    const text = `Check out this amazing recipe: ${recipe.title}`

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case "copy":
        try {
          await navigator.clipboard.writeText(url)
          // You could add a toast notification here
          alert("Link copied to clipboard!")
        } catch (err) {
          console.error("Failed to copy link:", err)
        }
        break
    }
    setShowShareMenu(false)
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(recipe.id)
    }
  }

  return (
    <>
      <Card className="group hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="p-0">
          <div className="relative">
            <img
              src={recipe.imageUrl || "/placeholder.svg?height=200&width=300"}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                onClick={() => toggleFavorite(recipe.id)}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </Button>
              {isOwner && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="sm" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setShowModal(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Recipe
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Recipe
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <Badge className="absolute bottom-2 left-2" variant="secondary">
              {recipe.category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-1">{recipe.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">{recipe.description}</p>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
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

            <div className="flex items-center gap-2 pt-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${recipe.createdBy}`} />
                <AvatarFallback>{recipe.createdBy.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">by {recipe.createdBy}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button variant="outline" onClick={() => setShowModal(true)}>
            View Recipe
          </Button>

          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{recipe.comments.length}</span>
            </Button>

            <DropdownMenu open={showShareMenu} onOpenChange={setShowShareMenu}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleShare("twitter")}>Share on Twitter</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("facebook")}>Share on Facebook</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("copy")}>Copy Link</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <AddToCollectionButton recipeId={recipe.id} />
        </CardFooter>
      </Card>

      {showModal && <RecipeModal recipe={recipe} onClose={() => setShowModal(false)} />}
    </>
  )
}
