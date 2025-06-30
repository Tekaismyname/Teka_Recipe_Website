"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Check } from "lucide-react"
import { useCollections } from "@/contexts/CollectionContext"

interface AddToCollectionButtonProps {
  recipeId: string
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg"
}

export default function AddToCollectionButton({
  recipeId,
  variant = "ghost",
  size = "sm",
}: AddToCollectionButtonProps) {
  const { collections, addRecipeToCollection, removeRecipeFromCollection } = useCollections()
  const [isOpen, setIsOpen] = useState(false)

  const toggleRecipeInCollection = (collectionId: string) => {
    const collection = collections.find((c) => c.id === collectionId)
    if (collection?.recipeIds.includes(recipeId)) {
      removeRecipeFromCollection(collectionId, recipeId)
    } else {
      addRecipeToCollection(collectionId, recipeId)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add to Collection</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {collections.map((collection) => {
          const isInCollection = collection.recipeIds.includes(recipeId)
          return (
            <DropdownMenuItem
              key={collection.id}
              onClick={() => toggleRecipeInCollection(collection.id)}
              className="flex items-center justify-between"
            >
              <span>{collection.name}</span>
              {isInCollection && <Check className="h-4 w-4 text-green-600" />}
            </DropdownMenuItem>
          )
        })}
        {collections.length === 0 && <DropdownMenuItem disabled>No collections available</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
