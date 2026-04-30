# Luxury Plan Fixes Specification

## 1. Travel Ideas Visuals
- **Requirement**: All travel idea cards on the main page MUST display a relevant preview image.
- **Implementation**: 
  - `BlogPost` data structure includes an `image` field.
  - `TravelIdeasGrid` component renders an `Image` component when an image is available.
- **Verification**: `tests/luxury-plan-fixes.spec.ts` -> "main page should have travel ideas with images"

## 2. Dynamic Routing Reliability
- **Requirement**: Links to travel ideas MUST NOT lead to a 404 error page.
- **Implementation**: 
  - Dynamic route parameters in `src/app/travel-ideas/[slug]/page.tsx` are handled asynchronously using `await params`.
- **Verification**: `tests/luxury-plan-fixes.spec.ts` -> "london museum guide link should not 404"

## 3. Error Page Accessibility (Contrast)
- **Requirement**: The 404 "Not Found" page MUST have high text contrast for readability.
- **Implementation**: 
  - Custom `src/app/not-found.tsx` page uses `$color-primary` (#1A2B3C) for text on a white background.
- **Verification**: `tests/luxury-plan-fixes.spec.ts` -> "404 page should have high contrast"
