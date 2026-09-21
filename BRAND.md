# Leona Properties — brand facts extracted from Figma

Source: `Travel Agency Website (Community) (Copy)`
File key `EcXlaSJ70PKykNKLPbR6C7` · **Frame 34 = node `1400:347`** · 1512 × 9261 px

## Colours (measured, not guessed)

| Token | Hex | Where it comes from |
|---|---|---|
| Forest green | `#1B4235` | Button fill and stats-card fill (vector export) |
| Gold | `#C9A96E` | Card border, GET ESTIMATE button, stat numerals |
| White | `#FFFFFF` | Frame fill, body text on green |
| Figma page bg | `#1E1E1E` | Canvas only — not a site colour |

Nav bar sits on a pale blue tint; sampled from the render rather than a token,
so treat it as approximate until confirmed.

## Type

**Montserrat** throughout — a free Google Font, so no licence files are needed.

- Body copy: Montserrat Medium, 15px, auto line-height
- Headline (`SRI LANKA'S PROPERTY CARE SPECIALISTS`): Montserrat Bold/ExtraBold,
  uppercase, tight leading
- File-level text styles defined but not consistently applied: `primary` 48/Auto,
  `secondary` 20/Auto

## Structure — important

Frame 34 is a **flat pile of absolutely-positioned layers**. No auto-layout, no
grouped sections, no components. Layer names are things like `Rectangle 77`,
`image 10`, `Untitled design (5) 2`. That means the design cannot be read as a
component tree and has to be rebuilt by eye against the full-resolution render.

Several image layers are named `20260313_1251_Image Generation_remix_…` and
`20260315_0010_Image Generation…` — parts of the art direction are AI-generated.
These are Devike's own assets, used as supplied.

## Hero — exact content

- Nav: `Our Services` · `About Us` — centred shield logo — `Login` · `Manage My Property`
- Wordmark: shield icon + `LEONA PROPERTIES`
- Headline: `SRI LANKA'S PROPERTY CARE SPECIALISTS`
- Green band: `How much can your rental earn?`
- Support line: `Most villa rental owners earn 30–40% less than they should be at
  the start. Find out what yours could make.`
- Calculator fields: `LOCATION` (select) · `PHONE` (+94 77 XXX XXXX) · `EMAIL`
  (you@example.com) · `GET ESTIMATE →` (gold)

## Stats card (sits over the poolside photo → becomes the video section)

`#1B4235` fill, `#C9A96E` 2px border, ~14px radius, gold numerals:

- `20+` Years of Hospitality Experience
- `40%` Revenue Uplift
- `100%` Transparent

## Assets on disk

`public/brand/img_01…img_20.png` — 20 source images from Frame 34 (capped by the
API; the frame has more). `public/brand/vec_1…vec_5.svg` — button shape plus
Instagram, Facebook and LinkedIn icons. The logo is raster, not vector, in this
frame.

Full-resolution reference render and 9 section slices are in the session
scratchpad under `f34/`.
