# JPM Interactive Showcase Website

A premium, high-end interactive portfolio website built with Next.js, featuring scroll-driven animations, immersive 3D visuals, and bilingual support (English/Thai).

## 🚀 Quick Start

### Development Server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📋 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP (ScrollTrigger) + Framer Motion
- **3D Graphics**: Three.js (React Three Fiber)
- **Internationalization**: next-intl (EN/TH)

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/           # Locale-based pages (EN/TH)
│   │   ├── page.tsx        # Home page
│   │   ├── works/          # Portfolio pages
│   │   └── contact/        # Contact form
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles & theme
├── components/
│   ├── layout/             # Navigation, Footer
│   ├── three/              # Three.js components
│   └── works/              # Work-specific components
├── sections/               # Home page sections
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ServicesSection.tsx
│   ├── WorksSection.tsx
│   └── CTASection.tsx
├── data/
│   └── works.ts            # Portfolio content
├── locales/
│   ├── en.json             # English translations
│   └── th.json             # Thai translations
└── i18n/                   # Internationalization config
```

## 🎨 Customization Guide

### 1. Replace Portfolio Content

Edit `src/data/works.ts` to add your real projects:

```typescript
const works: Work[] = [
  {
    id: "your-project-id",
    slug: "your-project-slug",
    category: "interactive", // OR "motion" OR "graphic"
    featured: true,
    title: {
      en: "Project Title in English",
      th: "ชื่อโปรเจกต์ภาษาไทย"
    },
    description: {
      en: "Project description...",
      th: "คำอธิบายโปรเจกต์..."
    },
    // ... add more fields
  }
];
```

### 2. Update Contact Information

Edit `src/locales/en.json` and `src/locales/th.json`:

```json
{
  "contact": {
    "info": {
      "email": "your-email@domain.com",
      "phone": "+66 XX XXX XXXX"
    }
  }
}
```

### 3. Update Social Media Links

Edit `src/components/layout/Footer.tsx` and `src/app/[locale]/contact/page.tsx` to replace `#` placeholders with your actual social media URLs.

### 4. Add Real Images/Videos

1. Place media files in the `/public` folder
2. Update work items in `src/data/works.ts` with paths:
   ```typescript
   media: {
     type: "image", // or "video"
     url: "/path/to/your-image.jpg"
   }
   ```

### 5. Customize Theme Colors

Edit `src/app/globals.css` to adjust the color palette:

```css
@theme {
  --color-background: #0a0a0a;
  --color-surface: #141414;
  --color-accent-blue: #3b82f6;
  /* ... other colors */
}
```

## 📧 Connect Contact Form

The contact form currently shows a mock success message. To connect it to a backend:

**File**: `src/app/[locale]/contact/page.tsx`

**Replace this**:
```typescript
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to email service
    setSubmitted(true);
};
```

**With your API call**:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Example: Using a serverless function
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    
    if (response.ok) {
        setSubmitted(true);
    }
};
```

### Recommended Services
- **SendGrid**: Email API service
- **Resend**: Modern email API
- **Vercel Functions**: Serverless backend
- **Netlify Forms**: Form handling service

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Vercel auto-detects Next.js configuration
4. Deploy!

#### Or via CLI:
```bash
npm install -g vercel
vercel
```

### Environment Variables

No environment variables required for the base deployment. 

If you add a contact form backend, you may need to add API keys:

```env
# .env.local
SENDGRID_API_KEY=your_key_here
```

## 📱 Features

- ✨ **Immersive Hero** with Three.js particle animation and mouse parallax
- 🎯 **ScrollTrigger Animations** for every section
- 🖼️ **Portfolio System** with category filtering
- 🌐 **Bilingual Support** (EN/TH) with automatic routing
- 📱 **Fully Responsive** design
- ⚡ **Performance Optimized** with dynamic imports and static generation
- 🎨 **Premium Dark Theme** with glassmorphism effects

## 🎭 Animation Philosophy

- **Hero**: Word-by-word staggered reveal (0.12s) with smooth mouse parallax
- **Sections**: Scroll-triggered fade-ins using GSAP ScrollTrigger
- **Cards**: Spring physics hover effects (Framer Motion)
- **Micro-interactions**: Subtle brightness changes, upward title movement

All animations target 60fps and use GPU-accelerated properties (transform, opacity).

## 🔧 Development Tips

### Build Verification
```bash
npm run build
```
Should complete with zero errors. All routes are statically generated.

### Check for Console Errors
Open browser DevTools → Console tab while testing.

### Test Both Languages
- English: `http://localhost:3000/en`
- Thai: `http://localhost:3000/th`

### Lint/Format (if configured)
```bash
npm run lint
```

## 📊 Performance Checklist

- [x] Three.js dynamically imported (client-side only)
- [x] All images should use Next.js `<Image>` component (when you add real images)
- [x] Static generation for all work detail pages
- [x] No layout shifts (CLS = 0)
- [x] Smooth scrolling enabled in globals.css

## 🐛 Troubleshooting

### Build Errors

**TypeScript errors**: Run `npm run build` to see specific type issues.

**Module not found**: Ensure all imports use `@/` alias correctly.

### Animations Not Working

- Ensure GSAP and Framer Motion are installed: `npm install gsap framer-motion`
- Check browser console for JavaScript errors

### Locale Routing Issues

- Middleware is configured in `src/middleware.ts`
- Default locale redirects to `/en`
- Ensure both `en.json` and `th.json` are complete

## 📝 License

This is a custom build for JPM Interactive. Modify as needed for production use.

## 🆘 Support

For questions about the codebase:
1. Check comments in `src/` files for implementation details
2. Review `walkthrough.md` in the artifacts folder for feature documentation
3. See `polish_summary.md` for recent enhancements

---

**Built with** ❤️ **using Next.js, TypeScript, and modern web technologies**
