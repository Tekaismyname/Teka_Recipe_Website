"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, GripVertical } from "lucide-react"
import { useCollections } from "@/contexts/CollectionContext"
import DraggableRecipeList from "./DraggableRecipeList"

export default function RecipeCollections() {
  const { collections, createCollection, deleteCollection } = useCollections()
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newCollection, setNewCollection] = useState({
    name: "",
    description: "",
  })

  const handleCreateCollection = () => {
    if (newCollection.name.trim()) {
      createCollection(newCollection.name.trim(), newCollection.description.trim())
      setNewCollection({ name: "", description: "" })
      setShowCreateDialog(false)
    }
  }

  const handleDeleteCollection = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the collection "${name}"?`)) {
      deleteCollection(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Collections</h1>
          <p className="text-muted-foreground">Organize your recipes into custom collections</p>
        </div>

        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Collection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Collection</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="collection-name">Collection Name</Label>
                <Input
                  id="collection-name"
                  value={newCollection.name}
                  onChange={(e) => setNewCollection((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter collection name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collection-description">Description (Optional)</Label>
                <Textarea
                  id="collection-description"
                  value={newCollection.description}
                  onChange={(e) => setNewCollection((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your collection"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCollection} disabled={!newCollection.name.trim()}>
                  Create Collection
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {collections.map((collection) => (
          <Card key={collection.id} className="h-fit">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    {collection.name}
                  </CardTitle>
                  {collection.description && <p className="text-sm text-muted-foreground">{collection.description}</p>}
                  <Badge variant="secondary" className="w-fit">
                    {collection.recipeIds.length} recipe{collection.recipeIds.length !== 1 ? "s" : ""}
                  </Badge>
                </div>
                {collection.createdBy !== "system" && (
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCollection(collection.id, collection.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <DraggableRecipeList collection={collection} />
            </CardContent>
          </Card>
        ))}
      </div>

      {collections.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No collections yet</h3>
                <p className="text-muted-foreground">Create your first collection to organize your recipes</p>
              </div>
              <Button onClick={() => setShowCreateDialog(true)}>Create Collection</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
