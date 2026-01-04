# UMN Pray

**A comprehensive directory of prayer and reflection spaces at the University of Minnesota.**

UMN Pray is a web application that helps students, faculty, and staff find accessible prayer spaces across all UMN campuses. The platform provides detailed information about each space including location, amenities, capacity, privacy features, and accessibility instructions.

🌐 **Live Site**: [umnpray.org](https://umnpray.org)

---

## About This Project

### Purpose

UMN Pray was created to address the lack of centralized information about prayer and wellbeing spaces at the University of Minnesota. 

This platform aims to:
- **Centralize information** about all available prayer spaces
- **Provide detailed amenity listings** (prayer rugs, wudu access, privacy features, etc.)
- **Enable easy discovery** through filtering, sorting, and interactive maps
- **Maintain accessibility** with clear directions and access instructions
- **Ensure accuracy** through community-driven updates

### Organizations

UMN Pray is maintained by the **Diversity, Equity, and Inclusion (DEI) Committees** of:
- **Undergraduate Student Government (USG)**
- **CSE Student Board**

This project is a collaborative initiative by student leaders to make campus more inclusive and accessible for all community members who need spaces for prayer and reflection.

**Important Note**: UMN Pray is not officially affiliated with the University of Minnesota. It is an independent student-led initiative.

---

## Features

- **Interactive Map View** - Visualize all prayer spaces with clickable markers
- **Advanced Filtering** - Filter by campus location (East Bank, West Bank, St. Paul)
- **Sort by Distance** - Find spaces nearest to your current location
- **Mobile Responsive** - Fully functional on all devices
- **Photo Galleries** - View images of each space
- **Accessibility Info** - Detailed access instructions for each location
- **Privacy Details** - Information about gender separation and privacy features
- **Google Maps Integration** - Get directions to any space

---

## Tech Stack

- **Next.js 15** (App Router) - React framework for production
- **React 19** - UI library
- **Sanity CMS** - Headless CMS for content management
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type-safe development
- **Google Maps API** - Interactive maps and geocoding
- **Vercel** - Hosting and deployment

---

## Project Structure

```
umn-pray/
├── app/                          # Next.js app directory
│   ├── space/[slug]/            # Individual prayer space detail pages
│   ├── map/                     # Full-page map view
│   ├── privacy/                 # Privacy policy page
│   ├── studio/[[...tool]]/      # Sanity Studio admin interface
│   ├── layout.tsx               # Root layout with header/footer
│   ├── page.tsx                 # Home page with list/map toggle
│   └── globals.css              # Global styles and Tailwind
├── components/                   # React components
│   ├── PrayerSpaceCard.tsx      # Card component for listing view
│   ├── PrayerSpaceList.tsx      # Main list with filters and toggle
│   ├── MapView.tsx              # Interactive Google Maps component
│   ├── MapPageClient.tsx        # Client wrapper for map
│   └── PhotoCarousel.tsx        # Image carousel for detail pages
├── lib/                         # Utilities
│   ├── queries.ts               # Sanity data fetching functions
│   ├── types.ts                 # TypeScript type definitions
│   ├── geocoding.ts             # Location utilities and distance calculations
│   └── sanity-image.ts          # Image URL builder
├── sanity/                      # Sanity CMS configuration
│   ├── config.ts                # Studio configuration
│   ├── client.ts                # Sanity client for data fetching
│   └── schemas/                 # Content schemas
│       ├── index.ts
│       └── prayerSpace.ts       # Prayer space document schema
├── public/                      # Static assets
│   └── images/                  # Logo and hero images
└── tailwind.config.ts           # Tailwind with UMN brand colors
```

---

## For DEI Committee Members: Adding & Editing Prayer Spaces

### Accessing the Admin Panel

1. **Go to the Sanity Studio:**
   - Local development: http://localhost:3000/studio
   - Production: https://umnpray.org/studio

2. **Log in** with your Sanity account credentials
   - If you don't have access, contact the project maintainer to be added to the Sanity project

### Adding a New Prayer Space

1. Click **"Prayer Space"** in the left sidebar
2. Click the **"+ Create"** button (top right)
3. Fill in all required fields:

   **Basic Information:**
   - **Prayer Space Name**: Official or commonly used name (e.g., "AMCC", "Lind Hall Prayer Room")
   - **Slug**: Click "Generate" to auto-create URL-friendly version
   - **Building Name/Abbreviation**: Building code or name (e.g., "CSE", "Coffman Memorial Union")
   - **Room Number**: Room number if available (leave blank if no specific room)

   **Location:**
   - **Campus Location**: Select East Bank, West Bank, or St. Paul
   - **Building Address**: Full address for Google Maps (e.g., "Coffman Memorial Union, 300 Washington Ave SE, Minneapolis, MN 55455")

   **Amenities** (check all that apply):
   - ☑️ Prayer Rugs Available
   - ☑️ Wudu Access
   - ☑️ Divider/Partition Present
   - ☑️ Private from Public View
   - ☑️ Clean and Tidy

   **Additional Details:**
   - **Approximate Capacity**: Number of people who can pray at once
   - **Gender/Privacy Details**: Describe any gender separation, privacy features, or visibility from outside
   - **How to Access**: Step-by-step instructions for finding and entering the space (e.g., "Enter through main entrance, take elevator to 2nd floor, turn left")

   **Photos** (optional):
   - Upload 1-5 photos showing the space
   - Images should be clear and represent the current state of the space

4. Click **"Publish"** to make it live on the website

### Editing an Existing Space

1. In Sanity Studio, click **"Prayer Space"** in the sidebar
2. Find and click on the space you want to edit
3. Make your changes
4. Click **"Publish"** to save

Changes appear on the live site within seconds!

### Tips for Quality Listings

- **Be accurate**: Verify all information before publishing
- **Be descriptive**: Clear access instructions help people find spaces easily
- **Update regularly**: If amenities or access changes, update the listing
- **Include photos**: Visual references are very helpful for first-time visitors
- **Check locations**: Test the address in Google Maps to ensure it's correct

---

## Suggesting Changes or Reporting Issues

### For General Users

If you notice incorrect information, want to suggest a new space, or have feedback:

📧 **Email us:**
- Undergraduate Student Government: [usg@umn.edu](mailto:usg@umn.edu)
- CSE Student Board: [sesb@umn.edu](mailto:sesb@umn.edu)

Or use the **"Report an Issue"** links on individual space pages.

### For Technical Issues

If you encounter bugs or technical problems with the website:
1. Email the DEI committee contacts above with details
2. Include screenshots if possible
3. Describe what you were trying to do when the issue occurred

---

## For Developers: Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- A free Sanity account
- Google Maps API key (for map features)

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/umn-pray.git
cd umn-pray
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key_here
```

**Getting a Google Maps API Key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable these APIs:
   - Maps JavaScript API
   - Geocoding API
4. Create credentials → API Key
5. Restrict the key to your domain in production

### 4. Run Development Server

```bash
npm run dev
```

The site will be available at:
- **Main site**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/studio

### 5. Build for Production

```bash
npm run build
```

## Content Schema

Each prayer space includes the following information:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | Yes | Name of the prayer space |
| `slug` | Slug | Yes | URL-friendly identifier |
| `building` | String | Yes | Building name or abbreviation |
| `room` | String | No | Room number (if applicable) |
| `campusLocation` | Select | Yes | East Bank, West Bank, or St. Paul |
| `address` | String | Yes | Full building address for maps |
| `latitude` | Number | No | Auto-calculated from address |
| `longitude` | Number | No | Auto-calculated from address |
| `hasPrayerRugs` | Boolean | No | Prayer rugs available |
| `hasWuduAccess` | Boolean | No | Wudu/ablution facility nearby |
| `hasDivider` | Boolean | No | Divider or partition present |
| `isPrivateFromPublic` | Boolean | No | Private from public view |
| `isCleanTidy` | Boolean | No | Generally clean and maintained |
| `capacity` | Number | No | Approximate number of people |
| `genderPrivacyDetails` | Text | No | Gender separation and privacy info |
| `accessInstructions` | Text | No | How to find and access the space |
| `photos` | Images | No | Up to 5 photos of the space |

---

## Privacy & Data Handling

### User Location Data

When users click "Sort by Distance":
- Location is requested from the browser's Geolocation API
- Location data is processed **entirely in the browser**
- **Never sent to any server**
- **Never stored or logged**
- Used only for calculating distances to prayer spaces
- Immediately discarded after calculations

Full details: [Privacy Policy](https://umnpray.org/privacy)

### Analytics

The site uses Vercel Analytics and Speed Insights to monitor:
- Page views and performance
- No personal information is collected
- All data is anonymized

---

## Maintenance & Updates

### Regular Maintenance Tasks

**Semesterly:**
- Review and verify accuracy of all listings
- Check for outdated information (spaces that have moved or closed)
- Update photos if spaces have changed

**As Needed:**
- Add newly discovered or initiated prayer spaces
- Remove spaces that are no longer available
- Update access instructions if building layouts change

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Test after updating
npm run build
npm run dev
```

---


## Contact & Support

**Project Maintainers:**
- Undergraduate Student Government (DEI Committee): [usg@umn.edu](mailto:usg@umn.edu)
- CSE Student Board (DEI Committee): [sesb@umn.edu](mailto:sesb@umn.edu)

**For:**
- Content updates and corrections
- Suggestions for new features
- Bug reports
- Questions about prayer spaces
- Collaboration opportunities

Please allow 1-2 business days for a response.

---

## Resources & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Vercel Documentation](https://vercel.com/docs)

---

## License & Usage

This project is intended for use by the University of Minnesota community. The code is open source and can be adapted for similar use cases at other universities.

**If you use this project:**
- Credit the USG and SESB DEI Committees
- Maintain the inclusive spirit of the project
- Share improvements back with the community

---

## Acknowledgments

**Created and maintained by:**
- UMN Undergraduate Student Government DEI Committee
- UMN CSE Student Board DEI Committee

**With support from:**
- Student leaders and volunteers
- Prayer space coordinators across campus
- UMN community members who provided feedback

**Special thanks to:**
- All students who contributed space information
- Building coordinators who facilitated access
- The broader UMN community for support

---

*Last Updated: January 2026*
