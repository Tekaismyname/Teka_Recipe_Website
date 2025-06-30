"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Save, X, Heart, ChefHat, MessageCircle } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useRecipes } from "@/contexts/RecipeContext"
import RecipeCard from "@/components/recipes/RecipeCard"

export default function UserProfile() {
  const { user, updateProfile } = useAuth()
  const { recipes, favorites } = useRecipes()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    profilePicture: user?.profilePicture || "",
    dietaryPreferences: user?.dietaryPreferences || [],
  })

  const userRecipes = recipes.filter((recipe) => recipe.createdBy === user?.id)
  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id))
  const totalComments = recipes.reduce(
    (total, recipe) => total + recipe.comments.filter((comment) => comment.username === user?.username).length,
    0,
  )

  const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Paleo", "Low-Carb", "Low-Fat"]

  const handleSave = () => {
    updateProfile(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      username: user?.username || "",
      email: user?.email || "",
      profilePicture: user?.profilePicture || "",
      dietaryPreferences: user?.dietaryPreferences || [],
    })
    setIsEditing(false)
  }

  const toggleDietaryPreference = (preference: string) => {
    setEditData((prev) => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(preference)
        ? prev.dietaryPreferences.filter((p) => p !== preference)
        : [...prev.dietaryPreferences, preference],
    }))
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={isEditing ? editData.profilePicture : user.profilePicture} />
                <AvatarFallback className="text-2xl">
                  {(isEditing ? editData.username : user.username).charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {isEditing && (
                <div className="w-full max-w-xs space-y-2">
                  <Label htmlFor="profilePicture">Profile Picture URL</Label>
                  <Input
                    id="profilePicture"
                    value={editData.profilePicture}
                    onChange={(e) => setEditData((prev) => ({ ...prev, profilePicture: e.target.value }))}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={editData.username}
                        onChange={(e) => setEditData((prev) => ({ ...prev, username: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Dietary Preferences</Label>
                    <div className="flex flex-wrap gap-2">
                      {dietaryOptions.map((option) => (
                        <Badge
                          key={option}
                          variant={editData.dietaryPreferences.includes(option) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleDietaryPreference(option)}
                        >
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2 bg-transparent">
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">{user.username}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>

                  {user.dietaryPreferences && user.dietaryPreferences.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Dietary Preferences</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.dietaryPreferences.map((preference) => (
                          <Badge key={preference} variant="secondary">
                            {preference}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <ChefHat className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-2xl font-bold">{userRecipes.length}</p>
                      <p className="text-sm text-muted-foreground">Recipes Created</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Heart className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-2xl font-bold">{favoriteRecipes.length}</p>
                      <p className="text-sm text-muted-foreground">Favorites</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <MessageCircle className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-2xl font-bold">{totalComments}</p>
                      <p className="text-sm text-muted-foreground">Comments</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recipe Tabs */}
      <Tabs defaultValue="created" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="created">My Recipes ({userRecipes.length})</TabsTrigger>
          <TabsTrigger value="favorites">Favorites ({favoriteRecipes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="created" className="space-y-4">
          {userRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No recipes yet</h3>
                <p className="text-muted-foreground">Start sharing your favorite recipes with the community!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          {favoriteRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                <p className="text-muted-foreground">Start favoriting recipes you love to see them here!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
