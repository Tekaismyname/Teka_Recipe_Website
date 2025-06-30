"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock, Eye, Heart, Share2, Calendar, Tag } from "lucide-react"
import { useBlog } from "@/contexts/BlogContext"
import TekaFooter from "@/components/teka/TekaFooter"

interface BlogPostProps {
  slug: string
  onBack: () => void
}

export default function BlogPost({ slug, onBack }: BlogPostProps) {
  const { getPostBySlug, incrementViews, likePost } = useBlog()
  const post = getPostBySlug(slug)

  useEffect(() => {
    if (post) {
      incrementViews(post.id)
    }
  }, [post, incrementViews])

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h1>
          <Button onClick={onBack} className="bg-[#F4D03F] hover:bg-[#F1C40F] text-gray-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert("Link copied to clipboard!")
      } catch (err) {
        console.log("Error copying to clipboard:", err)
      }
    }
  }

  const handleLike = () => {
    likePost(post.id)
  }

  // Convert markdown-style content to JSX (simplified)
  const renderContent = (content: string) => {
    const lines = content.split("\n")
    return lines.map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-3xl font-bold text-gray-800 mb-6 mt-8">
            {line.substring(2)}
          </h1>
        )
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-800 mb-4 mt-6">
            {line.substring(3)}
          </h2>
        )
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-800 mb-3 mt-5">
            {line.substring(4)}
          </h3>
        )
      }
      if (line.startsWith("#### ")) {
        return (
          <h4 key={index} className="text-lg font-semibold text-gray-800 mb-2 mt-4">
            {line.substring(5)}
          </h4>
        )
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="text-gray-700 mb-1 ml-4">
            {line.substring(2)}
          </li>
        )
      }
      if (line.trim() === "") {
        return <br key={index} />
      }
      if (line.match(/^\d+\./)) {
        return (
          <li key={index} className="text-gray-700 mb-1 ml-4 list-decimal">
            {line.substring(line.indexOf(".") + 1).trim()}
          </li>
        )
      }
      return (
        <p key={index} className="text-gray-700 mb-4 leading-relaxed">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <Button onClick={onBack} variant="ghost" className="text-gray-600 hover:text-gray-800 hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[400px] bg-gray-200">
        <img
          src={post.imageUrl || "/placeholder.svg?height=400&width=1200"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-[#F4D03F] text-gray-800">{post.category}</Badge>
            {post.featured && <Badge className="bg-[#F39C12] text-white">Featured</Badge>}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">{post.title}</h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>

          {/* Author and Meta Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-800">{post.author}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.views} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes} likes</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleLike}
                  variant="outline"
                  size="sm"
                  className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 bg-transparent"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Like
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 bg-transparent"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed">{renderContent(post.content)}</div>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-gray-500" />
            <span className="font-semibold text-gray-700">Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-[#F4D03F] to-[#F39C12]">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Enjoyed this story?</h3>
            <p className="text-gray-700 mb-6">
              Discover more Vietnamese food culture stories and cooking tips on our blog.
            </p>
            <Button onClick={onBack} className="bg-white text-gray-800 hover:bg-gray-100 font-semibold px-8 py-3">
              Read More Stories
            </Button>
          </CardContent>
        </Card>
      </article>

      <TekaFooter />
    </div>
  )
}
