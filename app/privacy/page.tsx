import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - UMN Pray",
  description: "Privacy Policy for UMN Pray. Learn how we handle location data and protect your privacy.",
};

/**
 * Privacy Policy Page
 */
export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-umn-maroon mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-umn-maroon mb-2">Privacy Policy</h1>
      <p className="text-xs text-gray-600 mb-8">Last Updated: January 4, 2026</p>

      <div className="prose max-w-none">
        <section className="mb-8">
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            UMN Pray is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our website and services to locate prayer spaces at the University of Minnesota.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-umn-maroon mb-4">Location Data</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            When you use the &ldquo;Sort by Distance&rdquo; feature, we request access to your device&apos;s location only to calculate the distance between your current position and available prayer spaces.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Your location data is:
          </p>
          <ul className="list-disc pl-6 text-sm text-gray-700 mb-4 space-y-2">
            <li>Processed entirely within your web browser</li>
            <li>Used only for distance calculations</li>
            <li>Never stored or retained in any form</li>
            <li>Never shared with third parties</li>
            <li>Immediately discarded after distance calculations are complete</li>
          </ul>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            You have full control over location access and may deny permission at any time through your browser settings. Denying location access will not affect your ability to browse prayer spaces; you simply will not be able to sort them by distance from your location.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-umn-maroon mb-4">Information We Collect</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            UMN Pray does not collect, store, or process any personal information. We do not use cookies, analytics, or tracking technologies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-umn-maroon mb-4">Third-Party Services</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Our website utilizes the following third-party services:
          </p>
          <ul className="list-disc pl-6 text-sm text-gray-700 mb-4 space-y-2">
            <li>
              <span className="text-umn-maroon font-medium">Google Maps API:</span> Used to display interactive maps and calculate geographic distances. Google&apos;s use of location data is governed by their own privacy policy.
            </li>
            <li>
              <span className="text-umn-maroon font-medium">Sanity CMS:</span> Used to manage and deliver prayer space information. No user data is transmitted to Sanity.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-umn-maroon mb-4">Contact Information</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            If you have any questions or concerns about this Privacy Policy, please contact:
          </p>
          <ul className="list-none text-sm text-gray-700 mb-4 space-y-2">
            <li>
              <span className="text-umn-maroon font-medium">Undergraduate Student Government:</span>{" "}
              <a href="mailto:usg@umn.edu" className="text-umn-maroon hover:underline">
                usg@umn.edu
              </a>
            </li>
            <li>
              <span className="text-umn-maroon font-medium">CSE Student Board:</span>{" "}
              <a href="mailto:sesb@umn.edu" className="text-umn-maroon hover:underline">
                sesb@umn.edu
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
