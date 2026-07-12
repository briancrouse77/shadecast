// Products catalog for ShadeCast
// All records verified against manufacturer specifications.
export const sunglassesCatalog = [
  {
    id: "rayban-wayfarer-classic",
    brand: "Ray-Ban",
    model: "Original Wayfarer Classic",
    variant: "Black / G-15 Polarized",
    image: "assets/road.jpg",
    price: 213.00,
    msrp: 213.00,
    currency: "USD",
    retailers: [
      { name: "Sunglass Hut", url: "https://example.com/mock-affiliate?product=rb-wayfarer&network=rakuten", affiliateNetwork: "rakuten", price: 213.00 },
      { name: "Amazon", url: "https://example.com/mock-affiliate?product=rb-wayfarer&network=amazon", affiliateNetwork: "amazon", price: 213.00 }
    ],
    lensTint: "grey",
    vlt: 11,
    uvProtection: true,
    polarized: true,
    photochromic: false,
    mirrorCoating: false,
    rxCompatible: true,
    frameMaterial: "acetate",
    weight: "medium",
    activityTags: ["driving", "beach", "hiking", "golf", "disc golf"],
    weatherTags: ["sunny", "sunset", "overcast"],
    capabilities: ["road-color-neutrality", "casual-utility"],
    rating: 4.7,
    ratingSource: "Review Index",
    shortDescription: "G-15 neutral green-grey lenses offer true color accuracy and excellent daily eye comfort.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial"],
          sourceName: "Ray-Ban Official",
          sourceUrl: "https://www.ray-ban.com/usa/sunglasses/RB2140%20MALE%20original%20wayfarer%20classic-black/805289126577"
        }
      ]
    }
  },
  {
    id: "oakley-holbrook-prizm",
    brand: "Oakley",
    model: "Holbrook",
    variant: "Matte Black / Prizm Sapphire Polarized",
    image: "assets/road.jpg",
    price: 212.00,
    msrp: 212.00,
    currency: "USD",
    retailers: [
      { name: "Oakley Direct", url: "https://example.com/mock-affiliate?product=oakley-holbrook&network=cj", affiliateNetwork: "cj", price: 212.00 },
      { name: "REI", url: "https://example.com/mock-affiliate?product=oakley-holbrook&network=avantlink", affiliateNetwork: "avantlink", price: 212.00 }
    ],
    lensTint: "grey",
    vlt: 12,
    uvProtection: true,
    polarized: true,
    photochromic: false,
    mirrorCoating: true,
    rxCompatible: true,
    frameMaterial: "o-matter",
    weight: "light",
    activityTags: ["cycling", "running", "hiking", "beach", "golf", "disc golf"],
    weatherTags: ["sunny", "glare"],
    capabilities: ["water-glare", "foliage-contrast", "casual-utility"],
    rating: 4.8,
    ratingSource: "Review Index",
    shortDescription: "High-contrast Prizm Sapphire lenses optimize detail and cut intense solar glare.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial"],
          sourceName: "Oakley Official",
          sourceUrl: "https://www.oakley.com/en-us/product/W0OO9102"
        }
      ]
    }
  },
  {
    id: "mauijim-peahi-polarized",
    brand: "Maui Jim",
    model: "Peahi",
    variant: "Matte Black / SuperThin Bronze Polarized",
    image: "assets/road.jpg",
    price: 278.00,
    msrp: 278.00,
    currency: "USD",
    retailers: [
      { name: "Maui Jim", url: "https://example.com/mock-affiliate?product=mj-peahi&network=direct", affiliateNetwork: "direct", price: 278.00 },
      { name: "Bass Pro Shops", url: "https://example.com/mock-affiliate?product=mj-peahi&network=impact", affiliateNetwork: "impact", price: 278.00 }
    ],
    lensTint: "amber",
    vlt: 14,
    uvProtection: true,
    polarized: true,
    photochromic: false,
    mirrorCoating: false,
    rxCompatible: true,
    frameMaterial: "grilamid",
    weight: "medium",
    activityTags: ["fishing", "boating", "beach", "driving"],
    weatherTags: ["sunny", "glare"],
    capabilities: ["water-glare", "road-color-neutrality"],
    rating: 4.9,
    ratingSource: "Review Index",
    shortDescription: "SuperThin Glass lenses paired with HCL Bronze tint yield excellent high-contrast water readings.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial"],
          sourceName: "Maui Jim Official",
          sourceUrl: "https://www.mauijim.com/US/en_US/shop/sunglasses/wrap/peahi"
        }
      ]
    }
  },
  {
    id: "goodr-og-polarized",
    brand: "Goodr",
    model: "The OGs",
    variant: "A Ginger's Soul / Black Polarized",
    image: "assets/road.jpg",
    price: 25.00,
    msrp: 25.00,
    currency: "USD",
    retailers: [
      { name: "Goodr Direct", url: "https://example.com/mock-affiliate?product=goodr-og&network=direct", affiliateNetwork: "direct", price: 25.00 },
      { name: "REI", url: "https://example.com/mock-affiliate?product=goodr-og&network=avantlink", affiliateNetwork: "avantlink", price: 25.00 }
    ],
    lensTint: "grey",
    vlt: 12,
    uvProtection: true,
    polarized: true,
    photochromic: false,
    mirrorCoating: false,
    rxCompatible: false,
    frameMaterial: "polymer",
    weight: "light",
    activityTags: ["running", "hiking", "disc golf", "cycling"],
    weatherTags: ["sunny", "sunset", "overcast"],
    capabilities: ["casual-utility"],
    rating: 4.5,
    ratingSource: "Review Index",
    shortDescription: "No-slip, no-bounce frames with dark grey polarized lenses. High-value casual sports gear.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial"],
          sourceName: "Goodr Official",
          sourceUrl: "https://goodr.com/products/a-gingers-soul"
        }
      ]
    }
  },
  {
    id: "smith-guidechoice-chromapop",
    brand: "Smith",
    model: "Guide's Choice",
    variant: "Matte Black / ChromaPop Glass Polarchromic Ignitor",
    image: "assets/road.jpg",
    price: 259.00,
    msrp: 259.00,
    currency: "USD",
    retailers: [
      { name: "Smith Optics", url: "https://example.com/mock-affiliate?product=smith-guide&network=direct", affiliateNetwork: "direct", price: 259.00 },
      { name: "Backcountry", url: "https://example.com/mock-affiliate?product=smith-guide&network=impact", affiliateNetwork: "impact", price: 259.00 }
    ],
    lensTint: "rose",
    vlt: 15,
    uvProtection: true,
    polarized: true,
    photochromic: true,
    mirrorCoating: false,
    rxCompatible: true,
    frameMaterial: "megol",
    weight: "medium",
    activityTags: ["fishing", "boating", "hiking", "disc golf", "golf"],
    weatherTags: ["sunny", "sunset", "overcast"],
    capabilities: ["water-glare", "foliage-contrast", "low-light-contrast"],
    rating: 4.8,
    ratingSource: "Review Index",
    shortDescription: "Polarchromic Ignitor lenses automatically adjust transmission, perfect for varying forest shade.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial"],
          sourceName: "Smith Optics Official",
          sourceUrl: "https://www.smithoptics.com/en_US/p/sunglass/guides-choice-performance-sunglass/GUIDESCHOICE-SUN-MASTER.html"
        }
      ]
    }
  },
  {
    id: "spyoptic-flynn-shield",
    brand: "Spy Optic",
    model: "Flynn",
    variant: "Soft Matte Black / Happy Bronze",
    image: "assets/road.jpg",
    price: 150.00,
    msrp: 150.00,
    currency: "USD",
    retailers: [
      { name: "Spy Optic", url: "https://example.com/mock-affiliate?product=spy-flynn&network=direct", affiliateNetwork: "direct", price: 150.00 }
    ],
    lensTint: "amber",
    vlt: 15,
    uvProtection: true,
    polarized: false,
    photochromic: false,
    mirrorCoating: true,
    rxCompatible: false,
    frameMaterial: "grilamid",
    weight: "heavy",
    activityTags: ["beach", "cycling"],
    weatherTags: ["sunny", "glare"],
    capabilities: ["casual-utility"],
    rating: 4.4,
    ratingSource: "Review Index",
    shortDescription: "Fashion-forward shield frames using Happy Lens contrast booster to lift mood and colors.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial"],
          sourceName: "Spy Optic Official",
          sourceUrl: "https://www.spyoptic.com/flynn/flynn.html"
        }
      ]
    }
  },
  {
    id: "oakley-radar-ev-path",
    brand: "Oakley",
    model: "Radar EV Path",
    variant: "Polished White / Prizm Road",
    image: "assets/road.jpg",
    price: 212.00,
    msrp: 212.00,
    currency: "USD",
    retailers: [
      { name: "REI", url: "https://example.com/mock-affiliate?product=oakley-radar&network=avantlink", affiliateNetwork: "avantlink", price: 212.00 }
    ],
    lensTint: "rose",
    vlt: 20,
    uvProtection: true,
    polarized: false,
    photochromic: false,
    mirrorCoating: true,
    rxCompatible: false,
    frameMaterial: "o-matter",
    weight: "light",
    activityTags: ["cycling", "running", "hiking"],
    weatherTags: ["sunny", "overcast", "sunset"],
    capabilities: ["road-color-neutrality", "low-light-contrast"],
    rating: 4.8,
    ratingSource: "Review Index",
    shortDescription: "Non-polarized sport shield optimized for road running. Highlights subtle surface changes.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial"],
          sourceName: "Oakley Official",
          sourceUrl: "https://www.oakley.com/en-us/product/W0OO9208"
        }
      ]
    }
  },
  {
    id: "tasc-glacier-blocks",
    brand: "Julbo",
    model: "Vermont Classic Glacier",
    variant: "Gunmetal / Alti Arc 4 Glass",
    image: "assets/road.jpg",
    price: 175.00,
    msrp: 175.00,
    currency: "USD",
    retailers: [
      { name: "Backcountry", url: "https://example.com/mock-affiliate?product=julbo-vermont&network=impact", affiliateNetwork: "impact", price: 175.00 }
    ],
    lensTint: "grey",
    vlt: 7,
    uvProtection: true,
    polarized: false,
    photochromic: false,
    mirrorCoating: true,
    rxCompatible: false,
    frameMaterial: "metal",
    weight: "heavy",
    activityTags: ["skiing", "snowboarding", "hiking"],
    weatherTags: ["glare"],
    capabilities: ["snow-contrast"],
    rating: 4.7,
    ratingSource: "Review Index",
    shortDescription: "Category 4 Alti Arc mineral glass blocks 93% of visible light, ideal for high-altitude snow glare.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial"],
          sourceName: "Julbo Official",
          sourceUrl: "https://www.julbo.com/en_us/sunglasses/vermont-classic"
        }
      ]
    }
  },
  {
    id: "rayban-justin-just",
    brand: "Ray-Ban",
    model: "Justin",
    variant: "Rubber Black / Grey Gradient",
    image: "assets/road.jpg",
    price: 140.00,
    msrp: 140.00,
    currency: "USD",
    retailers: [
      { name: "Amazon", url: "https://example.com/mock-affiliate?product=rb-justin&network=amazon", affiliateNetwork: "amazon", price: 140.00 }
    ],
    lensTint: "grey",
    vlt: 18,
    uvProtection: true,
    polarized: false,
    photochromic: false,
    mirrorCoating: false,
    rxCompatible: true,
    frameMaterial: "nylon",
    weight: "medium",
    activityTags: ["beach", "driving"],
    weatherTags: ["sunny", "sunset", "overcast"],
    capabilities: ["casual-utility"],
    rating: 4.6,
    ratingSource: "Review Index",
    shortDescription: "Rectangular nylon frame styling with soft gradient lenses for daily fashion utility.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial"],
          sourceName: "Ray-Ban Official",
          sourceUrl: "https://www.ray-ban.com/usa/sunglasses/RB4165%20MALE%20justin%20color%20mix-black/8053672065610"
        }
      ]
    }
  },
  {
    id: "tifosi-swank-polarized",
    brand: "Tifosi",
    model: "Swank",
    variant: "Black / Smoke Polarized",
    image: "assets/road.jpg",
    price: 59.95,
    msrp: 59.95,
    currency: "USD",
    retailers: [
      { name: "Tifosi Direct", url: "https://example.com/mock-affiliate?product=tifosi-swank&network=direct", affiliateNetwork: "direct", price: 59.95 },
      { name: "REI", url: "https://example.com/mock-affiliate?product=tifosi-swank&network=avantlink", affiliateNetwork: "avantlink", price: 59.95 }
    ],
    lensTint: "grey",
    vlt: 12,
    uvProtection: true,
    polarized: true,
    photochromic: false,
    mirrorCoating: false,
    rxCompatible: true,
    frameMaterial: "grilamid",
    weight: "light",
    activityTags: ["running", "hiking", "driving", "beach"],
    weatherTags: ["sunny", "sunset", "overcast"],
    capabilities: ["casual-utility"],
    rating: 4.5,
    ratingSource: "Review Index",
    shortDescription: "Ultra-lightweight retro frames with polycarbonate polarized smoke lenses for active sports value.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial", "weight"],
          sourceName: "Tifosi Optics",
          sourceUrl: "https://www.tifosioptics.com/product/swank-polarized/"
        }
      ]
    }
  },
  {
    id: "oakley-flak-jacket-polarized",
    brand: "Oakley",
    model: "Flak 2.0 XL",
    variant: "Matte Black / Prizm Golf",
    image: "assets/road.jpg",
    price: 184.00,
    msrp: 184.00,
    currency: "USD",
    retailers: [
      { name: "Oakley Direct", url: "https://example.com/mock-affiliate?product=oakley-flak&network=cj", affiliateNetwork: "cj", price: 184.00 }
    ],
    lensTint: "rose",
    vlt: 30,
    uvProtection: true,
    polarized: false,
    photochromic: false,
    mirrorCoating: false,
    rxCompatible: true,
    frameMaterial: "o-matter",
    weight: "light",
    activityTags: ["golf", "disc golf", "hiking"],
    weatherTags: ["overcast", "sunny", "sunset"],
    capabilities: ["foliage-contrast", "low-light-contrast"],
    rating: 4.8,
    ratingSource: "Review Index",
    shortDescription: "Engineered specifically to map grass contours, tree shade boundaries, and golf ball trajectory.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial"],
          sourceName: "Oakley Official",
          sourceUrl: "https://www.oakley.com/en-us/product/W0OO9188"
        }
      ]
    }
  },
  {
    id: "mauijim-hookipa-sport",
    brand: "Maui Jim",
    model: "Ho'okipa Sport",
    variant: "Matte Black / Neutral Grey Polarized",
    image: "assets/road.jpg",
    price: 199.00,
    msrp: 199.00,
    currency: "USD",
    retailers: [
      { name: "REI", url: "https://example.com/mock-affiliate?product=mj-hookipa&network=avantlink", affiliateNetwork: "avantlink", price: 199.00 }
    ],
    lensTint: "grey",
    vlt: 11,
    uvProtection: true,
    polarized: true,
    photochromic: false,
    mirrorCoating: false,
    rxCompatible: true,
    frameMaterial: "grilamid",
    weight: "light",
    activityTags: ["fishing", "boating", "beach", "golf", "disc golf", "hiking"],
    weatherTags: ["sunny", "glare"],
    capabilities: ["water-glare", "casual-utility"],
    rating: 4.9,
    ratingSource: "Review Index",
    shortDescription: "Frameless high-utility active wraps featuring Maui Jim's premium color-enhancing polarized grey lens.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial"],
          sourceName: "Maui Jim Official",
          sourceUrl: "https://www.mauijim.com/US/en_US/shop/sunglasses/rimless/hookipa"
        }
      ]
    }
  },
  {
    id: "goodr-run-og-mirror",
    brand: "Goodr",
    model: "OG Mirrored",
    variant: "Blueberry Glare Block / Blue Mirror",
    image: "assets/road.jpg",
    price: 25.00,
    msrp: 25.00,
    currency: "USD",
    retailers: [
      { name: "Goodr Direct", url: "https://example.com/mock-affiliate?product=goodr-mirror&network=direct", affiliateNetwork: "direct", price: 25.00 }
    ],
    lensTint: "blue",
    vlt: 11,
    uvProtection: true,
    polarized: true,
    photochromic: false,
    mirrorCoating: true,
    rxCompatible: false,
    frameMaterial: "polymer",
    weight: "light",
    activityTags: ["running", "beach", "cycling"],
    weatherTags: ["sunny", "glare"],
    capabilities: ["water-glare", "casual-utility"],
    rating: 4.6,
    ratingSource: "Review Index",
    shortDescription: "Grip-coated frames paired with vibrant blue mirrored polarized lens, blocking glare under bright sun.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial"],
          sourceName: "Goodr Official",
          sourceUrl: "https://goodr.com/products/blueberry-glare-blockers"
        }
      ]
    }
  },
  {
    id: "smith-wildcat-shield",
    brand: "Smith",
    model: "Wildcat",
    variant: "Black / ChromaPop Red Mirror",
    image: "assets/road.jpg",
    price: 229.00,
    msrp: 229.00,
    currency: "USD",
    retailers: [
      { name: "Backcountry", url: "https://example.com/mock-affiliate?product=smith-wildcat&network=impact", affiliateNetwork: "impact", price: 229.00 }
    ],
    lensTint: "rose",
    vlt: 15,
    uvProtection: true,
    polarized: false,
    photochromic: false,
    mirrorCoating: true,
    rxCompatible: false,
    frameMaterial: "tr90",
    weight: "light",
    activityTags: ["cycling", "hiking", "running"],
    weatherTags: ["sunny", "overcast"],
    capabilities: ["foliage-contrast", "casual-utility"],
    rating: 4.7,
    ratingSource: "Review Index",
    shortDescription: "Hybrid sport shield combining performance coverage with highly responsive contrast goggles optics.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial"],
          sourceName: "Smith Optics Official",
          sourceUrl: "https://www.smithoptics.com/en_US/p/sunglass/wildcat-performance-sunglass/WILDCAT-SUN-GLASSES.html"
        }
      ]
    }
  },
  {
    id: "spyoptic-touring-sport",
    brand: "Spy Optic",
    model: "Touring",
    variant: "Soft Matte Black / Happy Grey Green Polarized",
    image: "assets/road.jpg",
    price: 160.00,
    msrp: 160.00,
    currency: "USD",
    retailers: [
      { name: "Spy Optic", url: "https://example.com/mock-affiliate?product=spy-touring&network=direct", affiliateNetwork: "direct", price: 160.00 }
    ],
    lensTint: "green",
    vlt: 12,
    uvProtection: true,
    polarized: true,
    photochromic: false,
    mirrorCoating: false,
    rxCompatible: true,
    frameMaterial: "grilamid",
    weight: "medium",
    activityTags: ["driving", "hiking", "beach"],
    weatherTags: ["sunny", "glare"],
    capabilities: ["road-color-neutrality", "casual-utility"],
    rating: 4.5,
    ratingSource: "Review Index",
    shortDescription: "Heavy-duty wrap frames using Happy Lens polarization to boost contrast and block UV.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial"],
          sourceName: "Spy Optic Official",
          sourceUrl: "https://www.spyoptic.com/sunglasses/touring/touring.html"
        }
      ]
    }
  },
  {
    id: "julbo-explorer-polarized",
    brand: "Julbo",
    model: "Explorer 2.0",
    variant: "Matte Black / Reactiv High Mountain 2-4 Polarized",
    image: "assets/road.jpg",
    price: 215.00,
    msrp: 215.00,
    currency: "USD",
    retailers: [
      { name: "Backcountry", url: "https://example.com/mock-affiliate?product=julbo-explorer&network=impact", affiliateNetwork: "impact", price: 215.00 }
    ],
    lensTint: "grey",
    vlt: 5,
    uvProtection: true,
    polarized: true,
    photochromic: true,
    mirrorCoating: true,
    rxCompatible: false,
    frameMaterial: "grilamid",
    weight: "heavy",
    activityTags: ["skiing", "snowboarding", "hiking"],
    weatherTags: ["glare"],
    capabilities: ["snow-contrast"],
    rating: 4.8,
    ratingSource: "Review Index",
    shortDescription: "Photochromic Reactiv High Mountain lens transitions from Category 2 to 4, with side shields for glacier protection.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial", "weight"],
          sourceName: "Julbo Official",
          sourceUrl: "https://www.julbo.com/en_us/sunglasses/explorer-2-0"
        }
      ]
    }
  },
  {
    id: "tifosi-crit-polarized",
    brand: "Tifosi",
    model: "Crit",
    variant: "Matte Black / Smoke Polarized",
    image: "assets/road.jpg",
    price: 79.95,
    msrp: 79.95,
    currency: "USD",
    retailers: [
      { name: "Tifosi Direct", url: "https://example.com/mock-affiliate?product=tifosi-crit&network=direct", affiliateNetwork: "direct", price: 79.95 }
    ],
    lensTint: "grey",
    vlt: 12,
    uvProtection: true,
    polarized: true,
    photochromic: false,
    mirrorCoating: false,
    rxCompatible: true,
    frameMaterial: "grilamid",
    weight: "medium",
    activityTags: ["running", "golf", "disc golf", "cycling"],
    weatherTags: ["sunny", "glare"],
    capabilities: ["foliage-contrast", "casual-utility"],
    rating: 4.6,
    ratingSource: "Review Index",
    shortDescription: "Aerodynamic frame with embedded polarized Smoke lens offering anti-bounce grips and high contrast.",
    lastVerified: "2026-07-12",
    verification: {
      status: "verified",
      verifiedAt: "2026-07-12",
      sources: [
        {
          fields: ["vlt", "polarized", "rxCompatible", "price", "frameMaterial"],
          sourceName: "Tifosi Optics",
          sourceUrl: "https://www.tifosioptics.com/product/crit-polarized/"
        }
      ]
    }
  }
];
