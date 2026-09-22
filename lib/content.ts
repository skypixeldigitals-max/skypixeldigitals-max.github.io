/**
 * Every piece of copy on the site lives here so it can be proofread and edited
 * without touching component code. Transcribed from the Frame 33 draft — worth
 * a read-through, since some of it came off a compressed export.
 */

export const brand = {
  name: "Leona Properties",
  phone: "+94 74 059 1853",
  phoneHref: "tel:+94740591853",
  whatsapp:
    "https://wa.me/94740591853?text=" +
    encodeURIComponent("Hi Leona, I own a villa in "),
  email: "leonaproperties1@gmail.com",
  responseTime: "Within 24 hours — usually faster",
};

export const hero = {
  headline: "Sri Lanka's short-term rental specialists",
  scrollHint: "Scroll to walk through what we do",
  ctaLabel: "What could your villa earn?",
};

/** Frame 34's stats card — note it leads with experience, not occupancy. */
export const stats = [
  { value: "20+", label: "Years of Hospitality Experience" },
  { value: "40%", label: "Revenue Uplift" },
  { value: "100%", label: "Transparent" },
];

export const platforms = [
  { name: "agoda", src: "/brand/platform-agoda.webp" },
  { name: "Booking.com", src: "/brand/platform-booking.webp" },
  { name: "tripadvisor", src: "/brand/platform-tripadvisor.webp" },
  { name: "airbnb", src: "/brand/platform-airbnb.webp" },
];

/**
 * The four services, in scroll order. `mode` decides how the act is staged:
 * "villa" acts scrub the frame sequence, "screen" acts freeze and dim the last
 * frame and bring up an interface visual instead.
 */
export const services = [
  {
    number: "01",
    title: "Property Management",
    body: "We handle your guests, coordinate cleaners, deal with maintenance, manage your calendar, and optimise your pricing — every single day. You log in once a month to see what you've earned.",
    mode: "villa" as const,
  },
  {
    number: "02",
    title: "Interior Design & Architecture",
    body: "We design villas that rank — not just look good. Every decision is informed by Airbnb's search algorithm, what guests filter for, and what drives five-star reviews.",
    mode: "villa" as const,
  },
  {
    number: "03",
    title: "Listing Optimisation",
    body: "A great property with a bad listing earns nothing. We write SEO-optimised descriptions, shoot scroll-stopping photography, and build listings that show up — and convert.",
    mode: "screen" as const,
  },
  {
    number: "04",
    title: "Content Creation",
    body: "We craft scroll-stopping content for your property — reels, photography, and social media assets that build your brand, attract more guests, and keep your listing ahead of the competition.",
    mode: "screen" as const,
  },
];

export const handoff = {
  lineOne: "We don't just design beautiful villas.",
  lineTwo: "We design villas that rank.",
  kicker:
    "Most interior designers make a space look good. We make sure it earns — because a villa that photographs beautifully but ranks on page four of Airbnb is a very expensive ornament.",
};

export const process = {
  title: "How it works",
  steps: [
    {
      number: "01",
      title: "Property Assessment",
      body: "We visit your property and give you an honest evaluation — what it needs, what it doesn't, and what the ROI looks like before you spend a rupee.",
    },
    {
      number: "02",
      title: "Design & Sourcing Plan",
      body: "A full plan covering styling direction, furniture sourcing, renovation recommendations, and a clear budget breakdown.",
    },
    {
      number: "03",
      title: "Execution",
      body: "We coordinate trades, source pieces, style the space, and prepare it for photography. You don't need to be there for any of it.",
    },
    {
      number: "04",
      title: "Photography & Launch",
      body: "We prepare the property for the shoot and take care of the full listing launch — ready to start earning from day one.",
    },
  ],
};

export const dashboard = {
  title: "You always know exactly what's happening.",
  paragraphs: [
    "Most property managers send a WhatsApp text at the end of the month with a few numbers and a quick update, leaving you guessing how your property actually performed.",
    "With Leona, everything is visible in real time. Every booking, every rupee earned, and every maintenance task is updated on a live dashboard you can access anytime.",
    "Your property should be as easy to monitor as your bank account. Now it is.",
  ],
  ownerLabel: "Rohan P. — Villa Mirissa",
  metrics: [
    {
      label: "Revenue Earned",
      value: "Rs. 284,500",
      delta: "+18% vs last month",
      countTo: 284500,
      prefix: "Rs. ",
    },
    {
      label: "Occupancy Rate",
      value: "87%",
      delta: "+4% vs last month",
      countTo: 87,
      suffix: "%",
    },
    {
      label: "Avg. Nightly Rate",
      value: "Rs. 18,200",
      delta: "Optimised for peak season",
      countTo: 18200,
      prefix: "Rs. ",
    },
  ],
  bookings: [
    {
      guest: "Sarah & Tom",
      origin: "UK",
      dates: "Mar 16 – Mar 25",
      nights: "7 nights",
      amount: "Rs. 127,400",
    },
    {
      guest: "Priya M.",
      origin: "Singapore",
      dates: "Mar 28 – Apr 2",
      nights: "5 nights",
      amount: "Rs. 91,000",
    },
    {
      guest: "James K.",
      origin: "Australia",
      dates: "Apr 5 – Apr 12",
      nights: "7 nights",
      amount: "Rs. 72,800",
    },
    {
      guest: "Nina & Felix",
      origin: "Germany",
      dates: "Apr 12 – Apr 19",
      nights: "7 nights",
      amount: "Rs. 127,400",
    },
  ],
  tasks: [
    {
      title: "Pool service completed",
      detail: "Mar 12 — Chemical balance checked",
      state: "done" as const,
    },
    {
      title: "Deep clean post-checkout",
      detail: "Mar 12 — Ready for next arrival",
      state: "done" as const,
    },
    {
      title: "AC unit serviced",
      detail: "In progress — Technician booked Mar 13",
      state: "active" as const,
    },
    {
      title: "Monthly income report",
      detail: "Due Mar 31 — Full breakdown + receipts",
      state: "pending" as const,
    },
    {
      title: "Restock essentials",
      detail: "Scheduled before Mar 16 arrival",
      state: "pending" as const,
    },
  ],
  features: [
    {
      title: "Live Revenue Tracking",
      body: "See exactly what your property earned this month, this quarter, this year — broken down by booking.",
    },
    {
      title: "Booking Calendar",
      body: "View all upcoming guests, check-in dates, durations, and revenue — in real time, from anywhere.",
    },
    {
      title: "Monthly Income Reports",
      body: "A full breakdown every month — revenue, expenses, net income, and receipts.",
    },
    {
      title: "Maintenance Log",
      body: "View all upcoming maintenance, what was done, when, and what it cost — nothing hidden.",
    },
    {
      title: "Guest Review Tracker",
      body: "Monitor your property's ratings across platforms and see how we're protecting your reputation.",
    },
  ],
};

/**
 * Transcribed verbatim from Frame 34, typos included ("Cheif", "mandarian",
 * "first adder") — fix them in the design first so the two stay in step.
 */
export const team = {
  title: ["Two siblings.", "One goal."],
  story:
    "Some of our earliest memories are family trips and the spaces that hosted them - hotels, family homes, and the kinds of places where the smallest details made people feel genuinely welcomed and cared for. As we got older and worked in hospitality ourselves, that love for creating great experiences stayed with us. That's why we started Leona Properties - to bring that same care to the villas, offices, and commercial spaces alike, through interior design, property upkeep, and the kind of attention that helps every space look and feel its best.",
  members: [
    {
      name: "Devike - Co-Founder",
      bio: "Interior designer with years of industry experience.",
      img: "/brand/p-devike.webp",
      // left / width / bio-block offsets as drawn in Frame 34
      left: "6.25rem",
      width: "18.75rem",
      labelTop: "17.1rem",
      labelLeft: "3.5rem",
      labelWidth: "18rem",
    },
    {
      name: "Dhammika - Technical Consultant",
      bio: "Brings over 20+ years of industry experience in property maintenance strategy. Former chief engineer to luxury Mandarin Oriental hotel groups in the UAE.",
      img: "/brand/p-dhammika.webp",
      left: "26.5rem",
      width: "21.5rem",
      labelTop: "24.2rem",
      labelLeft: "27.6rem",
      labelWidth: "19rem",
    },
    {
      name: "Thareen - Hospitality Specialist",
      bio: "A national-level barista specialist and consultant in speciality coffee with deep roots in premium guest experience.",
      img: "/brand/p-thareen-v4.webp",
      left: "52.8rem",
      width: "18.4rem",
      labelTop: "24.9rem",
      labelLeft: "48.6rem",
      labelWidth: "23rem",
    },
    {
      name: "Devangi - Co-Founder",
      bio: "Project manager and content marketer with 4+ years of experience.",
      img: "/brand/p-devangi.webp",
      left: "71.5rem",
      width: "20.9rem",
      labelTop: "20rem",
      labelLeft: "71.6rem",
      labelWidth: "20.5rem",
    },
  ],
};

export const processSection = {
  kicker: "Interior Design & Styling for properties",
  headline: ["We don't just design", "beautiful spaces. We design", "spaces that rank."],
  body: "Most interior designers make a property look good. We make it perform. There's a difference and it's worth thousands of rupees a month in lost revenue if you get it wrong.",
};

export const alaCarte = {
  title: "Need help at a specific stage? We've got you.",
  subtitle: "No ongoing commitment. Pay once, keep the results.",
  items: [
    {
      title: "New Villa Consultation",
      body: "Building a new villa? We work with you before you commit to design, so you avoid the decisions that cost you more later.",
      cta: "Book a consultation",
    },
    {
      title: "Airport Transfers & VIP Vehicles",
      body: "Chauffeured VIP arrivals, from executive saloons to limousines. Professional drivers, premium vehicles, flight tracking included, available island-wide.",
      cta: "Book a transfer",
    },
    {
      title: "Photography & Listing Launch",
      body: "Professional photography, listing copy, and a full launch on Airbnb and Booking.com. Ready in a week.",
      cta: "Book my listing",
    },
  ],
};

export const contact = {
  title: "Tell us about your property. We'll tell you what it's worth.",
  body: "Fill in the form and we'll do the rest. We'll look at your property, check the market, and tell you exactly what it's worth — usually within 24 hours.",
  submitLabel: "Send my details",
};

export const propertyTypes = [
  "Villa",
  "Apartment",
  "Bungalow",
  "Boutique hotel",
  "Other",
];

export const locations = [
  "Galle",
  "Mirissa",
  "Weligama",
  "Unawatuna",
  "Ahangama",
  "Hikkaduwa",
  "Tangalle",
  "Colombo",
  "Other",
];


/**
 * The establishing frame that follows the villa film. Dot positions are
 * percentages of the 2400×1792 image, measured on the figure's chest so the
 * label reads as "this person". `service` indexes into `services`.
 */
export const establishing = {
  /** Title stack, ERA-style: two caps lines and a script line. */
  title: ["Leona", "Properties"],
  script: "Powering Ceylon Stays",
  /** The split line beneath, with a rule between. */
  strap: ["A villa", "properly cared for"],
  cta: "Get an estimate",
  dots: [
    { x: 77, y: 50, service: 0, note: "Pool, garden, upkeep — every day." },
    { x: 26.5, y: 44, service: 1, note: "From first drawing to final cushion." },
    { x: 66, y: 50, service: 2, note: "Shot, written, and listed properly." },
    { x: 55.5, y: 36, service: 3, note: "Reels and stills that fill calendars." },
  ],
};
