# Personal Portfolio - Next.js 15

A modern, fully responsive portfolio website built with **Next.js 15**, **MongoDB**, **Tailwind CSS**, and **Framer Motion**. Features a full-featured Admin Panel for content management and a stunning dark theme with stone/amber accents.

## Features

### Public Portfolio
- **Hero Section** - Animated counters, profile ring, responsive CTA buttons
- **About Section** - Gradient stat cards, education and experience timeline
- **Projects Section** - Filterable project grid (ML and Web Dev) with detail modals
- **Skills Section** - Icon-based skill chips organized by category
- **Certificates Section** - Color-coded cards with verification links
- **Contact Section** - Social links, email, and resume download

### Admin Panel
- **Secure Auth** - NextAuth.js v5 with JWT sessions
- **Dashboard** - Overview stats and quick actions
- **CRUD Management** - Projects, Skills, Certificates, Experience, Profile
- **Image Uploads** - Cloudinary integration

### Design
- **Fully Responsive** - Custom breakpoints from xs (475px) to 2xl
- **Dark Theme** - Stone/amber color palette with smooth animations
- **Framer Motion** - Page transitions, hover effects, layout animations

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose 8
- **Auth**: NextAuth.js v5
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **File Storage**: Cloudinary
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account

### Installation

```bash
git clone https://github.com/Jamshed-Ali-23/Personal-Portfolio-in-Next-js.git
cd Personal-Portfolio-in-Next-js
npm install
cp .env.local.example .env.local
npm run seed
npm run dev
```

## Author

**Jamshed Ali** - [@Jamshed-Ali-23](https://github.com/Jamshed-Ali-23)
