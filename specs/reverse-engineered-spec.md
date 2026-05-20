# Bryson Travel — Reverse Engineered Specification

## 1. Project Overview
**Bryson Travel** is a high-end, boutique luxury travel consultancy website. The platform is designed to showcase curated travel experiences, establish personal credibility ("About Me"), and capture qualified leads through a combined service-selection and inquiry flow.

## 2. Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS Modules
- **Animations**: Framer Motion (for modals and transitions)
- **CMS**: Tina CMS (Git-based, local markdown files)
- **Icons**: Lucide React
- **Deployment**: Vercel

## 3. Design System
- **Aesthetic**: Minimalist Luxury Editorial.
- **Typography**:
  - **Headings**: 'Playfair Display' (Serif)
  - **Body**: 'Montserrat' (Sans-serif)
- **Color Palette**:
  - **Primary**: Deep Dark Green (`#262E23`)
  - **Secondary**: Logo Green (`#3E4C39`)
  - **Accent**: Brown Gold (`#8D7C5E`)
  - **Background**: Cream (`#F2EDE3`)
- **Spacing**: Generous whitespace, calculated offsets for sticky elements.

## 4. Key Components & Pages

### 4.1 Navbar (Global)
- **Sticky Behavior**: Fixes to top on scroll.
- **Logo Transition**: Shrinks and scales down logo icon/text when scrolled or on non-home pages.
- **Responsive Navigation**:
  - **Desktop (>900px)**: Horizontal links with an "Inquire" button.
  - **Mobile (<900px)**: Hamburger menu triggering a sliding `MobileMenu` drawer.
- **Theme Support**: Dark/Light mode toggle (client-side state).

### 4.2 Home Page (`/`)
- **Video Hero**: High-resolution autoplaying video (Lake Como Dolly zoom) with a centered CTA.
- **Perks Grid**: Showcase of VIP treatment and exclusive partner access.
- **Testimonial Grid**: Social proof section displaying verified client experiences.
- **Schedule Call Section**: 2-column conversion section ("Ready to Begin" + "What to Expect").

### 4.3 Destinations Page (`/destinations`)
- **Portfolio Catalog**: A curated gallery of luxury destinations.
- **Dynamic Content**: Data is sourced from local Markdown files (`content/destinations/*.md`).
- **Interactive Experience**:
  - Clicking a destination card triggers a **Next.js Intercepted Route**.
  - Content appears in a **Parallel Route Modal Slot** (`@modal`).
  - **Animations**: Framer Motion "Scale Up" on entry, "Scale Down/Fade" on exit.
  - **Look**: Semi-transparent green blurred overlay over the gallery.
  - **Direct Hit**: Standalone full-page version of the destination for SEO and direct links.

### 4.4 Contact & Services (`/contact`)
- **Merged Flow**: Combines service package selection and lead capture.
- **Interaction**:
  1. User selects a Service Level (Quick Booking, Bespoke, Group).
  2. A context-aware contact form appears for details.

### 4.5 Content Management (Tina CMS)
- **Infrastructure**: All content lives in the repository as `.md` files.
- **Admin Dashboard**: Accessible at `/admin` (production) or via local dev server.
- **Schema**: Defines `destination` document type with fields for Name, Region, Hero Image, Insider Tips, and Perks.

## 5. SEO & Performance
- **Static Generation**: Uses `generateStaticParams` for destination pages.
- **Metadata**: Dynamic metadata for destination slugs.
- **Image Optimization**: Custom high-res assets served via local storage.

## 6. Business Logic
- **Conversion Goal**: Direct user to the "Contact" form or "Schedule a Call".
- **Lead Capture**: Form data is intended for email transmission (no local DB persistence for privacy).
- **VIP Perks**: Highlighted as a key value proposition throughout the site.
