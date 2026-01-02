# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UMN Pray is a Next.js website for listing prayer spaces at the University of Minnesota. The site uses Sanity CMS as a headless content management system, allowing non-technical editors to manage prayer space listings through a web interface.

**Key Technologies:**
- Next.js 15 (App Router)
- React 19
- Sanity CMS (hosted headless CMS)
- Tailwind CSS with custom color palette
- TypeScript
- Inter font family (Google Fonts)

## Development Commands

```bash
# Start development server (runs both Next.js and Sanity Studio)
npm run dev

# Access points:
# - Main site: http://localhost:3000
# - Sanity Studio: http://localhost:3000/studio

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Data Flow

1. **Content Creation**: Editors use Sanity Studio (at `/studio` route) to create/edit prayer spaces
2. **Data Storage**: All content stored in Sanity's hosted cloud database
3. **Data Fetching**: Next.js pages fetch data from Sanity using GROQ queries via the Sanity client
4. **Rendering**: Pages are server-rendered with the fetched data

### Key Directories

- **`app/`**: Next.js App Router pages
  - `page.tsx`: Home page - lists all prayer spaces
  - `space/[slug]/page.tsx`: Dynamic detail page for individual prayer spaces
  - `studio/[[...tool]]/page.tsx`: Embedded Sanity Studio admin interface
  - `layout.tsx`: Root layout with header/footer

- **`sanity/`**: Sanity CMS configuration
  - `client.ts`: Sanity client configuration for fetching data
  - `config.ts`: Sanity Studio configuration (project ID, dataset, plugins)
  - `schemas/prayerSpace.ts`: Content schema defining the structure of prayer space documents

- **`lib/`**: Shared utilities
  - `queries.ts`: GROQ query functions for fetching prayer spaces
  - `types.ts`: TypeScript interfaces matching the Sanity schema
  - `sanity-image.ts`: Helper for generating Sanity image URLs

- **`components/`**: React components
  - `PrayerSpaceCard.tsx`: Card component for listing view on home page

### Sanity Schema & Type Synchronization

The prayer space data structure is defined in three places that must stay synchronized:

1. **Sanity Schema** (`sanity/schemas/prayerSpace.ts`): Defines the CMS structure
2. **TypeScript Types** (`lib/types.ts`): Defines the TypeScript interface
3. **GROQ Queries** (`lib/queries.ts`): Specifies which fields to fetch

**When adding a new field:**
1. Add field definition to `sanity/schemas/prayerSpace.ts`
2. Add property to `PrayerSpace` interface in `lib/types.ts`
3. Add field to GROQ queries in `lib/queries.ts`
4. Update components that display the data (e.g., `components/PrayerSpaceCard.tsx`, `app/space/[slug]/page.tsx`)

### Environment Variables

Required environment variables (set in `.env.local`):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Dataset name (typically "production")

These values are also hardcoded in `sanity/config.ts` for the Studio configuration.

### Styling

The project uses Tailwind CSS with a custom color palette defined in `tailwind.config.ts`:
- `umn-green`: #737852
- `umn-maroon`: #451616
- `umn-gray`: #818376
- `umn-light-gray`: #E0E0DF
- `umn-beige`: #CBC5AF
- `umn-brown`: #8C8274

**Typography:** The entire site uses the Inter font family (weights 400, 500, 600, 700) loaded from Google Fonts.

**Amenity Tag Colors:** Each amenity type has a fixed color mapping in `PrayerSpaceCard.tsx`:
- Prayer Rugs → maroon
- Wudu Access → beige
- Clean → green
- Divider → brown
- Quiet → gray
- Private → light gray

## Important Patterns

### Fetching Data from Sanity

All data fetching uses the helper functions in `lib/queries.ts`:

```typescript
import { getAllPrayerSpaces, getPrayerSpaceBySlug } from '@/lib/queries'

// In a server component:
const spaces = await getAllPrayerSpaces()
const space = await getPrayerSpaceBySlug('example-slug')
```

### Image Handling

Sanity images are stored as references and need to be converted to URLs:

```typescript
import { urlFor } from '@/lib/sanity-image'

// Convert image reference to URL:
const imageUrl = urlFor(photo).url()
```

### Rich Text Rendering

Descriptions use Sanity's Portable Text format. Render with:

```typescript
import { PortableText } from '@portabletext/react'

<PortableText value={space.description} />
```

## Project Constraints

This project is intentionally kept simple for long-term maintainability:

- No complex state management - relies on server-side data fetching
- No authentication system - Sanity Studio handles auth
- Minimal dependencies to reduce maintenance burden
- No custom API routes - data comes directly from Sanity

## Deployment

The project is designed for deployment on Vercel:
- Environment variables must be set in Vercel dashboard
- Automatic deployments on git push
- No special build configuration needed
