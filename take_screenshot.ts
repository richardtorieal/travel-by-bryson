import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/Users/richardanderson/projects/.discord-bridge-screenshots/image_1780260856310.png' });
  await browser.close();
})();
