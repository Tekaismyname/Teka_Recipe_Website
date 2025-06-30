"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  authorAvatar: string
  publishedAt: string
  readTime: number
  category: string
  tags: string[]
  imageUrl: string
  featured: boolean
  views: number
  likes: number
}

interface BlogContextType {
  posts: BlogPost[]
  categories: string[]
  addPost: (post: Omit<BlogPost, "id" | "publishedAt" | "views" | "likes">) => void
  updatePost: (id: string, updates: Partial<BlogPost>) => void
  deletePost: (id: string) => void
  getPostBySlug: (slug: string) => BlogPost | undefined
  getPostsByCategory: (category: string) => BlogPost[]
  getFeaturedPosts: () => BlogPost[]
  likePost: (id: string) => void
  incrementViews: (id: string) => void
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

// Mock blog posts
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Vietnamese Pho: A Journey Through History",
    slug: "art-of-vietnamese-pho-history",
    excerpt:
      "Discover the fascinating history behind Vietnam's most iconic dish and learn why pho is more than just a soup - it's a cultural symbol that tells the story of Vietnamese resilience and creativity.",
    content: `# The Art of Vietnamese Pho: A Journey Through History

Pho (pronounced "fuh") is more than just Vietnam's national dish – it's a cultural phenomenon that embodies the soul of Vietnamese cuisine. This aromatic noodle soup has traveled from the streets of Hanoi to kitchens around the world, carrying with it centuries of tradition and the story of a resilient people.

## The Origins of Pho

The exact origins of pho are debated among food historians, but most agree it emerged in northern Vietnam in the early 20th century. Some believe it evolved from the French pot-au-feu during the colonial period, while others trace its roots to Chinese noodle soups brought by immigrants.

What's certain is that pho represents the Vietnamese genius for adaptation and fusion. Like the Vietnamese people themselves, pho took influences from various cultures and transformed them into something uniquely Vietnamese.

## The Sacred Broth

The heart of any good pho lies in its broth – a clear, aromatic liquid that takes hours to perfect. Traditional pho broth is made by simmering beef or chicken bones with a carefully balanced blend of spices:

- **Star anise** - provides the distinctive licorice-like aroma
- **Cinnamon** - adds warmth and sweetness
- **Cloves** - contributes depth and complexity
- **Cardamom** - brings a subtle floral note
- **Fennel seeds** - enhances the anise flavor

The process is meditative, requiring patience and attention. Vietnamese cooks often say that you can taste the cook's mood in the broth – a rushed or angry cook will never make good pho.

## Regional Variations

As pho spread throughout Vietnam, each region added its own touch:

### Pho Bac (Northern Style)
- Clear, clean broth
- Wider noodles
- Simple garnishes: onions, cilantro, lime
- More conservative approach to toppings

### Pho Nam (Southern Style)
- Slightly sweeter broth
- Thinner noodles
- Abundant fresh herbs: Thai basil, cilantro, mint
- Bean sprouts and lime wedges
- More liberal use of hoisin and sriracha

## The Ritual of Eating Pho

Eating pho is a ritual that connects Vietnamese people to their heritage. The proper way involves:

1. **Smell first** - inhale the aromatic steam
2. **Taste the broth** - this tells you everything about the cook's skill
3. **Add garnishes gradually** - don't overwhelm the delicate balance
4. **Eat quickly** - pho is best enjoyed hot and fresh

## Pho as Cultural Identity

During the Vietnam War and its aftermath, pho became a symbol of home for Vietnamese refugees around the world. Opening a pho restaurant was often the first step for Vietnamese immigrants to establish themselves in new countries.

Today, pho restaurants serve as community centers where Vietnamese culture is preserved and shared. The sight of families gathering around steaming bowls of pho, speaking Vietnamese and sharing stories, keeps traditions alive across generations.

## The Philosophy of Pho

Vietnamese philosophy emphasizes balance and harmony, principles clearly reflected in pho. The dish balances:

- **Hot and cold** (warm broth with cool herbs)
- **Soft and crunchy** (tender noodles with crisp vegetables)
- **Sweet and salty** (natural sweetness of bones with fish sauce)
- **Simple and complex** (few ingredients creating deep flavors)

## Making Pho at Home

While restaurant pho is wonderful, making it at home connects you to generations of Vietnamese cooks. The process teaches patience, respect for ingredients, and the importance of taking time to create something meaningful.

Remember: good pho cannot be rushed. The bones must simmer slowly, the spices must be toasted with care, and the final assembly must be done with attention and love.

## Conclusion

Pho is Vietnam on a spoon – complex yet comforting, traditional yet adaptable, simple yet profound. Every bowl tells a story of Vietnamese history, culture, and the enduring power of food to bring people together.

When you eat pho, you're not just having a meal – you're participating in a cultural tradition that spans generations and connects you to the heart of Vietnam.`,
    author: "Đăng Nguyễn",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-15T10:00:00Z",
    readTime: 8,
    category: "Culture & History",
    tags: ["pho", "history", "culture", "tradition", "vietnamese cuisine"],
    imageUrl: "/images/Stories/Beef-Pho_6.png",
    featured: true,
    views: 1250,
    likes: 89,
  },
  {
    id: "2",
    title: "Street Food Secrets: The Magic of Vietnamese Bánh Mì",
    slug: "street-food-secrets-banh-mi-magic",
    excerpt:
      "Explore the fascinating fusion history of bánh mì and discover the secrets behind Vietnam's most beloved sandwich that perfectly represents the country's ability to blend cultures.",
    content: `# Street Food Secrets: The Magic of Vietnamese Bánh Mì

The bánh mì is perhaps the most perfect example of Vietnamese culinary fusion – a sandwich that tells the story of Vietnam's complex history while creating something entirely new and delicious.

## A Sandwich Born from History

The bánh mì emerged during French colonial rule in Vietnam (1887-1954), when French baguettes met Vietnamese ingredients and creativity. What started as cultural imposition became cultural innovation.

Vietnamese bakers adapted the French baguette, making it lighter and airier with rice flour additions. This created the perfect vessel for Vietnamese flavors – crispy outside, soft inside, and able to hold generous fillings without falling apart.

## The Perfect Balance

A traditional bánh mì achieves perfect harmony through contrasting elements:

### The Bread
- **Crispy crust** that shatters when you bite
- **Airy interior** that soaks up flavors
- **Light texture** that doesn't overwhelm fillings

### The Spread
- **Pâté** (French influence) adds richness
- **Mayonnaise** provides creaminess
- **Maggi sauce** brings umami depth

### The Protein
- **Thịt nướng** (grilled pork)
- **Chả lụa** (Vietnamese ham)
- **Gà nướng** (grilled chicken)
- **Chả cá** (fish cake)

### The Vegetables
- **Pickled daikon and carrot** (đồ chua) for crunch and acidity
- **Fresh cucumber** for coolness
- **Cilantro** for freshness
- **Jalapeños** for heat

## Regional Variations

Like many Vietnamese dishes, bánh mì varies by region:

### Northern Style
- More conservative fillings
- Focus on traditional Vietnamese ingredients
- Less sweet pickled vegetables

### Southern Style
- More adventurous combinations
- Sweeter pickled vegetables
- Generous use of fresh herbs
- Creative fusion fillings

## The Art of Assembly

Making a great bánh mì is an art form:

1. **Warm the bread** slightly to crisp the crust
2. **Hollow out some interior** to make room for fillings
3. **Spread condiments evenly** but not too thick
4. **Layer proteins** for even distribution
5. **Add vegetables** for texture contrast
6. **Finish with herbs** for freshness

## Street Food Culture

Bánh mì represents Vietnamese street food culture at its finest:

- **Quick and portable** - perfect for busy city life
- **Affordable luxury** - gourmet flavors at street prices
- **Social eating** - often enjoyed standing with friends
- **Morning tradition** - popular breakfast choice

## The Global Journey

Vietnamese immigrants brought bánh mì worldwide, adapting it to local tastes while maintaining its essence. Today, you'll find:

- **Bánh mì burgers** in fusion restaurants
- **Vegetarian versions** with tofu and mock meats
- **Breakfast bánh mì** with eggs and bacon
- **Dessert bánh mì** with sweet fillings

## Making Bánh Mì at Home

### Tips for Success:
- **Source good bread** - find a Vietnamese bakery if possible
- **Make pickled vegetables ahead** - they improve with time
- **Prep all ingredients** before assembly
- **Serve immediately** for best texture

### The Secret Ingredient
The secret to great bánh mì isn't any single ingredient – it's the balance. Each element should complement, not overpower, the others.

## Cultural Significance

Bánh mì represents Vietnamese adaptability and creativity. It shows how Vietnamese people took foreign influences and made them their own, creating something better than the sum of its parts.

The sandwich also represents Vietnamese street food culture – democratic, accessible, and delicious. Rich or poor, everyone can enjoy a good bánh mì.

## Conclusion

The bánh mì is more than a sandwich – it's a symbol of Vietnamese ingenuity and cultural fusion. Every bite tells the story of a people who took the best from different cultures and created something uniquely their own.

Next time you bite into a bánh mì, remember you're tasting history, culture, and the endless creativity of Vietnamese cuisine.`,
    author: "Đăng Nguyễn",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-20T14:30:00Z",
    readTime: 6,
    category: "Street Food",
    tags: ["banh mi", "street food", "fusion", "history", "sandwich"],
    imageUrl: "/images/Stories/Beef-Pho_6.png",
    featured: true,
    views: 980,
    likes: 67,
  },
  {
    id: "3",
    title: "Essential Vietnamese Herbs: Your Guide to Authentic Flavors",
    slug: "essential-vietnamese-herbs-guide",
    excerpt:
      "Master the art of Vietnamese cooking by understanding the essential herbs that give Vietnamese cuisine its distinctive fresh, aromatic character.",
    content: `# Essential Vietnamese Herbs: Your Guide to Authentic Flavors

Vietnamese cuisine is renowned for its fresh, vibrant flavors, and much of this character comes from the abundant use of fresh herbs. Understanding these herbs is key to creating authentic Vietnamese dishes at home.

## The Philosophy of Fresh Herbs

In Vietnamese cooking, fresh herbs aren't just garnishes – they're integral ingredients that:

- **Balance flavors** - cooling herbs offset rich, warm dishes
- **Add texture** - providing fresh crunch against soft foods
- **Enhance nutrition** - packed with vitamins and antioxidants
- **Cleanse the palate** - preparing for the next bite

## Essential Vietnamese Herbs

### 1. Cilantro (Ngò Rí)
**Flavor Profile:** Fresh, citrusy, slightly peppery
**Uses:** Universal garnish, in salads, spring rolls
**Growing Tips:** Prefers cool weather, bolt-resistant varieties work best

### 2. Vietnamese Mint (Rau Răm)
**Flavor Profile:** Spicy, peppery, with hints of cilantro
**Uses:** Pho garnish, fresh spring rolls, salads
**Note:** Not actually mint, but Persicaria odorata

### 3. Thai Basil (Húng Quế)
**Flavor Profile:** Sweet basil with anise notes
**Uses:** Pho, stir-fries, curry dishes
**Identification:** Purple stems, serrated leaves

### 4. Fish Mint (Diếp Cá)
**Flavor Profile:** Strong, fishy, acquired taste
**Uses:** Traditional medicine, specific regional dishes
**Note:** Very pungent, use sparingly

### 5. Rice Paddy Herb (Ngò Om)
**Flavor Profile:** Cumin-like, earthy
**Uses:** Fish dishes, sour soups
**Growing:** Aquatic plant, needs constant moisture

## Herb Combinations

Vietnamese cooks rarely use herbs alone. Common combinations include:

### For Pho:
- Thai basil + cilantro + Vietnamese mint
- Bean sprouts for crunch

### For Fresh Spring Rolls:
- Cilantro + mint + lettuce
- Sometimes perilla or fish mint

### For Grilled Meats:
- Cilantro + Vietnamese mint + lettuce wraps
- Cucumber for cooling effect

## Growing Vietnamese Herbs

### Climate Considerations:
- Most prefer warm, humid conditions
- Some (like cilantro) prefer cooler weather
- Many can be grown indoors with proper light

### Soil Requirements:
- Well-draining, fertile soil
- Regular watering but not waterlogged
- Some (like rice paddy herb) need constant moisture

### Harvesting Tips:
- Pick regularly to encourage growth
- Harvest in morning for best flavor
- Use immediately or store properly

## Storing Fresh Herbs

### Short-term (1-3 days):
- Wrap in damp paper towels
- Store in refrigerator
- Keep in plastic bags with air holes

### Medium-term (up to a week):
- Treat like flowers - stems in water
- Cover leaves with plastic bag
- Refrigerate

### Long-term:
- Freeze in ice cubes with water
- Dry for teas (though flavor changes)
- Make herb oils or pastes

## Substitutions and Alternatives

When Vietnamese herbs aren't available:

### Vietnamese Mint substitutes:
- Regular mint + cilantro
- Spearmint with black pepper

### Thai Basil substitutes:
- Sweet basil + anise seed
- Holy basil (if available)

### Fish Mint substitutes:
- Small amount of fish sauce in other herbs
- Skip entirely (very unique flavor)

## Using Herbs in Cooking

### Fresh Applications:
- Always add at the end of cooking
- Tear rather than cut when possible
- Rinse and dry thoroughly before use

### Cooking Applications:
- Some herbs (like lemongrass) can be cooked
- Most Vietnamese herbs are best fresh
- Dried herbs have different flavor profiles

## Cultural Significance

Herbs in Vietnamese culture represent:

- **Connection to nature** - fresh, seasonal eating
- **Health and wellness** - many have medicinal properties
- **Community** - shared herb platters bring people together
- **Tradition** - passed down through generations

## Seasonal Considerations

### Spring/Summer:
- Peak growing season
- Maximum flavor and availability
- Focus on cooling herbs

### Fall/Winter:
- Preserved herbs become important
- Dried herbs for teas
- Indoor growing becomes necessary

## Health Benefits

Vietnamese herbs offer numerous health benefits:

- **Antioxidants** - fight inflammation
- **Digestive aids** - help process rich foods
- **Antimicrobial** - natural food safety
- **Vitamins** - especially A, C, and K

## Conclusion

Mastering Vietnamese herbs is essential for authentic Vietnamese cooking. Start with the basics – cilantro, Thai basil, and mint – then gradually expand your herb vocabulary.

Remember: Vietnamese herbs aren't just ingredients, they're a philosophy of fresh, balanced eating that connects us to nature and tradition.`,
    author: "Đăng Nguyễn",
    authorAvatar: "placeholder?height=40&width=40",
    publishedAt: "2024-01-25T09:15:00Z",
    readTime: 7,
    category: "Ingredients & Tips",
    tags: ["herbs", "ingredients", "cooking tips", "authentic", "fresh"],
    imageUrl: "/images/Stories/Authentic flavors.png",
    featured: false,
    views: 756,
    likes: 45,
  },
  {
    id: "4",
    title: "The Story of Vietnamese Coffee: From French Legacy to Global Phenomenon",
    slug: "vietnamese-coffee-story-french-legacy",
    excerpt:
      "Discover how Vietnamese coffee culture evolved from French colonial influence into a unique tradition that's now captivating coffee lovers worldwide.",
    content: `# The Story of Vietnamese Coffee: From French Legacy to Global Phenomenon

Vietnamese coffee culture is a fascinating blend of French colonial influence, Vietnamese innovation, and pure deliciousness. Today, Vietnam is the world's second-largest coffee producer, and Vietnamese coffee culture has become a global phenomenon.

## The French Connection

Coffee arrived in Vietnam in the 1850s with French colonists who established plantations in the Central Highlands. The French brought:

- **Arabica varieties** initially
- **European brewing methods**
- **Coffee culture** from French cafés

However, Vietnamese coffee culture quickly evolved beyond its French origins.

## The Vietnamese Innovation

Vietnamese coffee makers made several key innovations:

### The Phin Filter
The iconic Vietnamese coffee filter (phin) was developed as a simple, effective brewing method:
- **Slow drip process** extracts maximum flavor
- **Individual serving size** perfect for personal enjoyment
- **No electricity needed** - ideal for any setting
- **Durable metal construction** lasts for years

### Robusta Beans
Vietnam became famous for robusta coffee beans:
- **Higher caffeine content** than arabica
- **Stronger, more bitter flavor**
- **Better suited** to Vietnamese climate
- **More affordable** than arabica

### Condensed Milk Addition
The use of sweetened condensed milk became signature:
- **Practical solution** - fresh milk spoiled quickly in tropical heat
- **Perfect balance** - sweetness offsets bitter robusta
- **Creamy texture** creates luxurious mouthfeel
- **Cultural preference** - Vietnamese love sweet drinks

## Traditional Preparation

### Cà Phê Sữa Đá (Iced Coffee with Milk)
1. **Place phin** over glass with condensed milk
2. **Add coffee grounds** and level gently
3. **Pour hot water** slowly over grounds
4. **Wait patiently** for slow drip (3-5 minutes)
5. **Stir** coffee and condensed milk
6. **Pour over ice** and enjoy

### Cà Phê Đen (Black Coffee)
Same process without condensed milk - pure, strong coffee experience.

## Coffee Culture in Vietnam

### Café Society
Vietnamese cafés are social institutions:
- **Meeting places** for friends and business
- **Relaxation spots** for reading and thinking
- **People-watching** venues
- **Cultural exchanges** between generations

### Timing and Ritual
Coffee drinking in Vietnam has specific rhythms:
- **Morning coffee** - strong start to the day
- **Afternoon coffee** - social break
- **Evening coffee** - rare, due to caffeine content
- **Slow enjoyment** - never rushed

### Regional Variations
Different regions developed their own styles:

#### Northern Style (Hanoi)
- **Stronger coffee** preference
- **Less sweet** preparations
- **Traditional methods** preserved
- **Sidewalk café culture**

#### Southern Style (Ho Chi Minh City)
- **Sweeter preparations**
- **More ice** used
- **Faster pace** of consumption
- **Modern café innovations**

## Modern Vietnamese Coffee

### Global Expansion
Vietnamese coffee has gone international:
- **Vietnamese restaurants** worldwide serve traditional coffee
- **Specialty coffee shops** feature Vietnamese methods
- **Home brewing** kits available globally
- **Social media** spreading Vietnamese coffee culture

### Contemporary Innovations
Modern Vietnamese coffee includes:
- **Egg coffee** (cà phê trứng) - Hanoi specialty
- **Coconut coffee** - tropical twist
- **Salt coffee** - unique Hue creation
- **Yogurt coffee** - modern fusion

### Third Wave Coffee Movement
Vietnam is embracing specialty coffee:
- **Single-origin** Vietnamese arabica
- **Artisanal roasting** techniques
- **Café quality** improvements
- **Barista training** programs

## The Economics of Vietnamese Coffee

### Production Scale
Vietnam's coffee industry is massive:
- **2.7 million tons** annually
- **Second largest producer** globally
- **600,000 farming families** involved
- **Major export earner** for the country

### Challenges and Opportunities
The industry faces modern challenges:
- **Climate change** affecting growing regions
- **Price volatility** in global markets
- **Quality vs. quantity** balance
- **Sustainable farming** practices

## Health and Culture

### Social Aspects
Coffee in Vietnamese culture represents:
- **Hospitality** - offering coffee to guests
- **Friendship** - sharing coffee time
- **Contemplation** - quiet moments
- **Connection** - bridging generations

### Health Considerations
Vietnamese coffee consumption patterns:
- **Moderation** - typically 1-2 cups daily
- **Timing** - mostly morning and afternoon
- **Balance** - offset with plenty of water
- **Tradition** - part of healthy lifestyle

## Making Vietnamese Coffee at Home

### Equipment Needed
- **Vietnamese phin filter**
- **Sweetened condensed milk**
- **Vietnamese coffee grounds** (or dark roast)
- **Hot water** (not boiling)
- **Patience**

### Pro Tips
- **Use medium-coarse grind**
- **Don't pack grounds too tight**
- **Water temperature** around 200°F
- **Let it drip slowly** - rushing ruins the coffee
- **Experiment** with milk ratios

## The Future of Vietnamese Coffee

### Trends to Watch
- **Specialty coffee** growth
- **Sustainable farming** practices
- **Technology integration** in cafés
- **Global brand development**
- **Cultural preservation** efforts

### Cultural Impact
Vietnamese coffee continues to influence:
- **Global coffee culture**
- **Slow food movement**
- **Mindful consumption** practices
- **Cultural exchange** through food

## Conclusion

Vietnamese coffee is more than a beverage – it's a cultural institution that reflects Vietnamese values of patience, community, and innovation. From its French colonial origins to its current global popularity, Vietnamese coffee tells the story of a culture that takes the best from outside influences and makes them uniquely their own.

Whether you're sipping cà phê sữa đá on a Saigon sidewalk or brewing Vietnamese coffee at home, you're participating in a rich cultural tradition that connects you to millions of coffee lovers across Vietnam and around the world.`,
    author: "Đăng Nguyễn",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-30T11:45:00Z",
    readTime: 9,
    category: "Culture & History",
    tags: ["coffee", "culture", "history", "tradition", "vietnamese drinks"],
    imageUrl: "/images/Stories/French Legacy.png",
    featured: false,
    views: 1100,
    likes: 78,
  },
]

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([])

  const categories = [
    "All",
    "Culture & History",
    "Street Food",
    "Ingredients & Tips",
    "Cooking Techniques",
    "Regional Cuisine",
    "Modern Vietnamese",
  ]

  useEffect(() => {
    // Load posts from localStorage or use mock data
    const savedPosts = localStorage.getItem("blogPosts")
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    } else {
      setPosts(mockPosts)
      localStorage.setItem("blogPosts", JSON.stringify(mockPosts))
    }
  }, [])

  const savePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts)
    localStorage.setItem("blogPosts", JSON.stringify(newPosts))
  }

  const addPost = (postData: Omit<BlogPost, "id" | "publishedAt" | "views" | "likes">) => {
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
    }
    const updatedPosts = [newPost, ...posts]
    savePosts(updatedPosts)
  }

  const updatePost = (id: string, updates: Partial<BlogPost>) => {
    const updatedPosts = posts.map((post) => (post.id === id ? { ...post, ...updates } : post))
    savePosts(updatedPosts)
  }

  const deletePost = (id: string) => {
    const updatedPosts = posts.filter((post) => post.id !== id)
    savePosts(updatedPosts)
  }

  const getPostBySlug = (slug: string): BlogPost | undefined => {
    return posts.find((post) => post.slug === slug)
  }

  const getPostsByCategory = (category: string): BlogPost[] => {
    if (category === "All") return posts
    return posts.filter((post) => post.category === category)
  }

  const getFeaturedPosts = (): BlogPost[] => {
    return posts.filter((post) => post.featured).slice(0, 3)
  }

  const likePost = (id: string) => {
    updatePost(id, { likes: (posts.find((p) => p.id === id)?.likes || 0) + 1 })
  }

  const incrementViews = (id: string) => {
    updatePost(id, { views: (posts.find((p) => p.id === id)?.views || 0) + 1 })
  }

  return (
    <BlogContext.Provider
      value={{
        posts,
        categories,
        addPost,
        updatePost,
        deletePost,
        getPostBySlug,
        getPostsByCategory,
        getFeaturedPosts,
        likePost,
        incrementViews,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider")
  }
  return context
}
