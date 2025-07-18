﻿# Teka_Recipe_Website
# 🍽️ Teka Recipe Website

A modern, responsive **Recipe Sharing Web App** built with ReactJS. This single-page application allows users to **create, browse, edit, rate, favorite, and plan recipes**, using `localStorage` as a mock backend. All data (recipes, users, comments, preferences) is saved persistently in the browser.

---

## ✨ Features

- 🔐 **Mock Authentication** (Login & Register with localStorage)
- 📋 **Create, Edit, and Delete Recipes**
- 🔍 **Filter, Sort, and Search Recipes**
- ❤️ **Favorite & ⭐ Rate Recipes**
- 💬 **Comment on Recipes**
- 📅 **Drag-and-Drop Meal Planner**
- 🌙 **Light/Dark Mode Toggle**
- 📊 **Nutrition Info Display**
- 📢 **Social Sharing (Copy link, Twitter, Facebook)**
- 👤 **User Profile Management**
- 🤖 **Suggested Recipes Based on Activity**
- 📱 **Mobile-First Responsive Design**

---

## 🧰 Tech Stack

- **ReactJS** (Hooks: `useState`, `useEffect`, `useContext`)
- **CSS Framework**: Tailwind CSS / Bootstrap
- **Routing**: `react-router-dom`
- **Drag-and-Drop**: `react-beautiful-dnd`
- **Icons**: Font Awesome / `react-icons`
- **Data Handling**: Browser `localStorage` (mock backend)

---

## 🗃️ Folder Structure

```
src/
├── components/
│   ├── Auth/
│   ├── Recipes/
│   ├── MealPlanner/
│   ├── Profile/
│   └── Shared/
├── context/
├── utils/
│   └── localStorageHelpers.js
├── App.jsx
└── index.js
```

---

## 🛠️ How to Run

1. **Clone the Repo**

```bash
git clone https://github.com/Tekaismyname/Teka_Recipe_Website.git
cd Teka_Recipe_Website
```

2. **Install Dependencies**

```bash
npm install
```

3. **Start the App**

```bash
npm start
```

4. Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Sample Users for Testing

You can register a new user or use this mock account:

- **Email**: `test@example.com`
- **Password**: `12345678`

> All user data is saved in `localStorage` under `users`, `currentUser`, etc.

---

## 📦 Data Storage (Mock)

All app data is stored in `localStorage` under the following keys:

- `users`: List of registered users
- `recipes`: Array of all recipe objects
- `favorites`: Recipe IDs favorited by the current user
- `ratings`: User ratings for recipes
- `mealPlans`: Weekly meal planning data
- `comments`: Comments per recipe
- `theme`: Light/Dark mode preference
- `currentUser`: Logged-in user data

---

## 💡 Project Highlights

- ✅ Local-first development, no server required
- 🧠 Component-based React architecture
- 🎯 Fully functioning SPA with persistent state
- 💻 Smooth UX for desktop and mobile devices

---

## 🚧 Future Improvements

- [ ] Replace localStorage with real backend (`json-server` or Firebase)
- [ ] Add image upload for profile and recipes
- [ ] OAuth authentication (e.g., Google login)
- [ ] Improved accessibility & ARIA roles

---

## 🧑‍💻 Team Roles

- **React Developer** – Component structure, state management, routing
- **UI/UX Designer** – Responsive styling, layout, theme toggle
- **JavaScript Logic** – Drag & drop, filtering, localStorage APIs

---

## 📄 License

This project is part of the **Front-End Web Development** course and intended for educational use only.

---

## 🔗 Live Demo (Optional)

[Deployed Version]([https://your-vercel-url.vercel.app](https://cooking-recipe-tekaauthor.vercel.app)) 

---

## 📬 Feedback

Feel free to open issues or submit pull requests!
