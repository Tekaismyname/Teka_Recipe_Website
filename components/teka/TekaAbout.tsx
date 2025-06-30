"use client"

import TekaFooter from "./TekaFooter"

export default function TekaAbout() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/vietnamese-food-top-banner.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">HEALTHY COOKING RECIPES AND THE RIGHT NUTRITION</h1>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed">
            <p className="text-xl mb-8">
              Hello! My name is Đăng, and I'm honored to present to you our culinary project – Teka. This platform was
              born out of my deep passion for Vietnamese cuisine and the desire to preserve and share the flavors that
              define our culture, history, and family traditions. Whether you grew up with the scent of simmering broth
              in your grandmother's kitchen or are just beginning your journey into Vietnamese food, Teka is here to
              guide and inspire you.
            </p>

            <p className="text-xl mb-8">
              At Teka, we believe that food is more than nourishment – it's a bridge that connects generations, tells
              stories, and brings people together. That's why I've worked to collect and develop a wide variety of
              recipes that reflect the heart of Vietnam. From well- loved street foods like bánh mì and phở, to
              homestyle meals like cá kho tộ and canh chua, each recipe on Teka is carefully written with step-by-step
              instructions, realistic preparation time, portion sizes, and estimated nutrition information.
            </p>

            <p className="text-xl mb-8">
              But Teka is more than just a recipe site. It's a place where you'll also find practical tips for cooking,
              guidance on choosing the best local ingredients, and weekly meal suggestions that reflect seasonal
              availability and balance. I also hope to foster a community here – where everyone, from beginners to
              experienced cooks, can feel welcome to learn, experiment, and celebrate the beauty of Vietnamese food.
            </p>

            <p className="text-xl">
              Whether you're preparing a daily meal for your family, cooking for a celebration, or simply curious about
              Vietnam's diverse culinary regions, Teka is designed to be your trustworthy companion. My wish is that
              through Teka, you'll discover not only delicious dishes but also a deeper appreciation for the stories and
              culture behind every meal. Thank you for joining me on this flavorful journey. I hope Teka becomes a part
              of your kitchen, your table, and your life.
            </p>
          </div>
        </div>
      </section>

      <TekaFooter />
    </div>
  )
}
