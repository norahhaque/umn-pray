# UMN Pray

A simple, maintainable website for listing prayer spaces at the University of Minnesota.

Built with Next.js and Sanity CMS for easy content management by non-technical editors.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **Sanity CMS** (Hosted headless CMS)
- **Tailwind CSS** (Styling)
- **TypeScript**

## Project Structure

```
umn-pray/
├── app/                      # Next.js app directory
│   ├── space/[slug]/        # Individual prayer space detail pages
│   ├── studio/              # Sanity Studio admin interface
│   ├── layout.tsx           # Root layout with header/footer
│   ├── page.tsx             # Home page listing all spaces
│   └── globals.css          # Global styles and Tailwind
├── components/              # React components
│   └── PrayerSpaceCard.tsx  # Card component for listing view
├── lib/                     # Utilities
│   ├── queries.ts           # Sanity data fetching functions
│   ├── types.ts             # TypeScript type definitions
│   └── sanity-image.ts      # Image URL builder
├── sanity/                  # Sanity CMS configuration
│   ├── config.ts            # Studio configuration
│   ├── client.ts            # Sanity client for data fetching
│   └── schemas/             # Content schemas
│       ├── index.ts
│       └── prayerSpace.ts   # Prayer space document schema
└── tailwind.config.ts       # Tailwind with UMN brand colors
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- A free Sanity account (you'll create this in step 2)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity

1. Go to [sanity.io](https://www.sanity.io/) and create a free account
2. Create a new project:
   - Click "Create New Project"
   - Give it a name (e.g., "UMN Pray")
   - Choose a dataset name (use "production")
   - Note your **Project ID** - you'll need this next

### 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Sanity credentials:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

### 4. Run the Development Server

```bash
npm run dev
```

The site will be available at:
- **Main site**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/studio

### 5. Add Prayer Spaces

1. Navigate to http://localhost:3000/studio
2. Log in with your Sanity account
3. Click "Prayer Space" to create a new entry
4. Fill in all the fields:
   - **Name**: Name of the prayer space
   - **Slug**: Click "Generate" to auto-create from the name
   - **Building & Floor**: Location information
   - **Description**: Rich text description
   - **Latitude & Longitude**: Find coordinates using [Google Maps](https://support.google.com/maps/answer/18539) (right-click on location → copy coordinates)
   - **Amenities**: Check applicable boxes
   - **Capacity**: Approximate number of people
   - **Gender/Privacy Details**: Any relevant text explanation
   - **How to Access**: Instructions for finding/entering the space
   - **Photos**: Upload 0-5 photos

5. Click "Publish" to make it live

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Click "New Project" and import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
5. Click "Deploy"

Vercel will automatically build and deploy your site. Every time you push to GitHub, it will redeploy.

### Setting Up Your Domain (umnpray.org)

See the separate section below on domain setup.

## Making Changes

### Editing Content

Non-technical editors can add/edit prayer spaces through the Sanity Studio:
- Local: http://localhost:3000/studio
- Production: https://umnpray.org/studio (after deployment)

### Editing Code

- **Styling**: Modify `tailwind.config.ts` for colors, or component files for layout
- **Schema**: Edit `sanity/schemas/prayerSpace.ts` to add/remove fields
- **Pages**: Modify files in `app/` directory

## Maintenance Notes

### Long-term Stability

This project is intentionally simple to ensure it remains maintainable:

- **No database to manage** - Sanity handles all data storage
- **No backend server** - Next.js handles everything
- **Free hosting** - Vercel's free tier is sufficient for this use case
- **Free CMS** - Sanity's free tier includes 3 users and 100k documents

### Future Editors

If someone new takes over this project:

1. They'll need access to:
   - The GitHub repository
   - The Sanity project (invite them at sanity.io)
   - The Vercel deployment (optional, only if they need to change deployment settings)

2. For content updates only:
   - They only need Sanity Studio access (no code knowledge required)

3. For code changes:
   - Clone the repository
   - Follow the "Getting Started" steps above
   - Make changes and push to GitHub

## Common Tasks

### Adding a New Amenity Checkbox

1. Open `sanity/schemas/prayerSpace.ts`
2. Add a new field following the pattern of existing amenities
3. Update `lib/types.ts` to add the TypeScript type
4. Update `components/PrayerSpaceCard.tsx` to display it in the card
5. Update `app/space/[slug]/page.tsx` to display it on the detail page

### Changing the Color Scheme

1. Open `tailwind.config.ts`
2. Modify the color values in the `extend.colors` section
3. The site will automatically use the new colors

### Getting Help

- **Next.js docs**: https://nextjs.org/docs
- **Sanity docs**: https://www.sanity.io/docs
- **Tailwind docs**: https://tailwindcss.com/docs

---

## Domain Setup: umnpray.org

To set up your custom domain `umnpray.org`, follow these steps:

### 1. Register the Domain

If you don't own `umnpray.org` yet:

1. Go to a domain registrar like:
   - [Namecheap](https://www.namecheap.com)
   - [Google Domains](https://domains.google)
   - [Cloudflare](https://www.cloudflare.com/products/registrar/)

2. Search for `umnpray.org` and purchase it (typically $10-15/year)

### 2. Connect Domain to Vercel

Once your site is deployed to Vercel:

1. Go to your project in the Vercel dashboard
2. Click on "Settings" → "Domains"
3. Enter `umnpray.org` and click "Add"
4. Vercel will provide DNS records you need to add

### 3. Configure DNS

Go back to your domain registrar and add the DNS records Vercel provided:

**For Namecheap, Cloudflare, or most registrars:**

Add these records (Vercel will give you the exact values):

- **A Record**: Points to Vercel's IP address
  - Type: `A`
  - Host: `@`
  - Value: `76.76.21.21` (Vercel's IP)

- **CNAME Record**: For www subdomain
  - Type: `CNAME`
  - Host: `www`
  - Value: `cname.vercel-dns.com`

### 4. Wait for DNS Propagation

- DNS changes can take 1-48 hours to propagate
- You can check status at: https://dnschecker.org
- Vercel will automatically provision an SSL certificate once DNS is configured

### 5. Set as Primary Domain (Optional)

In Vercel:
1. Go to "Settings" → "Domains"
2. Click the three dots next to `umnpray.org`
3. Select "Set as Primary Domain"
4. All other domains (like your-project.vercel.app) will redirect to umnpray.org

### Troubleshooting Domain Issues

- **DNS not updating**: Clear your browser cache or try incognito mode
- **SSL certificate issues**: Wait 24 hours after DNS configuration
- **Still showing Vercel domain**: Make sure you set umnpray.org as primary domain

### Alternative: University IT

If you want the domain to be officially managed by UMN:

1. Contact University IT or your department's IT contact
2. Request that they:
   - Register or transfer `umnpray.org` through UMN's registrar
   - Point DNS to your Vercel deployment
3. Provide them with the DNS records from Vercel

This approach ensures the domain stays with the university long-term.

---

## License

This project is intended for use by the University of Minnesota community.
