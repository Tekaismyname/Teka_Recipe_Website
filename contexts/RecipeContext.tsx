"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  instructions: string
  cookingTime: number
  servings: number
  category: string
  rating: number
  nutritionalInfo: {
    calories: number
    protein: number
    fat: number
    carbs: number
  }
  comments: Comment[]
  createdBy: string
  createdAt: string
  imageUrl: string
}

export interface Comment {
  id: string
  username: string
  text: string
  timestamp: string
}

interface RecipeContextType {
  recipes: Recipe[]
  favorites: string[]
  addRecipe: (recipe: Omit<Recipe, "id" | "createdAt" | "rating" | "comments">) => void
  updateRecipe: (id: string, recipe: Partial<Recipe>) => void
  deleteRecipe: (id: string) => void
  toggleFavorite: (recipeId: string) => void
  rateRecipe: (recipeId: string, rating: number) => void
  addComment: (recipeId: string, comment: string) => void
  searchRecipes: (query: string) => Recipe[]
  filterRecipes: (category?: string, maxTime?: number) => Recipe[]
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

// Mock data
const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Vietnamese Rice Paper Rolls",
    description:
      "Vietnamese Rice Paper Rolls (Gỏi cuốn) are fresh and vibrant finger foods made by wrapping shrimp, vermicelli noodles, lettuce, mint, and bean sprouts in delicate rice paper. Served with a creamy peanut dipping sauce, they're light, healthy, and full of texture—perfect as an appetizer or snack.",
    ingredients: [
      "Rice paper sheets",
      "Cooked prawns (halved lengthwise)",
      "Vermicelli noodles (soaked)",
      "Lettuce leaves (soft types)",
      "Fresh mint leaves",
      "Bean sprouts",
      "Optional: crushed chili",
    ],
    instructions:
      "1. Prepare the sauce – Mix peanut butter, hoisin, vinegar, garlic, milk (or water), and chili paste. Microwave briefly and whisk until smooth.\n2. Soak noodles – Cover vermicelli with warm water for about 2 minutes, then drain.\n3. Prep fillings – Peel and halve the prawns, remove tough ribs from lettuce.\n4. Wrap noodles and sprouts in a lettuce leaf to form a neat bundle.\n5. Dip rice paper in warm water for 2 seconds and place smooth-side down.\n6. Assemble rolls – Place prawns and mint, add the lettuce bundle, fold sides, and roll tightly from the bottom.\n7. Serve immediately with peanut dipping sauce.",
    cookingTime: 20,
    servings: 7,
    category: "Lunch",
    rating: 4.8,
    nutritionalInfo: { calories: 120, protein: 8, fat: 3, carbs: 18 },
    comments: [],
    createdBy: "chef1",
    createdAt: "2024-01-10T08:00:00Z",
    imageUrl: "/images/Card/Vietnamese-Rice-Paper-Rolls-7.png",
  },
  {
    id: "2",
    title: "Vietnamese Caramel Ginger Chicken",
    description:
      "Vietnamese Caramel Ginger Chicken is a bold, flavorful dish that combines the deep richness of caramelized sugar with the warm, spicy fragrance of fresh ginger. Using just a handful of ingredients, this dish delivers a perfect balance of sweet, salty, and savory notes, making it an ideal choice for a quick yet impressive dinner.",
    ingredients: [
      "Chicken thighs (cut into bite-sized pieces)",
      "Brown sugar (to form the base of the caramel sauce)",
      "Fish sauce (for deep umami flavor)",
      "Fresh ginger (finely sliced or julienned)",
      "Optional: chili and shallots (for extra aroma and heat)",
    ],
    instructions:
      "1. Marinate the chicken – Briefly coat chicken in fish sauce (and chili, if using).\n2. In a large pan, melt brown sugar in oil until it turns into a golden caramel.\n3. Add the chicken, ginger, and shallots to the caramel. Stir well to coat.\n4. Add a splash of water, cover, and let simmer for about 10-12 minutes.\n5. Once the sauce thickens and glazes the chicken, remove from heat.\n6. Serve hot with steamed rice.",
    cookingTime: 12,
    servings: 5,
    category: "Dinner",
    rating: 4.6,
    nutritionalInfo: { calories: 320, protein: 28, fat: 12, carbs: 25 },
    comments: [],
    createdBy: "chef2",
    createdAt: "2024-01-12T12:00:00Z",
    imageUrl:"/images/Card/Vietnamese-Ginger-Caramel-Chicken_6-close-up.png",
  },
  {
    id: "6",
    title: "Pork Meatballs for Banh Mi",
    description:
      "These Vietnamese pork meatballs are tender and juicy, poached (not fried) for an amazingly soft texture. Perfectly seasoned with garlic, fish sauce, and a hint of sweetness, they're ideal stuffed into a bánh mì or served over rice for a comforting meal.",
    ingredients: [
      "Ground pork (soft and juicy when gently poached)",
      "Grated jicama (or apple/daikon) (adds moisture and texture)",
      "Garlic and ginger (bring depth and aroma)",
      "Fish sauce (provides classic Vietnamese umami flavor)",
      "Corn starch (helps bind the meatballs gently)",
      "Sugar and pepper (balance seasoning)",
      "Green onions (mild bite and freshness)",
    ],
    instructions:
      "1. Combine meatball ingredients in a bowl, mixing until just blended.\n2. Roll into ~12 evenly sized meatballs (2 Tbsp each).\n3. Stir cornflour into poaching liquid ingredients in a skillet.\n4. Bring sauce to a gentle simmer, then add meatballs carefully.\n5. Poach for about 7 minutes, turning occasionally, until just cooked.\n6. Remove meatballs if not serving immediately to prevent overcooking.",
    cookingTime: 15,
    servings: 4,
    category: "Lunch",
    rating: 4.5,
    nutritionalInfo: { calories: 280, protein: 22, fat: 18, carbs: 8 },
    comments: [],
    createdBy: "chef6",
    createdAt: "2024-01-18T11:00:00Z",
    imageUrl: "/images/Card/Pork-Banh-Mi-Meatballs_8.png",
  },
  {
    id: "4",
    title: "Crispy Pork Banh Mi",
    description: "Here's my recipe for Crispy Pork Belly Banh Mi, possibly the best sandwich I've ever had in my life!",
    ingredients: [
      "Pork belly (skin on)",
      "Vietnamese baguette",
      "Pickled vegetables (carrot, daikon)",
      "Fresh cilantro",
      "Cucumber slices",
      "Pâté (optional)",
      "Mayonnaise",
      "Soy sauce",
      "Fish sauce",
      "Sugar",
      "Garlic",
    ],
    instructions:
      "1. Score pork belly skin and season with salt.\n2. Roast at high heat until skin is crispy.\n3. Slice pork belly into thick pieces.\n4. Split baguette and spread with pâté and mayo.\n5. Layer with pork, pickled vegetables, cucumber, and cilantro.\n6. Serve immediately while pork is still warm.",
    cookingTime: 45,
    servings: 4,
    category: "Lunch",
    rating: 4.7,
    nutritionalInfo: { calories: 520, protein: 25, fat: 32, carbs: 35 },
    comments: [],
    createdBy: "chef4",
    createdAt: "2024-01-15T10:00:00Z",
    imageUrl: "/images/Card/banh mi.png",
  },
  {
    id: "5",
    title: "Red Vietnamese Fried Rice",
    description:
      "Red Vietnamese Fried Rice is a quick, flavorful twist on the traditional 'Cơm Dỏ' of Vietnam. It's a vibrant fried rice dish made with day-old rice, tomato paste, garlic, ham, peas, and egg – all stir-fried together in under 15 minutes. It's easy, hearty, and packed with umami flavor – perfect as a main or side dish.",
    ingredients: [
      "Cold cooked rice (best if it's a day old)",
      "Butter & garlic (the base for a rich, aromatic flavor)",
      "Ham, frozen peas, and eggs (provide protein, color, and heartiness)",
      "Tomato paste (gives the dish its signature red color and a sweet tang)",
      "Fish sauce, light soy sauce, and sugar (create a balance of savory, salty, and slightly sweet notes)",
    ],
    instructions:
      "1. Sauté garlic and ham – Melt butter, add garlic, then stir-fry ham and peas briefly.\n2. Add rice and tomato paste – Stir in the cold rice and tomato paste, breaking up the clumps and coating evenly.\n3. Season well – Add fish sauce, soy sauce, and sugar. Cook for 1-2 more minutes until the rice is evenly colored and slightly crispy.\n4. Add egg – Push the rice to one side, add butter, then crack in the egg and lightly scramble. Mix it into the rice.\n5. Serve hot – Once the egg is fully cooked and mixed, serve immediately.",
    cookingTime: 7,
    servings: 4,
    category: "Dinner",
    rating: 4.4,
    nutritionalInfo: { calories: 380, protein: 15, fat: 12, carbs: 55 },
    comments: [],
    createdBy: "chef5",
    createdAt: "2024-01-20T16:00:00Z",
    imageUrl: "/images/Card/Red-Vietnamese-Fried-Rice_2.png",
  },
  {
    id: "3",
    title: "Vietnamese Pho",
    description:
      "Vietnamese Pho is a deeply comforting and aromatic noodle soup made with a clear beef broth simmered for hours with spices, charred onion and ginger. Served with rice noodles and thin slices of beef, it's light yet nourishing, and packed with rich umami flavor—perfect for both everyday meals and special gatherings.",
    ingredients: [
      "Beef bones",
      "Brisket",
      "Onion (charred)",
      "Ginger (charred)",
      "Star anise",
      "Cloves",
      "Cinnamon stick",
      "Coriander seeds",
      "Cardamom pods",
      "Fish sauce",
      "White sugar",
      "Flat rice noodles (pho noodles)",
      "Thinly sliced raw beef",
      "Cooked brisket (from broth)",
      "Bean sprouts",
      "Fresh herbs (Thai basil, cilantro)",
      "Lime wedges",
      "Hoisin sauce",
      "Sriracha (optional)",
    ],
    instructions:
      "1. Parboil bones and brisket – Boil briefly, drain and rinse to remove impurities.\n2. Simmer broth – Refill pot with clean water. Add bones, brisket, charred onion, ginger, and toasted spices. Simmer uncovered for 3 hours.\n3. Remove brisket – Once tender, take it out and set aside. Continue simmering broth 30-40 more minutes.\n4. Strain broth – Discard solids. Season with fish sauce and sugar to taste.\n5. Prepare noodles – Soak or boil noodles according to package instructions.\n6. Assemble bowls – Add noodles, raw beef, sliced brisket, and herbs.\n7. Serve – Ladle hot broth into each bowl to cook the beef, and serve with lime, hoisin, and sriracha on the side.",
    cookingTime: 240,
    servings: 6,
    category: "Dinner",
    rating: 4.9,
    nutritionalInfo: { calories: 450, protein: 35, fat: 8, carbs: 55 },
    comments: [],
    createdBy: "chef3",
    createdAt: "2024-01-08T14:00:00Z",
    imageUrl: "/images/Card/Beef-Pho_6.png",
  },
  {
    id: "7",
    title: "Bun Cha (Grilled Pork with Noodles)",
    description:
      "Bun Cha is a beloved Hanoi street food featuring grilled pork patties and pork belly served with rice vermicelli, fresh herbs, and a tangy dipping sauce. This dish perfectly represents the balance of flavors that Vietnamese cuisine is famous for.",
    ingredients: [
      "Ground pork",
      "Pork belly (sliced)",
      "Rice vermicelli noodles",
      "Fresh herbs (lettuce, mint, cilantro)",
      "Fish sauce",
      "Sugar",
      "Rice vinegar",
      "Garlic",
      "Chili",
      "Pickled vegetables",
    ],
    instructions:
      "1. Mix ground pork with seasonings and form into patties.\n2. Marinate pork belly slices.\n3. Grill both pork patties and belly until caramelized.\n4. Prepare dipping sauce with fish sauce, sugar, vinegar, and chili.\n5. Cook rice vermicelli according to package instructions.\n6. Serve with fresh herbs and pickled vegetables.",
    cookingTime: 30,
    servings: 4,
    category: "Lunch",
    rating: 4.7,
    nutritionalInfo: { calories: 420, protein: 32, fat: 18, carbs: 35 },
    comments: [],
    createdBy: "chef7",
    createdAt: "2024-02-01T12:00:00Z",
    imageUrl: "/images/Card/Bun cha recipe.png",
    
  },
  {
    id: "8",
    title: "Bun Bo Hue (Spicy Beef Noodle Soup)",
    description:
      "Bun Bo Hue is a spicy and aromatic noodle soup from the ancient imperial city of Hue. This complex dish features a rich, lemongrass-scented broth with beef, pork, and thick rice noodles, topped with fresh herbs and vegetables.",
    ingredients: [
      "Beef bones",
      "Pork bones",
      "Beef shank",
      "Pork hock",
      "Thick rice noodles (bun bo hue)",
      "Lemongrass",
      "Shrimp paste",
      "Chili oil",
      "Fish sauce",
      "Fresh herbs",
      "Bean sprouts",
      "Lime wedges",
    ],
    instructions:
      "1. Simmer beef and pork bones for rich broth.\n2. Add lemongrass, shrimp paste, and seasonings.\n3. Cook beef shank and pork hock until tender.\n4. Prepare thick rice noodles.\n5. Slice cooked meats.\n6. Assemble bowls with noodles, meat, and hot broth.\n7. Serve with fresh herbs, bean sprouts, and lime.",
    cookingTime: 180,
    servings: 6,
    category: "Dinner",
    rating: 4.8,
    nutritionalInfo: { calories: 520, protein: 38, fat: 15, carbs: 45 },
    comments: [],
    createdBy: "chef8",
    createdAt: "2024-02-05T14:00:00Z",
    imageUrl: "/images/Card/bun bo Hue recipe_0.png",
  },
]

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // Load recipes from localStorage or use mock data
    const savedRecipes = localStorage.getItem("recipes")
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes))
    } else {
      setRecipes(mockRecipes)
      localStorage.setItem("recipes", JSON.stringify(mockRecipes))
    }

    // Load favorites
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const saveRecipes = (newRecipes: Recipe[]) => {
    setRecipes(newRecipes)
    localStorage.setItem("recipes", JSON.stringify(newRecipes))
  }

  const saveFavorites = (newFavorites: string[]) => {
    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  const addRecipe = (recipeData: Omit<Recipe, "id" | "createdAt" | "rating" | "comments">) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      rating: 0,
      comments: [],
    }
    const updatedRecipes = [...recipes, newRecipe]
    saveRecipes(updatedRecipes)
  }

  const updateRecipe = (id: string, updates: Partial<Recipe>) => {
    const updatedRecipes = recipes.map((recipe) => (recipe.id === id ? { ...recipe, ...updates } : recipe))
    saveRecipes(updatedRecipes)
  }

  const deleteRecipe = (id: string) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id)
    saveRecipes(updatedRecipes)

    // Remove from favorites if it exists
    const updatedFavorites = favorites.filter((fav) => fav !== id)
    saveFavorites(updatedFavorites)
  }

  const toggleFavorite = (recipeId: string) => {
    const updatedFavorites = favorites.includes(recipeId)
      ? favorites.filter((id) => id !== recipeId)
      : [...favorites, recipeId]
    saveFavorites(updatedFavorites)
  }

  const rateRecipe = (recipeId: string, rating: number) => {
    updateRecipe(recipeId, { rating })
  }

  const addComment = (recipeId: string, commentText: string) => {
    const recipe = recipes.find((r) => r.id === recipeId)
    if (recipe) {
      const newComment: Comment = {
        id: Date.now().toString(),
        username: "Current User", // In real app, get from auth context
        text: commentText,
        timestamp: new Date().toISOString(),
      }
      const updatedComments = [...recipe.comments, newComment]
      updateRecipe(recipeId, { comments: updatedComments })
    }
  }

  const searchRecipes = (query: string): Recipe[] => {
    if (!query) return recipes
    const lowercaseQuery = query.toLowerCase()
    return recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowercaseQuery) ||
        recipe.description.toLowerCase().includes(lowercaseQuery) ||
        recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(lowercaseQuery)),
    )
  }

  const filterRecipes = (category?: string, maxTime?: number): Recipe[] => {
    return recipes.filter((recipe) => {
      if (category && recipe.category !== category) return false
      if (maxTime && recipe.cookingTime > maxTime) return false
      return true
    })
  }

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        favorites,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        toggleFavorite,
        rateRecipe,
        addComment,
        searchRecipes,
        filterRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}

export function useRecipes() {
  const context = useContext(RecipeContext)
  if (context === undefined) {
    throw new Error("useRecipes must be used within a RecipeProvider")
  }
  return context
}
