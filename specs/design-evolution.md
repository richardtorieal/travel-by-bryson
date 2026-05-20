# Design Evolution Specification: "The Guiders" Influence

Based on the reference design, we will evolve the Bryson Travel aesthetic towards a more minimalist, high-contrast, and typographically elegant experience.

## 1. Typography
- **Headings**: Use a mix of `Montserrat` (Bold) and `Playfair Display` (Italic).
  - Pattern: `[Sans-Serif Bold] [Serif Italic] [Sans-Serif Bold]`
  - Example: "The New *Standard* of Bespoke Travel"
- **Body**: `Montserrat` for readability.
- **Letter Spacing**: Slightly tighter for headings, slightly open for subtitles.

## 2. Color Palette
- **Primary**: `#1A1A1A` (Deep Charcoal) - replacing `#1A2B3C` for a sharper look.
- **Accent**: `#D4AF37` (Existing gold) - use sparingly for icons and small underlines.
- **Background**: `#FFFFFF` (Pure White) and `#F9F9F9` (Soft Grey).

## 3. UI Components
- **Buttons**: All primary buttons must be pill-shaped (`border-radius: 999px`) with solid black background and white text.
- **Navbar**: Must be `sticky` (fixed) at the top of the viewport at all times. It should transition from transparent to a solid background with a refined shadow upon scrolling.
- **Cards**: Minimalist cards with soft shadows and refined padding.
- **Tags**: Pill-shaped outlines with small icons.
- **Stats Section**: Focus on bold numbers (e.g., "98%") with small labels.

## 4. Contact Page Evolution
- Re-organize the layout so that form fields and the submit button appear above the email and Instagram sections.
- Use modern icons (from lucide-react) for Email and Instagram to match the theme.
- Ensure the Email section performs a `mailto:` redirect when clicked.
- Ensure the Instagram section redirects to the actual Instagram page when clicked.

## 5. Hero Section Evolution
- Move from the current left-aligned video hero to a centered, high-impact image/video hero.
- Use a refined overlay to ensure text readability while maintaining image vibrancy.
- **Hero Button**: Use a complimentary "Glassmorphism" or soft-toned style that integrates with the hero imagery rather than high-contrast black.
- **Scroll-Synced Video**: The hero features a high-quality video (Santorini boat trimmed) that progresses frame-by-frame based on the user's scroll position for a premium, cinematic feel.

## 6. Spacing
- Increase vertical padding between sections to `$spacing-xl` (8rem) or more to emphasize luxury through whitespace.
- Tighter internal spacing for content blocks to create "clusters" of information.

## 7. Animations
- **Perks Section Headline**: The headline "The New Standard of Bespoke Travel" smoothly fades in and translates upwards with a modern ease animation each time it is scrolled into view (re-triggering on scroll up/down).

## Implementation Tasks
1. Update `_variables.scss` with new colors and refined spacing.
2. Create/Update `Button` atom to support the pill shape.
3. Update `Hero` component for centered elegant layout.
4. Refactor `PerksGrid` into a `StatsSection` matching the reference.
5. Apply the "mixed heading" style across all organism titles.
