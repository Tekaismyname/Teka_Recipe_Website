"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Collection {
  id: string
  name: string
  description: string
  recipeIds: string[]
  createdAt: string
  createdBy: string
}

interface CollectionContextType {
  collections: Collection[]
  createCollection: (name: string, description: string) => void
  updateCollection: (id: string, updates: Partial<Collection>) => void
  deleteCollection: (id: string) => void
  addRecipeToCollection: (collectionId: string, recipeId: string) => void
  removeRecipeFromCollection: (collectionId: string, recipeId: string) => void
  reorderRecipesInCollection: (collectionId: string, newOrder: string[]) => void
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined)

export function CollectionProvider({ children }: { children: React.ReactNode }) {
  const [collections, setCollections] = useState<Collection[]>([])

  useEffect(() => {
    const savedCollections = localStorage.getItem("collections")
    if (savedCollections) {
      setCollections(JSON.parse(savedCollections))
    } else {
      // Create default collections
      const defaultCollections: Collection[] = [
        {
          id: "favorites",
          name: "My Favorites",
          description: "My favorite recipes",
          recipeIds: [],
          createdAt: new Date().toISOString(),
          createdBy: "system",
        },
        {
          id: "to-try",
          name: "Want to Try",
          description: "Recipes I want to try soon",
          recipeIds: [],
          createdAt: new Date().toISOString(),
          createdBy: "system",
        },
      ]
      setCollections(defaultCollections)
      localStorage.setItem("collections", JSON.stringify(defaultCollections))
    }
  }, [])

  const saveCollections = (newCollections: Collection[]) => {
    setCollections(newCollections)
    localStorage.setItem("collections", JSON.stringify(newCollections))
  }

  const createCollection = (name: string, description: string) => {
    const newCollection: Collection = {
      id: Date.now().toString(),
      name,
      description,
      recipeIds: [],
      createdAt: new Date().toISOString(),
      createdBy: "current-user", // In real app, get from auth context
    }
    const updatedCollections = [...collections, newCollection]
    saveCollections(updatedCollections)
  }

  const updateCollection = (id: string, updates: Partial<Collection>) => {
    const updatedCollections = collections.map((collection) =>
      collection.id === id ? { ...collection, ...updates } : collection,
    )
    saveCollections(updatedCollections)
  }

  const deleteCollection = (id: string) => {
    const updatedCollections = collections.filter((collection) => collection.id !== id)
    saveCollections(updatedCollections)
  }

  const addRecipeToCollection = (collectionId: string, recipeId: string) => {
    const updatedCollections = collections.map((collection) =>
      collection.id === collectionId && !collection.recipeIds.includes(recipeId)
        ? { ...collection, recipeIds: [...collection.recipeIds, recipeId] }
        : collection,
    )
    saveCollections(updatedCollections)
  }

  const removeRecipeFromCollection = (collectionId: string, recipeId: string) => {
    const updatedCollections = collections.map((collection) =>
      collection.id === collectionId
        ? { ...collection, recipeIds: collection.recipeIds.filter((id) => id !== recipeId) }
        : collection,
    )
    saveCollections(updatedCollections)
  }

  const reorderRecipesInCollection = (collectionId: string, newOrder: string[]) => {
    const updatedCollections = collections.map((collection) =>
      collection.id === collectionId ? { ...collection, recipeIds: newOrder } : collection,
    )
    saveCollections(updatedCollections)
  }

  return (
    <CollectionContext.Provider
      value={{
        collections,
        createCollection,
        updateCollection,
        deleteCollection,
        addRecipeToCollection,
        removeRecipeFromCollection,
        reorderRecipesInCollection,
      }}
    >
      {children}
    </CollectionContext.Provider>
  )
}

export function useCollections() {
  const context = useContext(CollectionContext)
  if (context === undefined) {
    throw new Error("useCollections must be used within a CollectionProvider")
  }
  return context
}
