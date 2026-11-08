/**
 * Copy for /concierge. Prices are monthly in LKR with free setup.
 * Costs and margins live in the internal price sheet, never here.
 */

export const conciergeWhatsApp =
  "https://wa.me/94740591853?text=" +
  encodeURIComponent("Hi Leona, I'd like a demo of Leona Concierge for my property in ");

/** Must match the languages switched on for the agent in ElevenLabs. */
export const languages = ["English", "Arabic", "German", "Hindi", "Russian", "Tamil"];

/** A real test call, trimmed. Nuwan is the concierge for our demo villa. */
export const sampleCall: { who: "guest" | "gayan" | "alert"; text: string }[] = [
  { who: "gayan", text: "Hi, Seaview Villa, Nuwan speaking. I'm the villa's digital assistant. How can I help?" },
  { who: "guest", text: "I'm locked out of my room. I think they gave me the wrong key." },
  { who: "gayan", text: "Easy fix, staff have spares. What's your room number?" },
  { who: "guest", text: "Room four." },
  { who: "alert", text: "Owner alerted · Wrong key, Room 4 · send Gayan with the spare" },
  { who: "gayan", text: "Done. Gayan's bringing the right key to room four now." },
  { who: "guest", text: "Also, we fly out tomorrow at 8 pm. Can you sort a car?" },
  { who: "gayan", text: "Pickup at two works for an 8 pm flight. Car for three is twenty thousand rupees. Shall I book it?" },
  { who: "alert", text: "Owner alerted · Airport transfer, tomorrow 2 pm · Total: Rs 20,000" },
];

export const steps = [
  {
    title: "We learn your property",
    text: "Send us your house manual or front desk notes, or talk us through it on one call: Wi-Fi, door codes, breakfast times, the café down the road, your transfer prices. We set your concierge up and test it with you.",
  },
  {
    title: "Guests reach it 24/7",
    text: "A QR code on the check-in card or a link in your welcome message. Guests call any time and speak their own language.",
  },
  {
    title: "You only hear what matters",
    text: "Small questions get answered on the spot. Real problems and paid extras come to your phone, or your duty manager's, as a short alert. At night, only urgent ones.",
  },
];

export const audiences = [
  { title: "Villas and holiday homes", text: "Guests get answers in minutes, even when the owner lives in another time zone." },
  { title: "Guest houses and homestays", text: "Someone picks up at 3 am without you paying for a night shift." },
  { title: "Boutique and city hotels", text: "The front desk stops reading out the Wi-Fi password all day, and calls still get answered during a busy check-in." },
  { title: "Resorts and large hotels", text: "It takes the overflow at peak times, and calls in languages your team doesn't speak, around the clock." },
  { title: "Hostels", text: "Travellers get checkout times, locker rules and bus routes without queuing at the desk." },
  { title: "Property managers and groups", text: "One setup per property, one dashboard for every alert and every extra sold." },
  { title: "Cafés and restaurants", text: "Table bookings, opening hours and allergy questions get answered while your staff keep serving." },
  { title: "Salons and spas", text: "Appointment requests and price questions come in at any hour and land on your phone as one short note." },
];

/** Tour and transfer companies: the same concierge, answering travellers instead of hotel guests. */
export const tourCall: { who: "guest" | "gayan" | "alert"; text: string }[] = [
  { who: "guest", text: "Our driver for the Ella trip isn't here yet. We're at the hotel in Galle." },
  { who: "gayan", text: "Sorry about that. Saman is ten minutes away, stuck behind a bus. He'll call you when he's outside." },
  { who: "alert", text: "Ops alerted · Ella tour, pickup late, Galle Fort Hotel · guests waiting" },
  { who: "guest", text: "Can we add Nine Arches Bridge on the way?" },
  { who: "gayan", text: "Yes, it adds about an hour and Rs 5,000. I'll send it to the team to confirm." },
];

export const tourPoints = [
  {
    title: "Answers travellers on the road",
    text: "Pickup times, what to bring, how long the drive is, whether the safari runs in the rain. In their language, at 5 am before the sunrise trip.",
  },
  {
    title: "Turns questions into bookings",
    text: "It quotes your tours and transfers from your own price list, and sends every enquiry to your team with the date, the group size and the total.",
  },
  {
    title: "Catches problems mid-trip",
    text: "A late driver, a changed flight, a guest who feels unwell. Your ops person gets a short alert straight away, not a missed call.",
  },
];

export const differences = [
  {
    title: "Made by people who host",
    text: "We host guests on the south coast ourselves, so the concierge knows the calls that actually come in: lockouts, airport runs, the Wi-Fi that drops at midnight.",
  },
  {
    title: "Guests just talk to it",
    text: "No menus, no pressing 1. Guests ask the way they'd ask you, and get a short answer.",
  },
  {
    title: "It knows when to bother you",
    text: "A dead keypad at night reaches you straight away. A request for towels waits until morning.",
  },
  {
    title: "It sells your extras",
    text: "It offers the airport pickup when a guest mentions their flight, and the tour when they ask what to do. You see every one, with the total.",
  },
  {
    title: "It won't overpromise",
    text: "It tells guests it's a digital assistant. It won't confirm a booking, discount or refund, and if it doesn't know something, it says so and asks you.",
  },
];

export type Plan = {
  name: string;
  forWho: string;
  price: string;
  calls: string;
  extra?: string;
  featured?: boolean;
  intro?: string;
  items: { text: string; soon?: boolean }[];
};

/** Priced by call volume, not business type. Setup is free and folded into the monthly price. */
export const plans: Plan[] = [
  {
    name: "Starter",
    forWho: "Homestays and small villas",
    price: "14,900",
    calls: "about 25 calls",
    extra: "250",
    items: [
      { text: "Voice concierge, 60 call minutes a month" },
      { text: `Answers in ${languages.length} languages` },
      { text: "Instant alerts to you or your team, quiet at night" },
      { text: "Dashboard with every request" },
      { text: "300 WhatsApp replies a month", soon: true },
    ],
  },
  {
    name: "Standard",
    forWho: "Villas and guest houses",
    price: "24,900",
    calls: "about 60 calls",
    extra: "200",
    featured: true,
    intro: "Everything in Starter, plus",
    items: [
      { text: "150 call minutes a month" },
      { text: "600 WhatsApp replies a month", soon: true },
      { text: "Sinhala replies on WhatsApp", soon: true },
      { text: "Sells your extras: pickups, tours, add-ons" },
      { text: "Monthly report of extras earned" },
    ],
  },
  {
    name: "Pro",
    forWho: "Small hotels and tours",
    price: "44,900",
    calls: "about 120 calls",
    extra: "160",
    intro: "Everything in Standard, plus",
    items: [
      { text: "300 call minutes a month" },
      { text: "1,000 WhatsApp replies a month", soon: true },
      { text: "Welcome, follow-up and goodbye messages", soon: true },
      { text: "Unhappy-customer warnings before they review" },
      { text: "Staff alerts for housekeeping or ops" },
      { text: "Priority support, same-day changes" },
    ],
  },
  {
    name: "Custom",
    forWho: "Resorts and groups",
    price: "75,000+",
    calls: "minutes set to your volume",
    intro: "Everything in Pro, plus",
    items: [
      { text: "Minutes and replies sized to your business" },
      { text: "Your own local phone number" },
      { text: "One dashboard for every property" },
      { text: "Quarterly review with Leona" },
    ],
  },
];

export const addOns: [string, string][] = [
  ["Your own +94 phone number", "On request"],
  ["Each extra property, same owner", "Rs 9,900 / month"],
  ["Call insights report", "Rs 3,000 / month"],
  ["Low-season pause, May to September", "Rs 4,000 / month"],
];

export const faqs: [string, string][] = [
  [
    "Will guests know they're not talking to a person?",
    "Yes. It introduces itself as your property's digital assistant, and if a guest asks, it says so plainly and offers to get someone from your team.",
  ],
  [
    "What happens when it doesn't know an answer?",
    "It says it will check with the team and sends you an alert with the question. It never guesses, and never invents a price.",
  ],
  [
    "What about real emergencies?",
    "It stays calm, gives the safety steps you've set (the water valve, the gas, where to wait), gives the right Sri Lankan emergency number, and alerts you straight away.",
  ],
  [
    "Will it wake me up for towels at 3 am?",
    "No. From 10 pm to 7 am only urgent problems reach you straight away. Everything else is marked for the morning.",
  ],
  [
    "Which languages does it speak?",
    `On calls: ${languages.join(", ")}. It switches by itself when a guest speaks another language. Sinhala replies come with the WhatsApp launch.`,
  ],
  [
    "How do guests reach it?",
    "With a QR code and link on the check-in card or in your welcome message. Calls and messages on your own WhatsApp number are coming soon. A normal local phone line is available on request.",
  ],
  [
    "Is there a setup fee?",
    "No. Setup is free on every plan. We learn your business, set up the concierge and test it with you before it goes live.",
  ],
  [
    "Can it take bookings or payments?",
    "No, on purpose. It takes the details of a booking enquiry and passes them to you. Bookings, discounts and refunds always stay your decision.",
  ],
  [
    "What if we use more than our minutes?",
    "Extra call minutes are Rs 250 on Starter, Rs 200 on Standard and Rs 160 on Pro. We'll tell you before you get close, and if you often go over, moving up a plan works out cheaper. You can change plan any month.",
  ],
  [
    "What happens to guest calls and data?",
    "Conversations are kept for 60 days so you can review them, then deleted. We don't share them with anyone.",
  ],
];
