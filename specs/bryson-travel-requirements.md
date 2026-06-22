# Bryson Travel: Functional and Non-Functional Requirements

This specification document outlines the requirements for the Bryson Travel website evolution, based on client feedback and strategic design goals.

## 1. Functional Requirements

### 1.1 Content & Layout
- **About Me Section**: [COMPLETED]
  - Integrated a dedicated "About Me" section on the Home page with verbatim content from Fora profile.
  - Utilizes profile picture from assets.
- **Reviews Section Refinement**:
  - Display exactly 3 primary reviews on the Home page.
  - **REMOVED**: The "See All Reviews" button and the corresponding review modal are no longer required.
  - **NEW**: Review cards should only display the author's name and their quote.
  - **NEW: Advanced Card Interactivity**:
    - **Vertical Centering**: The entire card content (Reviewer Name, Stars, Quote, and Read More button) must be perfectly vertically centered within the card.
    - **Header Spacing**: Significantly reduce the vertical space between the reviewer name/stars and the beginning of the quote.
    - **Smooth Expansion**: When "Read More" is clicked, the card must expand downwards to reveal the full text using a smooth `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out) transition. Clicking again (or a "Read Less" state) must collapse it.
    - **Layout Integrity**: Expanded cards must **never** overlap with the pagination indicators or any content below. The layout must "push" subsequent elements down dynamically.
    - **Auto-Collapse**: Any expanded card must automatically and smoothly collapse when the user swiped or clicked to a different card in the carousel.
- **Destinations Content Refinement**:
  - **NEW**: Remove "Exclusive Perks" from destination summaries. Each destination should only show the summary and the "Insider Tip".
- **Combined Services & Contact Experience**:
  - The "Services" and "Contact" pages must be merged into a single, intuitive flow (accessible via the "Contact" link in navigation).
  - **Sequence**:
    1. **Service Package Selection**: A single-select component presenting the three tiers (Quick Booking, Bespoke, Group/Corporate).
    2. **Contact Form**: Appears directly beneath the selection, pre-populated or contextually aware of the selected package.
- **Navigation & Call to Action**:
  - Update all "Book Now" buttons to "Contact".
  - Ensure the "Contact" link in the Navbar points to the new combined Services/Contact page.
- **Footer Cleanup**:
  - Remove the "Ready to Begin" (ScheduleSection) from the new combined Services/Contact page to avoid redundancy with the main form.
  - Retain the "Ready to Begin" + "What to Expect" 2-column layout on the Home page and other relevant sub-pages.
- **Destinations Page**:
  - Maintain the existing Destinations page for future expansion (personal recommendations and past trip summaries).
- **Travel Ideas (Blog)**:
  - **RELOCATED**: Remove the "Travel Ideas" grid from the Home page.
  - Move to a dedicated "/travel-ideas" page and add a link to the main navigation menu.

- **Content Management System (CMS)**:
  - Implement **Tina CMS** for managing destination content.
  - All destination data must be stored as local Markdown files in `content/destinations/`.
  - Admin dashboard accessible at `/admin` for non-technical content management.

- **High-Performance Destination View**:
  - Destinations should open in an **Intercepted Modal** over the gallery on Desktop.
  - Support full **Framer Motion** entry and exit animations.
  - Fallback to full-page view for direct URL access and mobile devices.

### 1.2 Form Requirements
- **Package Selection**: Must be a "select exactly one" interaction.
- **Contact Form Fields**: 
  - First Name
  - Last Name
  - Email Address
  - **NEW**: Destination / Area of Interest
  - **NEW**: Interests (Hotels & Resorts, Cruises, Tours & Experiences, Transportation)
  - Message / Details

## 2. Non-Functional Requirements

### 2.1 Design & Brand
- **Visual Identity**: Strictly adhere to logos, color hex codes, and fonts provided by Bryson (placeholders currently in use: Deep Charcoal #1A1A1A, Gold #D4AF37, Playfair Display/Montserrat fonts).
- **Editorial Aesthetic**: Maintain the high-end, minimalist editorial look-and-feel (large whitespace, refined typography).
- **Responsiveness**: The new combined flow must be fully responsive, ensuring the package selection and form are easy to use on mobile devices.

### 2.2 Integration & Performance
- **Email Notifications**: [REFINED]
  - Form submissions trigger an email notification to Bryson (`bryson.adams@fora.travel`) using `nodemailer` via a Next.js API route.
  - **Brand Alignment**: Subject line and body copy use evocative, professional language ("New Journey Inquiry") rather than system-style messages.
  - **Visual Consistency**:
    - Card border radius increased to **16px** to match the website's primary UI components.
    - Responsive layout with refined typography (Playfair Display for headings).
    - *Note: Logo addition deferred until production URL is established.*
- **Privacy & Security**: 
  - No persistence of user data on the server; form data is transmitted via email only.
  - Privacy Policy must accurately reflect this lack of data persistence.
- **Copyright**: All images must be verified for copyright compliance.

### 2.3 Developer Reference: Sample Payload
For testing the Contact API, use the following robust payload structure:

```bash
curl -X POST http://localhost:3000/api/contact \
-H "Content-Type: application/json" \
-d '{
  "firstName": "Alexander",
  "lastName": "Vanderbilt",
  "email": "alex.vanderbilt@example.com",
  "phone": "+1 (555) 123-4567",
  "contactMethod": "email",
  "destination": "Amalfi Coast & Puglia, Italy",
  "selectedTier": "Bespoke",
  "interests": ["Hotels & Resorts", "Tours & Experiences", "Transportation"],
  "details": "We are looking to plan a 10-day anniversary trip in late September. Interested in staying at Belmond Hotel Caruso in Ravello and then exploring the trulli of Alberobello. We love wine tastings, private boat tours, and authentic culinary experiences. High-end luxury is a priority."
}'
```

### 2.3 Nice to Have (Future Iterations)
- **Calendly Integration**: A direct link or embedded widget for Bryson's work calendar to facilitate discovery calls.
- **Enhanced Destinations**: Dynamic recommendations and client trip case studies.

## 2.4 Performance & Scroll Animation Caching [NEW]
- **Scroll-Driven Video Performance**:
  - The home page's scroll-driven Dolly Zoom video sequence must not trigger network requests during scrolling.
  - **Memory Preloading**: All 144 image frames (`frame_001.jpg` to `frame_144.jpg`) must be preloaded once as `HTMLImageElement` instances in JavaScript when the component mounts.
  - **Canvas Rendering**: Use an HTML5 `<canvas>` element for rendering the frames rather than dynamically changing the `src` attribute of an `<img>` element.
  - **Fluid 60 FPS playback**: Update the canvas using `ctx.drawImage` in the frame-change scroll handler. This completely avoids browser layout thrashing and aborted network requests, providing a smooth user experience.
  - **Frame Bundling (Single Request)**:
    - All 144 image files are compiled into a single uncompressed TAR archive (`public/assets/como-frames.tar`) during the build process (`prebuild` / `predev` scripting hook).
    - The client-side application downloads this TAR file in a single request and decodes the files dynamically in memory using a custom TAR parser method.
    - Object URLs are dynamically mapped to the preloaded `HTMLImageElement` instances.
    - Provides fallback individual request preloading in the event of a network or parsing failure.


