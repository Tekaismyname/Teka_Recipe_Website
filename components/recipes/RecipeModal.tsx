"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Clock, Users, Star } from "lucide-react"
import type { Recipe } from "@/contexts/RecipeContext"
import { useRecipes } from "@/contexts/RecipeContext"
import { useAuth } from "@/contexts/AuthContext"

interface RecipeModalProps {
  recipe: Recipe
  onClose: () => void
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  const { favorites, toggleFavorite, rateRecipe, addComment } = useRecipes()
  const { user } = useAuth()
  const [userRating, setUserRating] = useState(0)
  const [comment, setComment] = useState("")
  const [activeTab, setActiveTab] = useState<"recipe" | "nutrition" | "comments">("recipe")

  const isFavorite = favorites.includes(recipe.id)

  const handleRating = (rating: number) => {
    setUserRating(rating)
    rateRecipe(recipe.id, rating)
  }

  const handleAddComment = () => {
    if (comment.trim()) {
      addComment(recipe.id, comment.trim())
      setComment("")
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{recipe.title}</DialogTitle>
          <p className="text-muted-foreground mt-2">{recipe.description}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipe Image and Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={recipe.imageUrl || "/placeholder.svg?height=300&width=400"}
                alt={recipe.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{recipe.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{recipe.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{recipe.cookingTime} minutes</p>
                    <p className="text-sm text-muted-foreground">Cooking time</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{recipe.servings} servings</p>
                    <p className="text-sm text-muted-foreground">Serves</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${recipe.createdBy}`} />
                  <AvatarFallback>{recipe.createdBy.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Created by {recipe.createdBy}</p>
                  <p className="text-sm text-muted-foreground">{new Date(recipe.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={isFavorite ? "default" : "outline"}
                  onClick={() => toggleFavorite(recipe.id)}
                  className="flex items-center gap-2"
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                  {isFavorite ? "Favorited" : "Add to Favorites"}
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b">
            <div className="flex space-x-8">
              {["recipe", "nutrition", "comments"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "recipe" && "Recipe"}
                  {tab === "nutrition" && "Nutrition"}
                  {tab === "comments" && `Comments (${recipe.comments.length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "recipe" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Instructions</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap">{recipe.instructions}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "nutrition" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold text-primary">{recipe.nutritionalInfo.calories}</p>
                <p className="text-sm text-muted-foreground">Calories</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold text-primary">{recipe.nutritionalInfo.protein}g</p>
                <p className="text-sm text-muted-foreground">Protein</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold text-primary">{recipe.nutritionalInfo.fat}g</p>
                <p className="text-sm text-muted-foreground">Fat</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold text-primary">{recipe.nutritionalInfo.carbs}g</p>
                <p className="text-sm text-muted-foreground">Carbs</p>
              </div>
            </div>
          )}

          {activeTab === "comments" && (
            <div className="space-y-6">
              {/* Rating */}
              <div className="space-y-2">
                <h3 className="font-semibold">Rate this recipe</h3>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => handleRating(star)} className="p-1">
                      <Star
                        className={`h-6 w-6 ${
                          star <= userRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Comment */}
              <div className="space-y-2">
                <h3 className="font-semibold">Add a comment</h3>
                <Textarea
                  placeholder="Share your thoughts about this recipe..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={500}
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{comment.length}/500 characters</span>
                  <Button onClick={handleAddComment} disabled={!comment.trim()}>
                    Add Comment
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                <h3 className="font-semibold">Comments ({recipe.comments.length})</h3>
                {recipe.comments.length > 0 ? (
                  recipe.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 p-4 bg-muted rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.username}`} />
                        <AvatarFallback>{comment.username.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{comment.username}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(comment.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
