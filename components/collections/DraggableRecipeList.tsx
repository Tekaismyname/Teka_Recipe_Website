"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, GripVertical, X, Clock, Users, Star } from "lucide-react"
import { useCollections, type Collection } from "@/contexts/CollectionContext"
import { useRecipes } from "@/contexts/RecipeContext"
import RecipeModal from "@/components/recipes/RecipeModal"

interface DraggableRecipeListProps {
  collection: Collection
}

export default function DraggableRecipeList({ collection }: DraggableRecipeListProps) {
  const { recipes } = useRecipes()
  const { addRecipeToCollection, removeRecipeFromCollection, reorderRecipesInCollection } = useCollections()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null)

  // Get recipes in the collection, maintaining order
  const collectionRecipes = collection.recipeIds.map((id) => recipes.find((recipe) => recipe.id === id)).filter(Boolean)

  // Get available recipes not in this collection
  const availableRecipes = recipes.filter((recipe) => !collection.recipeIds.includes(recipe.id))

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(collection.recipeIds)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    reorderRecipesInCollection(collection.id, items)
  }

  const handleAddRecipe = (recipeId: string) => {
    addRecipeToCollection(collection.id, recipeId)
    setShowAddDialog(false)
  }

  const handleRemoveRecipe = (recipeId: string) => {
    removeRecipeFromCollection(collection.id, recipeId)
  }

  return (
    <div className="space-y-4">
      {collectionRecipes.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={`collection-${collection.id}`}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`space-y-2 min-h-[100px] p-2 rounded-lg transition-colors ${
                  snapshot.isDraggingOver ? "bg-muted/50" : ""
                }`}
              >
                {collectionRecipes.map((recipe, index) => {
                  if (!recipe) return null
                  return (
                    <Draggable key={recipe.id} draggableId={recipe.id} index={index}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`transition-shadow ${
                            snapshot.isDragging ? "shadow-lg rotate-1 scale-105" : "hover:shadow-md"
                          }`}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded flex-shrink-0"
                              >
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                              </div>

                              <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded">
                                <img
                                  src={recipe.imageUrl || "/placeholder.svg?height=48&width=48"}
                                  alt={recipe.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">{recipe.title}</h4>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 flex-wrap">
                                  <Badge variant="secondary" className="text-xs px-1 py-0">
                                    {recipe.category}
                                  </Badge>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{recipe.cookingTime}m</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    <span>{recipe.servings}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span>{recipe.rating.toFixed(1)}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 flex-shrink-0">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedRecipe(recipe.id)}
                                  className="h-7 px-2 text-xs"
                                >
                                  View
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveRecipe(recipe.id)}
                                  className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No recipes in this collection yet</p>
        </div>
      )}

      {/* Add Recipe Button */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full bg-transparent" disabled={availableRecipes.length === 0}>
            <Plus className="h-4 w-4 mr-2" />
            {availableRecipes.length === 0 ? "No more recipes to add" : "Add Recipe"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Recipe to {collection.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {availableRecipes.map((recipe) => (
              <Card key={recipe.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                      <img
                        src={recipe.imageUrl || "/placeholder.svg?height=64&width=64"}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{recipe.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                        <Badge variant="secondary">{recipe.category}</Badge>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{recipe.cookingTime} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{recipe.servings} servings</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{recipe.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${recipe.createdBy}`} />
                          <AvatarFallback>{recipe.createdBy.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">by {recipe.createdBy}</span>
                      </div>
                    </div>
                    <Button onClick={() => handleAddRecipe(recipe.id)} className="flex-shrink-0">
                      Add to Collection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal recipe={recipes.find((r) => r.id === selectedRecipe)!} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  )
}
