const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const filePath = path.join(process.cwd(), 'mood-board', 'mood-board.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle' });
  await page.pdf({
    path: path.join(process.cwd(), 'mood-board', 'mood-board.pdf'),
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });
  await browser.close();
  console.log('PDF generated successfully at mood-board/mood-board.pdf');
})();
