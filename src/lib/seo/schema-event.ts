/**
 * JSON-LD Structured Data generator for Google Rich Results (Event Schema)
 */

export interface EventSchemaOptions {
  url?: string;
  imageUrl?: string;
}

export function generateEventJsonLd(options: EventSchemaOptions = {}) {
  const siteUrl = options.url || "https://hauntingsoftherift.co.ke";
  const posterImage = options.imageUrl || `${siteUrl}/rift-night.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Hauntings of the Rift — Halloween Nightlife 2026",
    description:
      "A premium Halloween nightlife and sensory masquerade experience in Nakuru, presented by Verve & Co. Featuring spine-chilling immersive audio, live DJs, and curated cocktail activations at Top Cliff Lodge.",
    image: [posterImage],
    startDate: "2026-10-31T16:00:00+03:00",
    endDate: "2026-11-01T04:00:00+03:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Top Cliff Lodge",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Highway, Top Cliff Lodge, along",
        addressLocality: "Nairobi",
        addressRegion: "Rift Valley",
        postalCode: "20100",
        addressCountry: "KE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -0.2833,
        longitude: 36.0667,
      },
    },
    offers: {
      "@type": "AggregateOffer",
      url: `${siteUrl}/#tickets`,
      priceCurrency: "KES",
      lowPrice: "1000",
      highPrice: "6500",
      offerCount: "4",
      availability: "https://schema.org/InStock",
      validFrom: "2026-08-01T00:00:00+03:00",
      offers: [
        {
          "@type": "Offer",
          name: "Early Bird",
          price: "1000",
          priceCurrency: "KES",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/checkout?tier=early-bird`,
        },
        {
          "@type": "Offer",
          name: "General Admission",
          price: "2500",
          priceCurrency: "KES",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/checkout?tier=general-admission`,
        },
        {
          "@type": "Offer",
          name: "Couple Pass",
          price: "4500",
          priceCurrency: "KES",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/checkout?tier=couple-pass`,
        },
        {
          "@type": "Offer",
          name: "Hellfire VIP",
          price: "6500",
          priceCurrency: "KES",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/checkout?tier=hellfire-vip`,
        },
      ],
    },
    organizer: {
      "@type": "Organization",
      name: "Verve & Co.",
      url: "https://verve.co.ke",
      logo: `${siteUrl}/favicon.svg`,
    },
    performer: [
      {
        "@type": "PerformingGroup",
        name: "Verve Resident DJs & Visual Artists",
      },
    ],
    typicalAgeRange: "21+",
  };
}
