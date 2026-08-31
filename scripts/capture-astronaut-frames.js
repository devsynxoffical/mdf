/**
 * Lusion Astronaut 60FPS Retina Frame Extraction Pipeline
 * 
 * Captures ALL modules:
 * 1. Tablet with astronaut & Earth inside + "Become Immersive Experiences"
 * 2. Breakout into space
 * 3. Cyber Grid Tunnel plunge
 * 4. Neon Pink Kaleidoscope vortex
 * 5. Screen glass shatter
 * 6. Finale with smiling visor, floating pop stickers, and "Let's work together!"
 */

const CONFIG = {
  START_WHEEL: 38,
  TOTAL_SCROLL_WHEELS: 128,
  TOTAL_FRAMES: 90,
  VIEWPORT: {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1.5,
  },
  QUALITY: 92,
  OUTPUT_DIR: 'public/frames/lusion',
};

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('🚀 Starting Astronaut Frame Extractor...');
  console.log(`📐 Resolution: ${CONFIG.VIEWPORT.width * CONFIG.VIEWPORT.deviceScaleFactor}x${CONFIG.VIEWPORT.height * CONFIG.VIEWPORT.deviceScaleFactor}`);
  console.log(`🎯 Start: Wheel ${CONFIG.START_WHEEL} | Total Wheels: ${CONFIG.TOTAL_SCROLL_WHEELS} | Frames: ${CONFIG.TOTAL_FRAMES}`);

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: [
      '--no-sandbox',
      '--enable-webgl',
      '--use-gl=angle',
      '--use-angle=metal',
      `--window-size=${CONFIG.VIEWPORT.width},${CONFIG.VIEWPORT.height}`,
    ],
  });

  const page = await browser.newPage();
  await page.setViewport(CONFIG.VIEWPORT);

  console.log('🌐 Loading authentic WebGL engine from lusion.co...');
  await page.goto('https://lusion.co/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 4500));

  // Hide fixed navigation bars
  await page.evaluate(() => {
    ['header', '#menu', '.menu', '#cursor', '.cursor', 'nav'].forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => (el.style.display = 'none'));
    });
  });

  // Fast forward to Tablet start position
  console.log(`⏩ Navigating to Start Point (Wheel ${CONFIG.START_WHEEL})...`);
  for (let i = 0; i < CONFIG.START_WHEEL; i++) {
    await page.mouse.wheel({ deltaY: 200 });
    await new Promise((r) => setTimeout(r, 15));
  }
  await new Promise((r) => setTimeout(r, 1200));

  fs.mkdirSync(CONFIG.OUTPUT_DIR, { recursive: true });

  const totalDelta = CONFIG.TOTAL_SCROLL_WHEELS * 200;
  const deltaPerStep = totalDelta / (CONFIG.TOTAL_FRAMES - 1);
  const halfDelta = Math.round(deltaPerStep / 2);

  console.log(`📸 Capturing ${CONFIG.TOTAL_FRAMES} frames through ALL modules (Step Delta: ${deltaPerStep.toFixed(1)}px)...`);

  for (let i = 0; i < CONFIG.TOTAL_FRAMES; i++) {
    const pad = String(i).padStart(3, '0');
    const filePath = path.join(CONFIG.OUTPUT_DIR, `frame_${pad}.webp`);

    await page.screenshot({
      path: filePath,
      quality: CONFIG.QUALITY,
      type: 'webp',
    });

    // Send two gentle wheel pulses per frame so physics damping never skips modules
    await page.mouse.wheel({ deltaY: halfDelta });
    await new Promise((r) => setTimeout(r, 30));
    await page.mouse.wheel({ deltaY: deltaPerStep - halfDelta });
    await new Promise((r) => setTimeout(r, 80));

    if (i % 15 === 0 || i === CONFIG.TOTAL_FRAMES - 1) {
      console.log(`  ✓ Frame ${i + 1}/${CONFIG.TOTAL_FRAMES} saved.`);
    }
  }

  console.log('✨ All frames successfully extracted and saved to', CONFIG.OUTPUT_DIR);
  await browser.close();
})();
