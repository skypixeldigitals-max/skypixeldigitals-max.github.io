/**
 * Copy for /concierge. Prices are monthly in LKR; `low` is the May–October
 * rate. Costs and margins live in the internal price sheet, never here.
 */

export const conciergeWhatsApp =
  "https://wa.me/94740591853?text=" +
  encodeURIComponent("Hi Leona, I'd like a demo of Leona Concierge for my villa in ");

export const languages = [
  "English", "Arabic", "Chinese", "Dutch", "French", "German",
  "Hindi", "Italian", "Polish", "Russian", "Tamil",
];

/** A real test call, trimmed. Gayan is the concierge for our demo villa. */
export const sampleCall: { who: "guest" | "gayan" | "alert"; text: string }[] = [
  { who: "gayan", text: "Hi, Seaview Villa, Gayan speaking. I'm the villa's digital assistant. How can I help?" },
  { who: "guest", text: "I'm locked out of my room. I think they gave me the wrong key." },
  { who: "gayan", text: "Easy fix, staff have spares. What's your room number?" },
  { who: "guest", text: "Room four." },
  { who: "alert", text: "Owner alerted · Wrong key, Room 4 · send Nuwan with the spare" },
  { who: "gayan", text: "Done. Nuwan's bringing the right key to room four now." },
  { who: "guest", text: "Also, we fly out tomorrow at 8 pm. Can you sort a car?" },
  { who: "gayan", text: "Pickup at two works for an 8 pm flight. Car for three is twenty thousand rupees. Shall I book it?" },
  { who: "alert", text: "Owner alerted · Airport transfer, tomorrow 2 pm · Total: Rs 20,000" },
];

export const steps = [
  {
    title: "We learn your villa",
    text: "Send us your house manual, or talk us through it on one call: Wi-Fi, door codes, breakfast times, the café down the road, your transfer prices. We set your concierge up and test it with you.",
  },
  {
    title: "Guests reach it 24/7",
    text: "A QR code and link on the check-in card, or a local phone number. Guests talk to it like a person, in their own language, at any hour.",
  },
  {
    title: "You only hear what matters",
    text: "Small questions get answered on the spot. Real problems and paid extras reach your phone as one clear alert. Nothing wakes you at night unless it should.",
  },
];

export const audiences = [
  { title: "Villa owners who live abroad", text: "Your guests get answers in minutes, not when you wake up in another time zone." },
  { title: "Guest houses without night staff", text: "Someone picks up at 3 am without you paying for a night shift." },
  { title: "Boutique hotels up to 25 rooms", text: "Your front desk stops repeating the Wi-Fi password all day and handles the guests in front of them." },
  { title: "Property managers", text: "One setup per property, one dashboard for every alert and every extra sold." },
];

export const differences = [
  {
    title: "Built by villa managers, not a software company",
    text: "Leona runs villas on the south coast. Every rule in the concierge comes from real guest calls: lockouts, airport runs, the Wi-Fi that stopped working at midnight.",
  },
  {
    title: "It talks. It doesn't just send menus",
    text: "No press 1, press 2. Guests speak normally and get a short, clear answer, like calling a friendly local host.",
  },
  {
    title: "It knows when to call you",
    text: "Every problem gets an urgency level. A dead keypad at night reaches you straight away; a request for towels waits until morning.",
  },
  {
    title: "It earns its keep",
    text: "Airport pickups, tours and late checkouts get offered at the right moment, and every confirmed extra lands in your dashboard with the total.",
  },
  {
    title: "Honest by design",
    text: "It tells guests it's a digital assistant. It never confirms a booking, discount or refund on its own, and never makes up an answer.",
  },
];

export type Plan = {
  name: string;
  forWho: string;
  price: string;
  low: string;
  setup: string;
  featured?: boolean;
  intro?: string;
  items: { text: string; soon?: boolean }[];
};

export const plans: Plan[] = [
  {
    name: "Essential",
    forWho: "Villas and guest houses, up to 6 rooms",
    price: "19,900",
    low: "14,900",
    setup: "30,000",
    items: [
      { text: "Voice concierge, 100 call minutes a month" },
      { text: "Answers in 11 languages" },
      { text: "Sinhala replies on WhatsApp", soon: true },
      { text: "1,000 WhatsApp replies a month", soon: true },
      { text: "Instant owner alerts, quiet at night" },
      { text: "Owner dashboard with every request" },
    ],
  },
  {
    name: "Signature",
    forWho: "Guest houses and villas, 5 to 12 rooms",
    price: "32,900",
    low: "24,700",
    setup: "40,000",
    featured: true,
    intro: "Everything in Essential, plus",
    items: [
      { text: "200 call minutes a month" },
      { text: "2,000 WhatsApp replies a month", soon: true },
      { text: "Sells extras: pickups, tours, late checkout" },
      { text: "Welcome, day-two and checkout messages", soon: true },
      { text: "Unhappy-guest warnings before they review" },
      { text: "Monthly report of extras earned" },
    ],
  },
  {
    name: "Estate",
    forWho: "Boutique hotels, 13 to 25 rooms",
    price: "59,900",
    low: "44,900",
    setup: "50,000",
    intro: "Everything in Signature, plus",
    items: [
      { text: "400 call minutes a month" },
      { text: "4,000 WhatsApp replies a month", soon: true },
      { text: "Your own local phone number" },
      { text: "Staff alerts for housekeeping" },
      { text: "Priority support, same-day changes" },
      { text: "Quarterly review with Leona" },
    ],
  },
];

export const faqs: [string, string][] = [
  [
    "Will guests know they're not talking to a person?",
    "Yes. It introduces itself as the villa's digital assistant, and if a guest asks, it says so plainly and offers to get someone from your team.",
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
    "With a QR code and link on the check-in card or in your welcome message. Estate includes a local phone number, and any plan can add one.",
  ],
  [
    "Can it take bookings or payments?",
    "No, on purpose. It takes the details of a booking enquiry and passes them to you. Bookings, discounts and refunds always stay your decision.",
  ],
  [
    "What if we use more than our minutes?",
    "Extra call minutes are Rs 65 each and extra WhatsApp replies Rs 20 each. We'll tell you before you get close, and you can move up a plan at any time.",
  ],
  [
    "What happens to guest calls and data?",
    "Conversations are kept for 60 days so you can review them, then deleted. We don't share them with anyone.",
  ],
];
