"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Trash2 } from "lucide-react"
import { useRecipes } from "@/contexts/RecipeContext"
import type { Recipe } from "@/contexts/RecipeContext"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"

interface MealPlan {
  [key: string]: Recipe[]
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function MealPlanner() {
  const { recipes } = useRecipes()
  const [mealPlan, setMealPlan] = useState<MealPlan>({})
  const [showRecipeSelector, setShowRecipeSelector] = useState<string | null>(null)

  useEffect(() => {
    const savedMealPlan = localStorage.getItem("mealPlan")
    if (savedMealPlan) {
      setMealPlan(JSON.parse(savedMealPlan))
    }
  }, [])

  const saveMealPlan = (newMealPlan: MealPlan) => {
    setMealPlan(newMealPlan)
    localStorage.setItem("mealPlan", JSON.stringify(newMealPlan))
  }

  const addRecipeToDay = (day: string, recipe: Recipe) => {
    const newMealPlan = {
      ...mealPlan,
      [day]: [...(mealPlan[day] || []), recipe],
    }
    saveMealPlan(newMealPlan)
    setShowRecipeSelector(null)
  }

  const removeRecipeFromDay = (day: string, recipeIndex: number) => {
    const newMealPlan = {
      ...mealPlan,
      [day]: (mealPlan[day] || []).filter((_, index) => index !== recipeIndex),
    }
    saveMealPlan(newMealPlan)
  }

  const calculateWeeklyNutrition = () => {
    let totalCalories = 0
    let totalProtein = 0
    let totalFat = 0
    let totalCarbs = 0

    Object.values(mealPlan).forEach((dayMeals) => {
      dayMeals.forEach((recipe) => {
        totalCalories += recipe.nutritionalInfo.calories
        totalProtein += recipe.nutritionalInfo.protein
        totalFat += recipe.nutritionalInfo.fat
        totalCarbs += recipe.nutritionalInfo.carbs
      })
    })

    return { totalCalories, totalProtein, totalFat, totalCarbs }
  }

  const weeklyNutrition = calculateWeeklyNutrition()

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination } = result
    const sourceDay = source.droppableId
    const destDay = destination.droppableId

    if (sourceDay === destDay) {
      // Reordering within the same day
      const dayRecipes = [...(mealPlan[sourceDay] || [])]
      const [reorderedRecipe] = dayRecipes.splice(source.index, 1)
      dayRecipes.splice(destination.index, 0, reorderedRecipe)

      const newMealPlan = {
        ...mealPlan,
        [sourceDay]: dayRecipes,
      }
      saveMealPlan(newMealPlan)
    } else {
      // Moving between days
      const sourceRecipes = [...(mealPlan[sourceDay] || [])]
      const destRecipes = [...(mealPlan[destDay] || [])]

      const [movedRecipe] = sourceRecipes.splice(source.index, 1)
      destRecipes.splice(destination.index, 0, movedRecipe)

      const newMealPlan = {
        ...mealPlan,
        [sourceDay]: sourceRecipes,
        [destDay]: destRecipes,
      }
      saveMealPlan(newMealPlan)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Meal Planner</h1>
        </div>
      </div>

      {/* Weekly Nutrition Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Nutrition Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">{weeklyNutrition.totalCalories}</p>
              <p className="text-sm text-muted-foreground">Total Calories</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">{weeklyNutrition.totalProtein}g</p>
              <p className="text-sm text-muted-foreground">Total Protein</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">{weeklyNutrition.totalFat}g</p>
              <p className="text-sm text-muted-foreground">Total Fat</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">{weeklyNutrition.totalCarbs}g</p>
              <p className="text-sm text-muted-foreground">Total Carbs</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Calendar */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {daysOfWeek.map((day) => (
            <Card key={day} className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{day}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Droppable droppableId={day}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`space-y-2 min-h-[100px] ${
                        snapshot.isDraggingOver ? "bg-muted/50 rounded-lg p-2" : ""
                      }`}
                    >
                      {(mealPlan[day] || []).map((recipe, index) => (
                        <Draggable key={`${recipe.id}-${index}`} draggableId={`${recipe.id}-${index}`} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`group relative ${snapshot.isDragging ? "rotate-1 shadow-lg scale-105" : ""}`}
                            >
                              <div className="p-3 bg-muted rounded-lg cursor-grab active:cursor-grabbing">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium text-sm line-clamp-2 pr-2">{recipe.title}</h4>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      removeRecipeFromDay(day, index)
                                    }}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <Badge variant="secondary" className="text-xs px-1 py-0">
                                    {recipe.category}
                                  </Badge>
                                  <span>{recipe.cookingTime} min</span>
                                </div>
                                <div className="mt-2 text-xs text-muted-foreground">
                                  {recipe.nutritionalInfo.calories} cal
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowRecipeSelector(day)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Recipe
                </Button>

                {/* Recipe Selector */}
                {showRecipeSelector === day && (
                  <div className="absolute z-10 mt-2 w-80 bg-background border rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">Select Recipe</h3>
                      <Button variant="ghost" size="sm" onClick={() => setShowRecipeSelector(null)}>
                        ×
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {recipes.map((recipe) => (
                        <div
                          key={recipe.id}
                          className="p-2 hover:bg-muted rounded cursor-pointer"
                          onClick={() => addRecipeToDay(day, recipe)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex-shrink-0 overflow-hidden rounded">
                              <img
                                src={recipe.imageUrl || "/placeholder.svg?height=40&width=40"}
                                alt={recipe.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{recipe.title}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                                <Badge variant="secondary" className="text-xs px-1 py-0">
                                  {recipe.category}
                                </Badge>
                                <span>{recipe.cookingTime} min</span>
                                <span>{recipe.nutritionalInfo.calories} cal</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}
