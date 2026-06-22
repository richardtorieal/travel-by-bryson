import { test, expect } from '@playwright/test';

test.describe('TAR Bundle Integration Verification', () => {
  test('should load frames from como-frames.tar and render canvas', async ({ page }) => {
    let tarRequested = false;

    // Monitor network requests
    await page.route('**/*', async (route) => {
      const url = route.request().url();
      if (url.includes('como-frames.tar')) {
        tarRequested = true;
      }
      await route.continue();
    });

    await page.goto('/');
    
    // Wait for the canvas element to be fully loaded and opaque
    const canvas = page.locator('canvas');
    await expect(canvas).toHaveCSS('opacity', '1', { timeout: 10000 });

    // Verify that the tar request was made
    expect(tarRequested).toBe(true);

    // Scroll to trigger frame scrubbing
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(500);

    // Verify canvas internal resolution is configured matching source frames
    // We poll to ensure the image has been painted
    await expect.poll(async () => {
      const w = await canvas.evaluate((el) => el.width);
      const h = await canvas.evaluate((el) => el.height);
      return { w, h };
    }).toEqual({ w: 1280, h: 653 });
  });
});
