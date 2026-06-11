import { test, expect } from '@playwright/test';

test.describe('Bryson Travel - Robust Site Verification', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Logo Typography and Weighting', async ({ page }) => {
    const logoWrapper = page.locator('a[class*="logoWrapper"]');
    const logoText = logoWrapper.locator('div[class*="logoText"]');
    const logoSpan = logoText.locator('span');

    await expect(logoText).toBeVisible();
    
    // Verify Playfair Display font-family
    const fontFamily = await logoText.evaluate((el) => window.getComputedStyle(el).fontFamily);
    expect(fontFamily.toLowerCase()).toContain('playfair display');

    // Verify Weights: TRAVEL BY should be 400, BRYSON should be 800
    const textWeight = await logoText.evaluate((el) => window.getComputedStyle(el).fontWeight);
    const spanWeight = await logoSpan.evaluate((el) => window.getComputedStyle(el).fontWeight);
    
    expect(textWeight).toBe('400');
    expect(spanWeight).toBe('800');
  });

  test('Navbar Scroll Behavior', async ({ page }) => {
    const navbar = page.locator('nav');
    
    // Initial height
    const initialHeight = await navbar.evaluate((el) => el.getBoundingClientRect().height);
    
    // Ensure the page is tall enough to scroll
    await page.evaluate(() => {
      document.body.style.height = '2000px';
    });
    
    // Scroll down past the threshold (50px)
    await page.evaluate(() => window.scrollTo(0, 500));
    
    // Wait for the class to be applied and height to change
    await expect.poll(async () => {
      return await navbar.evaluate((el) => el.getBoundingClientRect().height);
    }, {
      message: 'Navbar height should decrease after scrolling',
      timeout: 5000,
    }).toBeLessThan(initialHeight);

    // Verify it has the scrolled class
    await expect(navbar).toHaveClass(/scrolled/);
  });

  test('Main Navigation Links', async ({ page }) => {
    const nav = page.locator('nav');
    
    const links = [
      { name: 'About', url: '/about' },
      { name: 'Packages', url: '/packages' },
      { name: 'Destinations', url: '/destinations' },
      { name: 'Contact', url: '/contact' }
    ];

    for (const link of links) {
      await nav.getByRole('link', { name: link.name, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(link.url));
      
      // Verify basic page content presence
      await expect(page.locator('main')).toBeVisible();
      await page.goto('/'); // Return for next link
    }
  });

  test('Contact Form Step-by-Step Flow', async ({ page }) => {
    await page.goto('/contact');
    
    // 1. Verify form is initially disabled
    const firstNameInput = page.locator('input[placeholder="Your first name"]');
    await expect(firstNameInput).toBeDisabled();

    // 2. Select a Service Tier
    const immersiveCard = page.locator('text=Immersive').first();
    await immersiveCard.click();

    // 3. Verify form is now enabled
    await expect(firstNameInput).toBeEnabled();

    // 4. Fill out the form
    await firstNameInput.fill('Test');
    await page.locator('input[placeholder="Your last name"]').fill('User');
    await page.locator('input[placeholder="Your email address"]').fill('test@example.com');
    await page.locator('input[placeholder="Destination or region"]').fill('Bora Bora');
    await page.locator('textarea[placeholder*="Tell us more"]').fill('Looking for a luxury escape.');

    // 5. Submit the form
    await page.getByRole('button', { name: /SEND INQUIRY/i }).click();

    // 6. Verify success message
    await expect(page.locator('text=Thank you for sharing your vision')).toBeVisible();
  });

  test('Mobile Menu and Responsiveness', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Desktop links should be hidden
    const desktopLinks = page.locator('div[class*="links"]').first();
    await expect(desktopLinks).not.toBeVisible();

    // Open Mobile Menu
    const mobileToggle = page.locator('nav button[class*="mobileToggle"]');
    await mobileToggle.click();

    // Verify links in mobile menu overlay
    const menuOverlay = page.locator('div[class*="overlay"][class*="open"]');
    await expect(menuOverlay).toBeVisible();
    await expect(menuOverlay.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(menuOverlay.getByRole('link', { name: 'Contact' })).toBeVisible();

    // Close menu by navigation
    await menuOverlay.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/\/about/);
  });

  test('Footer Content and Social Links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Brand text in footer
    const footerLogo = footer.locator('div[class*="logo"]').first();
    await expect(footerLogo).toContainText('BRYSON');

    // Links presence
    await expect(footer.getByRole('link', { name: 'About Bryson' })).toBeVisible();
    
    // Social links
    const instagramLink = footer.locator('a[href*="instagram.com"]');
    const emailLink = footer.locator('a[href*="mailto"]');
    
    await expect(instagramLink).toBeVisible();
    await expect(emailLink).toBeVisible();
  });

  test('Individual Page Content Verification', async ({ page }) => {
    // Home - Check for the VideoHero button as it lacks h1
    await expect(page.getByRole('link', { name: 'Plan Your Journey' })).toBeVisible();

    // About - Content check for Bryson
    await page.goto('/about');
    await expect(page.locator('h2').first()).toContainText('Bryson');

    // Packages - Heading contains Packages
    await page.goto('/packages');
    await expect(page.locator('h1').first()).toContainText('Packages');

    // Destinations - Heading contains Destinations
    await page.goto('/destinations');
    await expect(page.locator('h2').first()).toContainText('Destinations');
  });
});
