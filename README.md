# TaskFlow — Task Management Dashboard

A modern, responsive Task Management Dashboard built with React 19, Tailwind CSS, and daisyUI. Features a secure JWT-based authentication system, real-time data from a REST API, interactive charts, and smooth animations.

![TaskFlow Dashboard](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![daisyUI](https://img.shields.io/badge/daisyUI-5-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login with token stored in localStorage, auto-expiry after 24 hours
- 🛡️ **Protected Routes** — Dashboard inaccessible without valid login session
- 📊 **Interactive Charts** — Line Chart, Bar Chart, and Donut/Pie Chart powered by Recharts
- 🃏 **Stats Cards** — Live overview of Total Users, Active Users, Revenue, and Growth Rate
- 📋 **Data Tables** — Users table with status badges, Products table with animated progress bars
- 🌙 **Dark / Light Mode** — One-click theme toggle with smooth icon animation
- 📱 **Fully Responsive** — Mobile drawer sidebar, tablet and desktop layouts
- ✨ **Framer Motion Animations** — Page transitions, stagger effects, hover interactions
- 🔄 **Refresh Button** — Re-fetch all dashboard data on demand
- ⌨️ **Keyboard Support** — ESC key closes mobile sidebar
- 🔍 **Animated Search Bar** — Expands and collapses with smooth animation
- 🟢 **Online Status Indicator** — Live green dot on user profile in sidebar

---

## 🛠️ Tech Stack

| Technology           | Version | Purpose                     |
| -------------------- | ------- | --------------------------- |
| React                | 19      | UI Framework                |
| Vite                 | 6       | Build Tool                  |
| React Router DOM     | 6       | Client-side Routing         |
| Tailwind CSS         | 4       | Utility-first Styling       |
| daisyUI              | 5       | UI Component Library        |
| Framer Motion        | 11      | Animations & Transitions    |
| Axios                | 1       | HTTP Client & API calls     |
| Recharts             | 2       | Charts & Data Visualization |
| Lucide React         | 0.4     | Icon Library                |
| Inter (Google Fonts) | —       | Typography                  |

---

## 📁 Project Structure

```
TaskFlow-Dashboard/
├── public/
├── src/
│   ├── api/
│   │   └── axiosInstance.js        # Axios instance with base URL & JWT interceptor
│   ├── components/
│   │   ├── DashboardLayout.jsx     # Sidebar + Navbar wrapper layout
│   │   ├── Navbar.jsx              # Top navbar with search, theme toggle, avatar
│   │   ├── ProtectedRoute.jsx      # Route guard for authenticated pages
│   │   └── Sidebar.jsx             # Left navigation sidebar with active states
│   ├── context/
│   │   └── AuthContext.jsx         # Global auth state, login/logout, token persistence
│   ├── pages/
│   │   ├── DashboardPage.jsx       # Main dashboard — stats, charts, tables
│   │   ├── LoginPage.jsx           # Login form with validation & animation
│   │   ├── UsersPage.jsx           # Users section placeholder
│   │   ├── ProductsPage.jsx        # Products section placeholder
│   │   ├── AnalyticsPage.jsx       # Analytics section placeholder
│   │   └── SettingsPage.jsx        # Settings section placeholder
│   ├── App.jsx                     # Root component with all routes
│   ├── main.jsx                    # React DOM entry point
│   └── index.css                   # Tailwind + daisyUI + Google Fonts + custom styles
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) — v18 or higher
- npm — v9 or higher

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Sahidulislam05/TaskFlow-Dashboard
cd TaskFlow-Dashboard
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

**4. Open in browser**

```
http://localhost:5173
```

---

## 🔑 Demo Credentials

Use the following credentials to log in:

| Field    | Value               |
| -------- | ------------------- |
| Email    | `user1@example.com` |
| Password | `password123`       |

---

## 🌐 API Reference

Base URL: `https://task-api-eight-flax.vercel.app`

| Endpoint            | Method | Description                                |
| ------------------- | ------ | ------------------------------------------ |
| `/api/login`        | POST   | Authenticate user, returns JWT token       |
| `/api/dashboard`    | GET    | Fetch all dashboard data in one call       |
| `/api/overview`     | GET    | Total users, active users, revenue, growth |
| `/api/users`        | GET    | List of all users with status              |
| `/api/users/:id`    | GET    | Single user details                        |
| `/api/analytics`    | GET    | Daily views, clicks, conversions           |
| `/api/products`     | GET    | Products/plans with price and sales data   |
| `/api/products/:id` | GET    | Single product details                     |

### Login Request Example

```json
POST /api/login
{
  "email": "user1@example.com",
  "password": "password123"
}
```

### Login Response Example

```json
{
  "id": 1,
  "email": "user1@example.com",
  "token": "<jwt_token>"
}
```

---

## 📸 Pages Overview

### 🔐 Login Page

- Split layout — branding panel (left) + login form (right)
- Mock dashboard preview card on the left panel
- Animated form fields with email/password validation
- Show/hide password toggle
- Error alert for invalid credentials
- Stagger entrance animations via Framer Motion
- Fully responsive — single column on mobile

### 📊 Dashboard Page

- **Stats Cards** — Total Users, Active Users, Revenue, Growth with percentage badges
- **Line Chart** — Views, Clicks, Conversions over time
- **Donut/Pie Chart** — Sales distribution by product plan
- **Bar Chart** — Daily views vs clicks comparison
- **Users Table** — Avatar, name, email, join date, active/inactive badge
- **Products Table** — Icon, name, category, price, animated sales progress bar
- **Analytics Summary** — Quick totals for views, clicks, conversions, sales
- Skeleton loaders during data fetch
- Refresh button to re-fetch all data

---

## 🔒 Authentication Flow

```
User visits /dashboard
        ↓
ProtectedRoute checks localStorage token
        ↓
Token found & not expired (< 24hrs)?
   ↓ YES                    ↓ NO
Show Dashboard         Redirect to /login
                              ↓
                     User submits credentials
                              ↓
                     POST /api/login
                              ↓
                     Token saved to localStorage
                              ↓
                     Redirect to /dashboard
```

---

## 📱 Responsive Breakpoints

| Breakpoint          | Layout                                             |
| ------------------- | -------------------------------------------------- |
| Mobile (< 640px)    | Single column, hamburger menu, drawer sidebar      |
| Tablet (640–1023px) | 2-column stats grid, drawer sidebar                |
| Desktop (≥ 1024px)  | 4-column stats grid, static sidebar always visible |

---

## 🎨 Theme & Design

- **Primary Color:** Indigo/Purple gradient (`#667eea` → `#764ba2`)
- **Font:** Inter (Google Fonts) — weights 300–800
- **Border Radius:** Rounded cards (`rounded-3xl`), inputs (`rounded-2xl`)
- **Dark Mode:** Full daisyUI dark theme support via `data-theme` attribute
- **Shadows:** Subtle card shadows with colored glow on stat cards

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder. Preview the production build:

```bash
npm run preview
```

---

## 📝 License

This project was developed as part of a Frontend Intern assignment.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@Sahidulislam05](https://github.com/Sahidulislam05)
- Email: sahidulislamcst@gmail.com

---
