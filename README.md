# Special Graphics - World Class Designs

A modern Next.js application for connecting businesses with creative design experts. Features a beautiful, responsive UI with support for multiple deployment platforms.

## 🚀 Features

- **Modern Design**: Beautiful, responsive UI with dark theme hero sections
- **Multiple Pages**: Home, Categories, How It Works, Find Designer, Auth, Inspirations, Submit Files, Winner Form
- **Image Optimization**: Optimized images for fast loading
- **Multi-Platform Support**: Works on localhost, GitHub Pages, and Vercel

## 📋 Pages

- `/` - Home page with hero section and testimonials
- `/categories` - Design categories showcase
- `/how-it-works` - Process explanation
- `/find-designer` - Designer search and profiles
- `/auth` - Authentication (Sign In / Sign Up)
- `/inspirations` - Design inspirations gallery
- `/submit-files` - File submission page
- `/winner-form` - Winner form submission

## 🛠️ Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 🚢 Deployment

This project is configured to work on **three platforms**:

### 1. Localhost (Development)

```bash
npm run dev
```

### 2. Vercel (Recommended for Production)

#### Automatic Deployment

1. **Push your code to GitHub, GitLab, or Bitbucket**

2. **Import your repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click **Add New Project**
   - Import your Git repository
   - Vercel will automatically detect Next.js and configure the build settings

3. **Deploy:**
   - Click **Deploy** and Vercel will build and deploy your application
   - Your app will be live at a `*.vercel.app` URL
   - Every push to your main branch will trigger automatic deployments

#### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Vercel Features

- ✅ **Automatic HTTPS** - SSL certificates are automatically provisioned
- ✅ **Image Optimization** - Next.js Image component is fully optimized
- ✅ **Edge Network** - Global CDN for fast content delivery
- ✅ **Preview Deployments** - Every pull request gets a preview URL
- ✅ **Analytics** - Built-in performance monitoring

### 3. GitHub Pages

#### Automatic Deployment (Recommended)

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically deploy when you push to the `main` branch

2. **Repository Name:**
   - Make sure your repository name is `special-graphics-official`
   - If different, update `basePath` in `next.config.ts`

#### Manual Deployment

```bash
# Build for GitHub Pages
npm run build:github

# The output will be in the 'out' directory
# You can then deploy the 'out' folder to GitHub Pages
```

#### GitHub Pages Configuration

- **Base Path**: `/special-graphics-official` (configured in `next.config.ts`)
- **Build Command**: `npm run build:github`
- **Output Directory**: `out`

## 📦 Build Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for Vercel (default)
- `npm run build:vercel` - Build for Vercel (explicit)
- `npm run build:github` - Build for GitHub Pages
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

- `GITHUB_PAGES=true` - Set when building for GitHub Pages (automatically set by build script)

### Next.js Configuration

The `next.config.ts` automatically detects the deployment target:
- **Vercel**: Uses standard Next.js with image optimization
- **GitHub Pages**: Uses static export with basePath and unoptimized images

## 🎨 Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Fonts**: Geist, Geist Mono, Great Vibes

## 📁 Project Structure

```
special-graphics-master/
├── .github/
│   └── workflows/
│       └── deploy-github-pages.yml
├── public/              # Static assets (images, icons)
├── src/
│   ├── app/            # Next.js app router pages
│   │   ├── auth/
│   │   ├── categories/
│   │   ├── find-designer/
│   │   ├── how-it-works/
│   │   ├── inspirations/
│   │   ├── submit-files/
│   │   ├── winner-form/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/     # React components
│   └── lib/           # Utility functions
├── next.config.ts      # Next.js configuration
├── vercel.json         # Vercel deployment configuration
└── package.json
```

## 🐛 Troubleshooting

### Images Not Loading

- Ensure all images are in the `/public` directory
- Use string paths like `/image.avif` instead of imports
- Check that image paths start with `/`

### GitHub Pages Deployment Issues

- Verify repository name matches `basePath` in `next.config.ts`
- Check GitHub Actions workflow permissions
- Ensure `GITHUB_PAGES=true` is set during build

### Vercel Deployment Issues

- Verify `vercel.json` configuration
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`

## 📝 Notes

- All images use string paths (e.g., `/hero-left.avif`) for compatibility across all platforms
- The project automatically detects the deployment target and configures accordingly
- GitHub Pages uses static export, while Vercel uses standard Next.js features

## 📄 License

This project is private and proprietary.

## 🤝 Support

For issues or questions, please contact the development team.

---

Built with ❤️ using Next.js
