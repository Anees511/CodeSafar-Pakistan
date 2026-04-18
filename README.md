# CodeSafar Pakistan

Helping Pakistani Students Build Tech Careers.

Production-ready blog built with Next.js 14, App Router, TypeScript, Tailwind CSS, and MDX.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- MDX (`next-mdx-remote`)
- Lucide React icons
- Next Metadata API for SEO
- `next-sitemap` for sitemap tooling
- Custom RSS route at `/rss`

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env.local`.

3. Start development server:

```bash
npm run dev
```

4. Open http://localhost:3000.

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run postbuild`: Generate sitemap with `next-sitemap`
- `npm run start`: Start production server
- `npm run lint`: Run lint checks

## Content Workflow

All articles live in `content/blog` as `.mdx` files.

Each post must include this frontmatter:

```md
---
title: "Your Article Title Here"
description: "1-2 sentence description for SEO meta description"
date: "2026-04-09"
lastUpdated: "2026-04-09"
author: "Your Name"
category: "web-development"
tags: ["nodejs", "beginners", "pakistan"]
featured: true
featuredImage: "/images/blog/article-slug.png"
readTime: "8 min read"
---
```

## Categories

Supported category slugs:

- `web-development`
- `freelancing`
- `career-guide`
- `tools-resources`

## SEO Features

- Metadata API on every page
- Canonical URLs
- Open Graph + Twitter cards
- Blog article metadata fields
- JSON-LD `BlogPosting` schema on post pages
- `robots.txt` route at `/robots.txt`
- `sitemap.xml` route at `/sitemap.xml`
- RSS feed route at `/rss`

## Deployment

The project is Vercel-ready.

1. Push repository to GitHub.
2. Import project in Vercel.
3. Add environment variables from `.env.local`.
4. Deploy.

`vercel.json` includes base deployment configuration and security headers.

## Notes

- Newsletter form currently stores submissions in browser localStorage as a temporary implementation.
- Contact form posts to Formspree using `NEXT_PUBLIC_FORMSPREE_ID`.
- GA4 script is enabled when `NEXT_PUBLIC_GA4_ID` is set to a real value.
