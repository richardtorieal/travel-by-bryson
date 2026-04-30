import { test, expect } from '@playwright/test';

test.describe('Luxury Plan Fixes', () => {
  test('main page should have travel ideas with images', async ({ page }) => {
    await page.goto('/');
    
    // Check if the Travel Ideas section exists
    const travelIdeasSection = page.locator('h2:has-text("Travel Ideas")');
    await expect(travelIdeasSection).toBeVisible();
    
    // Check if the London museum guide card has an image
    const londonGuideCard = page.locator('a:has-text("5 Museums in London")');
    await expect(londonGuideCard).toBeVisible();
    
    const image = londonGuideCard.locator('img');
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('src', /london-museums-hero/);
  });

  test('london museum guide link should not 404', async ({ page }) => {
    await page.goto('/');
    
    const londonGuideLink = page.locator('a:has-text("5 Museums in London")');
    await londonGuideLink.click();
    
    // Should be on the travel ideas page
    await expect(page).toHaveURL(/\/travel-ideas\/5-museums-in-london-for-families/);
    
    // Content should be visible (not 404)
    const title = page.locator('h1');
    await expect(title).toHaveText(/5 Museums in London/);
    
    // Check if the image is also on the blog post page
    const image = page.locator('img');
    await expect(image).toBeVisible();
  });

  test('404 page should have high contrast', async ({ page }) => {
    // Navigate to a non-existent page
    await page.goto('/non-existent-page');
    
    // Check if 404 text is visible
    const errorText = page.locator('h1:has-text("404")');
    await expect(errorText).toBeVisible();
    
    // Check for high contrast (text color vs background)
    // Primary color is #1A2B3C
    const color = await errorText.evaluate(el => window.getComputedStyle(el).color);
    expect(color).toBe('rgb(26, 43, 60)'); // #1A2B3C
  });
});
