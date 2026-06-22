# Bryson Travel Tasks

## Completed
- **Navigation Update**: Removed "Packages" link from Navbar/MobileMenu and added "Travel Ideas".
- **Home Page Update**: Added `AboutMe` component to the Home page to fulfill requirements.
- **Review Card Refinement**: Simplified review cards to only show the author's name and quote (removed location/description).
- **Destinations Content Refinement**: Removed "Exclusive Perks" from all destinations to focus on the summary and insider tip.
- **Review Content Sync**: Updated `src/data/reviews.ts` with verbatim content from the provided text file (`1779589882334_Reviews_text_for_Bryson_website_.txt`).
- **Spec Sync**: Updated `bryson-travel-requirements.md` to match the current project state and new requests.
- **Refined Email Branding**: Increased card border radius to 16px and improved subject/body copy to align with luxury brand identity. (Note: Logo integration deferred until live).
- **Sample Payload Generation**: Created `sample-payload.json` with robust, realistic details for API testing.
- **Email Integration**: Integrated `nodemailer` to send contact form inquiries to `bryson.adams@fora.travel`.
- **Favicon Update**: Replaced `favicon.ico` with `icon.svg` (copied from `logo-mark.svg` with a square viewBox) to match the logo from the navbar.

## Open / Pending
- Fully merge the 'Services' and 'Contact' pages into a single intuitive flow (currently `/packages` and `/contact` still exist independently).
- Address any remaining Footer inconsistencies.
