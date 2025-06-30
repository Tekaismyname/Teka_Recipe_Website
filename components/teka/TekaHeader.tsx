"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, User, LogOut, Heart, Calendar, Plus, Utensils, Leaf, BookOpen } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface TekaHeaderProps {
  currentView: string
  setCurrentView: (view: string) => void
  onAddRecipe: () => void
}

export default function TekaHeader({ currentView, setCurrentView, onAddRecipe }: TekaHeaderProps) {
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="bg-[#F4D03F] border-b border-[#F1C40F] sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#8B4513] rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-[#D2691E] rounded-full relative">
                  <div className="absolute top-1 left-1 w-2 h-2 bg-[#F4D03F] rounded-full"></div>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Teka</h1>
            </div>

            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setCurrentView("home")}
                className={`text-lg font-medium transition-colors ${
                  currentView === "home" ? "text-gray-900 font-semibold" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Home
              </button>

              {/* Explore Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`text-lg font-medium transition-colors ${
                      ["explore", "ingredients", "techniques", "seasonal"].includes(currentView)
                        ? "text-gray-900 font-semibold"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    Explore
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setCurrentView("explore")}>
                    <Search className="mr-2 h-4 w-4" />
                    <span>All Recipes</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentView("ingredients")}>
                    <Leaf className="mr-2 h-4 w-4" />
                    <span>Vietnamese Ingredients</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentView("techniques")}>
                    <Utensils className="mr-2 h-4 w-4" />
                    <span>Cooking Techniques</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentView("seasonal")}>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Seasonal Recipes</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                onClick={() => setCurrentView("blog")}
                className={`text-lg font-medium transition-colors ${
                  currentView === "blog" || currentView === "blog-post"
                    ? "text-gray-900 font-semibold"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Stories
              </button>

              <button
                onClick={() => setCurrentView("about")}
                className={`text-lg font-medium transition-colors ${
                  currentView === "about" ? "text-gray-900 font-semibold" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                About us
              </button>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 border-none rounded-full text-gray-600 placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={onAddRecipe}
              className="bg-[#F39C12] hover:bg-[#E67E22] text-white rounded-full px-4 py-2 hidden sm:flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Recipe
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profilePicture || "/placeholder.svg"} alt={user?.username} />
                    <AvatarFallback className="bg-[#E67E22] text-white">
                      {user?.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem onClick={() => setCurrentView("profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentView("collections")}>
                  <Heart className="mr-2 h-4 w-4" />
                  <span>My Collections</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentView("meal-planner")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Meal Planner</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setCurrentView("blog")}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Food Stories</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 border-none rounded-full text-gray-600 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
