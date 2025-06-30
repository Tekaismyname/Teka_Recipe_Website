"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, X } from "lucide-react"
import { useRecipes } from "@/contexts/RecipeContext"
import { useAuth } from "@/contexts/AuthContext"

interface RecipeFormProps {
  onClose: () => void
}

export default function RecipeForm({ onClose }: RecipeFormProps) {
  const { addRecipe } = useRecipes()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [""],
    instructions: "",
    cookingTime: "",
    servings: "",
    category: "",
    imageUrl: "",
    nutritionalInfo: {
      calories: "",
      protein: "",
      fat: "",
      carbs: "",
    },
  })

  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"]

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }))
  }

  const removeIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const updateIngredient = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ingredient, i) => (i === index ? value : ingredient)),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const recipeData = {
        title: formData.title,
        description: formData.description,
        ingredients: formData.ingredients.filter((ingredient) => ingredient.trim() !== ""),
        instructions: formData.instructions,
        cookingTime: Number.parseInt(formData.cookingTime),
        servings: Number.parseInt(formData.servings),
        category: formData.category,
        imageUrl: formData.imageUrl || "/placeholder.svg?height=200&width=300",
        nutritionalInfo: {
          calories: Number.parseInt(formData.nutritionalInfo.calories) || 0,
          protein: Number.parseInt(formData.nutritionalInfo.protein) || 0,
          fat: Number.parseInt(formData.nutritionalInfo.fat) || 0,
          carbs: Number.parseInt(formData.nutritionalInfo.carbs) || 0,
        },
        createdBy: user?.id || "anonymous",
      }

      addRecipe(recipeData)
      onClose()
    } catch (error) {
      console.error("Error adding recipe:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Recipe</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Recipe Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter recipe title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of your recipe"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cookingTime">Cooking Time (minutes) *</Label>
              <Input
                id="cookingTime"
                type="number"
                value={formData.cookingTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, cookingTime: e.target.value }))}
                placeholder="30"
                min="1"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="servings">Servings *</Label>
              <Input
                id="servings"
                type="number"
                value={formData.servings}
                onChange={(e) => setFormData((prev) => ({ ...prev, servings: e.target.value }))}
                placeholder="4"
                min="1"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Ingredients *</Label>
              <Button type="button" onClick={addIngredient} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Ingredient
              </Button>
            </div>
            <div className="space-y-2">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                    className="flex-1"
                  />
                  {formData.ingredients.length > 1 && (
                    <Button type="button" onClick={() => removeIngredient(index)} size="sm" variant="outline">
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions *</Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => setFormData((prev) => ({ ...prev, instructions: e.target.value }))}
              placeholder="Step-by-step cooking instructions..."
              rows={6}
              required
            />
          </div>

          {/* Nutritional Information */}
          <Card>
            <CardContent className="pt-6">
              <Label className="text-base font-semibold">Nutritional Information (per serving)</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="calories">Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={formData.nutritionalInfo.calories}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        nutritionalInfo: { ...prev.nutritionalInfo, calories: e.target.value },
                      }))
                    }
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    value={formData.nutritionalInfo.protein}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        nutritionalInfo: { ...prev.nutritionalInfo, protein: e.target.value },
                      }))
                    }
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fat">Fat (g)</Label>
                  <Input
                    id="fat"
                    type="number"
                    value={formData.nutritionalInfo.fat}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        nutritionalInfo: { ...prev.nutritionalInfo, fat: e.target.value },
                      }))
                    }
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    value={formData.nutritionalInfo.carbs}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        nutritionalInfo: { ...prev.nutritionalInfo, carbs: e.target.value },
                      }))
                    }
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding Recipe..." : "Add Recipe"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
