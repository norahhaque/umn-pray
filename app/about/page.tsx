import Link from "next/link";
import Image from "next/image";
import { League_Spartan } from "next/font/google";

const leagueSpartan = League_Spartan({ subsets: ["latin"] });

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h1
            className={`${leagueSpartan.className} font-bold text-umn-maroon mb-4`}
            style={{ fontSize: 'clamp(32px, 8vw, 48px)' }}
          >
            Our Mission
          </h1>

          <div className="max-w-4xl mx-auto">
            <p className="text-base text-gray-700 leading-relaxed">
              The DEI Committees of the Undergraduate Student Government
              and the CSE Student Board oversee the <span className="font-semibold text-umn-maroon">Wellbeing Project</span>,
              an initiative to improve prayer and reflection spaces at the University of Minnesota.
              We are guided by the following three core goals.
            </p>
          </div>
        </div>

        {/* Three Goals - Creative Layout */}

        {/* Goal 1: Quantity */}
        <div className="mb-10">
          <div className="bg-white rounded-3xl p-12 max-w-5xl relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-16 before:h-16 before:border-t-2 before:border-l-2 before:border-umn-maroon before:rounded-tl-3xl after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-16 after:h-16 after:border-b-2 after:border-r-2 after:border-umn-maroon after:rounded-br-3xl">
            <h2 className={`${leagueSpartan.className} text-4xl md:text-5xl font-black text-umn-maroon mb-3 tracking-tight`}>
              QUANTITY
            </h2>
            <p className="text-base text-gray-800 leading-relaxed">
              We aim to increase the number of prayer and reflection spaces available across campus
              so that no student is ever forced to choose between their academic responsibilities
              and their spiritual or mental wellbeing.
            </p>
          </div>
        </div>

        {/* Goal 2: Quality */}
        <div className="mb-10">
          <div className="bg-white rounded-3xl p-12 ml-auto max-w-5xl relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-16 before:h-16 before:border-b-2 before:border-l-2 before:border-umn-green before:rounded-bl-3xl after:content-[''] after:absolute after:top-0 after:right-0 after:w-16 after:h-16 after:border-t-2 after:border-r-2 after:border-umn-green after:rounded-tr-3xl">
            <h2 className={`${leagueSpartan.className} text-4xl md:text-5xl font-black text-umn-green mb-3 tracking-tight text-right`}>
              QUALITY
            </h2>
            <p className="text-base text-gray-800 leading-relaxed text-right">
              A space is only meaningful if it is usable. We advocate for spaces that meet a basic
              standard of care, such as being quiet, private, and equipped with essential amenities
              such as prayer rugs and mats.
            </p>
          </div>
        </div>

        {/* Goal 3: Visibility */}
        <div className="mb-10">
          <div className="bg-white rounded-3xl p-12 max-w-5xl relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-16 before:h-16 before:border-t-2 before:border-l-2 before:border-umn-maroon before:rounded-tl-3xl after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-16 after:h-16 after:border-b-2 after:border-r-2 after:border-umn-maroon after:rounded-br-3xl">
            <h2 className={`${leagueSpartan.className} text-4xl md:text-5xl font-black text-umn-maroon mb-3 tracking-tight`}>
              VISIBILITY
            </h2>
            <p className="text-base text-gray-800 leading-relaxed">
              This is where UMNPray comes in! Visibility is about making sure students actually
              know these spaces exist and can find them easily.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12">
          <hr className="border-t border-umn-green/20 max-w-2xl mx-auto" />
        </div>

        {/* About Us Section */}
        <div className="max-w-5xl mx-auto mt-10 mb-8">
          <h1 className={`${leagueSpartan.className} text-3xl md:text-4xl font-bold text-umn-maroon mb-6 text-center`}>
            About Us
          </h1>

          <div>
            <p className="text-base text-gray-800 leading-relaxed mb-4 text-center">
              The DEI Committees of the Undergraduate Student Government and the CSE Student Board
              exist to uplift student voices and advocate for a campus environment where all students
              are supported.
            </p>

            <p className="text-base text-gray-800 leading-relaxed text-center">
              The Wellbeing Project project grew out of listening, listening to students who struggled
              to find a place to offer their religious ritual, reflect, or decompress and recognizing
              that these challenges aren&apos;t isolated experiences but systemic gaps in the university system.
              By advocating for better spaces and creating tools like this website, we aim to close these
              gaps and ensure students can show up fully as themselves, without having to compromise their
              identities, beliefs, or wellbeing to succeed on our campus.
            </p>
          </div>
        </div>

        {/* Logos */}
        <div className="flex justify-center items-center gap-6 mt-8 mb-16">
          <Link href="https://usgumn.com/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/usg-logo.webp"
              alt="USG Logo"
              width={65}
              height={65}
              className="object-contain hover:opacity-80 transition-opacity cursor-pointer"
            />
          </Link>
          <Link href="https://sesb.umn.edu/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/sesb-logo.png"
              alt="SESB Logo"
              width={52}
              height={52}
              className="object-contain hover:opacity-80 transition-opacity cursor-pointer"
            />
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-umn-maroon text-sm font-medium tracking-wide hover:scale-105 transition-transform duration-200 ease-out inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Prayer Spaces
          </Link>
        </div>
      </div>
    </div>
  );
}
