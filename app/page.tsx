"use client"

import { useState } from "react"
import { AuthProvider } from "@/contexts/AuthContext"
import { RecipeProvider } from "@/contexts/RecipeContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { CollectionProvider } from "@/contexts/CollectionContext"
import { BlogProvider } from "@/contexts/BlogContext"
import TekaHeader from "@/components/teka/TekaHeader"
import LoginForm from "@/components/auth/LoginForm"
import TekaHome from "@/components/teka/TekaHome"
import TekaExplore from "@/components/teka/TekaExplore"
import TekaAbout from "@/components/teka/TekaAbout"
import RecipeForm from "@/components/recipes/RecipeForm"
import MealPlanner from "@/components/meal-planner/MealPlanner"
import UserProfile from "@/components/profile/UserProfile"
import RecipeCollections from "@/components/collections/RecipeCollections"
import VietnameseIngredients from "@/components/teka/VietnameseIngredients"
import CookingTechniques from "@/components/teka/CookingTechniques"
import SeasonalRecommendations from "@/components/teka/SeasonalRecommendations"
import BlogHome from "@/components/blog/BlogHome"
import BlogPost from "@/components/blog/BlogPost"
import { useAuth } from "@/contexts/AuthContext"

function AppContent() {
  const { user } = useAuth()
  const [currentView, setCurrentView] = useState("home")
  const [showRecipeForm, setShowRecipeForm] = useState(false)
  const [selectedBlogPost, setSelectedBlogPost] = useState<string | null>(null)

  if (!user) {
    return <LoginForm />
  }

  const handleBlogPostSelect = (slug: string) => {
    setSelectedBlogPost(slug)
    setCurrentView("blog-post")
  }

  const handleBackToBlog = () => {
    setSelectedBlogPost(null)
    setCurrentView("blog")
  }

  return (
    <div className="min-h-screen bg-white">
      <TekaHeader
        currentView={currentView}
        setCurrentView={setCurrentView}
        onAddRecipe={() => setShowRecipeForm(true)}
      />

      <main>
        {showRecipeForm && <RecipeForm onClose={() => setShowRecipeForm(false)} />}

        {currentView === "home" && !showRecipeForm && <TekaHome />}
        {currentView === "explore" && !showRecipeForm && <TekaExplore />}
        {currentView === "about" && <TekaAbout />}
        {currentView === "ingredients" && <VietnameseIngredients />}
        {currentView === "techniques" && <CookingTechniques />}
        {currentView === "seasonal" && <SeasonalRecommendations />}
        {currentView === "blog" && <BlogHome onPostSelect={handleBlogPostSelect} />}
        {currentView === "blog-post" && selectedBlogPost && (
          <BlogPost slug={selectedBlogPost} onBack={handleBackToBlog} />
        )}
        {currentView === "meal-planner" && <MealPlanner />}
        {currentView === "profile" && <UserProfile />}
        {currentView === "collections" && <RecipeCollections />}
      </main>
    </div>
  )
}

export default function Home() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RecipeProvider>
          <CollectionProvider>
            <BlogProvider>
              <AppContent />
            </BlogProvider>
          </CollectionProvider>
        </RecipeProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
