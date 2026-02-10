# Portfolio CMS - Next.js with MongoDB Admin Panel

A modern, production-ready portfolio website built with Next.js 14 App Router, MongoDB, and a full-featured Admin Panel. Converted from the original React.js portfolio while maintaining the exact same UI, design, animations, and user experience.

## 🚀 Features

### Public Portfolio
- **Hero Section** - Animated typewriter effect, floating orbs, tech badges
- **About Section** - Education, experience, coursework, and strengths
- **Projects Section** - Filterable project grid with detailed modal views
- **Skills Section** - Categorized skills with proficiency levels
- **Certificates Section** - Color-coded certificate cards with verification links
- **Contact Section** - Social links, email, and resume download

### Admin Panel
- **Secure Authentication** - NextAuth.js v5 with JWT sessions
- **Dashboard** - Overview stats and quick actions
- **Projects Management** - Full CRUD with image uploads
- **Skills Management** - Categories with individual skill levels
- **Certificates Management** - Platform, dates, and credentials
- **Experience Management** - Work history with achievements
- **Profile Management** - Personal info, education, and stats

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB + Mongoose 8
- **Authentication**: NextAuth.js v5 (beta)
- **File Storage**: Cloudinary
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI + shadcn/ui patterns
- **Icons**: Lucide React
- **Language**: TypeScript

## 📁 Project Structure

```
portfolio-nextjs/
├── app/
│   ├── admin/
│   │   ├── (dashboard)/
│   │   │   ├── certificates/
│   │   │   ├── experience/
│   │   │   ├── profile/
│   │   │   ├── projects/
│   │   │   ├── skills/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── login/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   ├── certificates/
│   │   ├── experience/
│   │   ├── profile/
│   │   ├── projects/
│   │   ├── skills/
│   │   └── upload/
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── admin/
│   │   ├── AdminHeader.tsx
│   │   ├── AdminSidebar.tsx
│   │   └── DeleteButton.tsx
│   ├── portfolio/
│   │   ├── AboutSection.tsx
│   │   ├── CertificatesSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navigation.tsx
│   │   ├── ProjectDetailModal.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   └── ThreeBackground.tsx
│   └── ui/
│       ├── alert-dialog.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── scroll-area.tsx
│       ├── textarea.tsx
│       ├── toaster.tsx
│       └── use-toast.ts
├── lib/
│   ├── auth.ts
│   ├── cloudinary.ts
│   ├── mongodb.ts
│   └── utils.ts
├── models/
│   ├── Certificate.ts
│   ├── Experience.ts
│   ├── Profile.ts
│   ├── Project.ts
│   ├── SkillCategory.ts
│   └── User.ts
├── scripts/
│   └── seed.ts
├── middleware.ts
├── .env.local.example
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd portfolio-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   ```env
   MONGODB_URI=mongodb+srv://...
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```
   This creates an admin user and sample data.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**
   - Portfolio: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

### Default Admin Credentials
- Email: `admin@jamshedali.dev`
- Password: `admin123`

## 🔒 Authentication

The admin panel is protected with NextAuth.js v5. The middleware protects all `/admin/*` routes except `/admin/login`.

To create a new admin user, you can:
1. Modify the seed script
2. Use MongoDB Compass to add a user directly (remember to hash the password with bcryptjs)

## 📦 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- Self-hosted with PM2/Docker

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme. The current theme uses warm amber/orange colors.

### Fonts
Edit `app/layout.tsx` to change the font. Currently using Inter from Google Fonts.

### Content
Use the Admin Panel to update all content, or modify the seed script to change initial data.

## 📝 API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET/PUT | `/api/profile` | Get/update profile |
| GET/POST | `/api/projects` | List/create projects |
| GET/PUT/DELETE | `/api/projects/[id]` | Single project operations |
| GET/POST | `/api/skills` | List/create skill categories |
| GET/PUT/DELETE | `/api/skills/[id]` | Single category operations |
| GET/POST | `/api/certificates` | List/create certificates |
| GET/PUT/DELETE | `/api/certificates/[id]` | Single certificate operations |
| GET/POST | `/api/experience` | List/create experience |
| GET/PUT/DELETE | `/api/experience/[id]` | Single experience operations |
| POST | `/api/upload` | Upload file to Cloudinary |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for your own portfolio!

---

Built with ❤️ by Jamshed Ali
