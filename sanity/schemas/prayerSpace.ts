import { defineField, defineType } from "sanity";

/**
 * Prayer Space Schema
 * Defines the structure for each prayer space listing
 */
export default defineType({
  name: "prayerSpace",
  title: "Prayer Space",
  type: "document",
  fields: [
    // Basic Information
    defineField({
      name: "name",
      title: "Prayer Space Name",
      type: "string",
      description: "Name/title of the prayer space (e.g., 'AMCC', 'Lind Space')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Auto-generated URL-friendly version of the name",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "building",
      title: "Building Name/Abbreviation",
      type: "string",
      description: "Name/title of the building (e.g., 'CSE', 'Coffman', 'Lind')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "room",
      title: "Room Number",
      type: "string",
      description: "Room number including floor (e.g., '234', '3-180', 'B12'). Leave blank if no specific room.",
    }),

    // Location
    defineField({
      name: "campusLocation",
      title: "Campus Location",
      type: "string",
      description: "Which campus is this prayer space located in?",
      options: {
        list: [
          { title: "East Bank", value: "East Bank" },
          { title: "West Bank", value: "West Bank" },
          { title: "St. Paul", value: "St. Paul" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Building Address",
      type: "string",
      description: "Full building address for Google Maps (e.g., 'Appleby Hall, 128 Pleasant St SE, Minneapolis, MN 55455')",
      validation: (Rule) => Rule.required(),
    }),
    // Hidden fields - auto-calculated from address
    defineField({
      name: "latitude",
      title: "Latitude",
      type: "number",
      hidden: true,
      description: "Auto-calculated from address for distance calculations",
    }),
    defineField({
      name: "longitude",
      title: "Longitude",
      type: "number",
      hidden: true,
      description: "Auto-calculated from address for distance calculations",
    }),

    // Amenities - Boolean checkboxes
    defineField({
      name: "hasPrayerRugs",
      title: "Prayer Rugs Available",
      type: "boolean",
      description: "Are prayer rugs provided?",
      initialValue: false,
    }),
    defineField({
      name: "hasWuduAccess",
      title: "Wudu Access",
      type: "boolean",
      description: "Is there a wudu/ablution facility nearby?",
      initialValue: false,
    }),
    defineField({
      name: "hasDivider",
      title: "Divider/Partition Present",
      type: "boolean",
      description: "Is there a divider or partition in the space?",
      initialValue: false,
    }),
    defineField({
      name: "isPrivateFromPublic",
      title: "Private from Public View",
      type: "boolean",
      description: "Is the space private from public view?",
      initialValue: false,
    }),
    defineField({
      name: "isCleanTidy",
      title: "Clean and Tidy",
      type: "boolean",
      description: "Is the space generally clean and well-maintained?",
      initialValue: false,
    }),

    // Capacity
    defineField({
      name: "capacity",
      title: "Approximate Capacity",
      type: "number",
      description: "Approximate number of people who can pray at once",
      validation: (Rule) => Rule.min(1),
    }),

    // Additional Text Details
    defineField({
      name: "genderPrivacyDetails",
      title: "Gender/Privacy Details",
      type: "text",
      description: "Describe gender separation (if any) and whether the space is visible from outside.",
      rows: 3,
    }),
    defineField({
      name: "accessInstructions",
      title: "How to Access",
      type: "text",
      description:
        "Instructions on how to get into or find the space (e.g., 'Enter through main entrance, take elevator to 2nd floor')",
      rows: 3,
    }),

    // Photos
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [{ type: "image" }],
      description: "Upload at 1-5 photos of the prayer space",
      options: {
        layout: "grid",
      },
      validation: (Rule) => Rule.max(5),
    }),
  ],

  // Preview configuration for the Sanity Studio list view
  preview: {
    select: {
      title: "name",
      building: "building",
      room: "room",
      media: "photos.0", // Show first photo as thumbnail
    },
    prepare({ title, building, room, media }) {
      return {
        title: title,
        subtitle: room ? `${building} ${room}` : building,
        media: media,
      };
    },
  },
});
