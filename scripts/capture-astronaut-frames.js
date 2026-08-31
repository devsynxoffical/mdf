/**
 * Lusion Astronaut 60FPS Retina Frame Extraction Pipeline
 * 
 * You can run this anytime by typing:
 *   npm run capture-astronaut
 * 
 * To customize the start, end, resolution, or frame count, simply edit the CONFIG below:
 */

const CONFIG = {
  // 1. START POINT (Wheel events from the very top of Lusion.co):
  // 38 = Starts with the full 'Become Immersive Experiences' title + Tablet + Astronaut + Earth
  START_WHEEL: 38,

  // 2. SCROLL DISTANCE (How far to scroll through the full experience):
  // 146 = Travels all the way through Tablet -> Cyber Tunnel -> Kaleidoscope -> Glass Shatter -> Finale
  TOTAL_SCROLL_WHEELS: 146,

  // 3. TOTAL FRAMES (Higher = smoother scroll scrubbing):
  // 85 frames provides buttery smooth 60fps scrubbing with low file size (~3MB total)
  TOTAL_FRAMES: 85,

  // 4. RESOLUTION & RETINA CLARITY:
  // 1920x1080 with deviceScaleFactor: 2 captures ultra-sharp 2.8K Retina quality
  VIEWPORT: {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2,
  },

  // 5. WEBP COMPRESSION QUALITY (1 to 100):
  // 94 = Visually lossless, crystal clear textures and typography
  QUALITY: 94,

  // Destination folder:
  OUTPUT_DIR: 'public/frames/lusion',
};

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('🚀 Starting Astronaut Frame Extractor...');
  console.log(`📐 Resolution: ${CONFIG.VIEWPORT.width * CONFIG.VIEWPORT.deviceScaleFactor}x${CONFIG.VIEWPORT.height * CONFIG.VIEWPORT.deviceScaleFactor} (Retina 2x)`);
  console.log(`🎯 Start: Wheel ${CONFIG.START_WHEEL} | Total Distance: ${CONFIG.TOTAL_SCROLL_WHEELS} wheels | Frames: ${CONFIG.TOTAL_FRAMES}`);

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
  await page.goto('https://lusion.co/', { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 4500));

  // Hide fixed navigation bars, menus, and custom mouse cursors so only pure visuals are captured
  await page.evaluate(() => {
    ['header', '#menu', '.menu', '#cursor', '.cursor', 'nav'].forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => (el.style.display = 'none'));
    });
  });

  // Fast forward smoothly to the exact Tablet start position
  console.log(`⏩ Navigating to Start Point (Wheel ${CONFIG.START_WHEEL})...`);
  for (let i = 0; i < CONFIG.START_WHEEL; i++) {
    await page.mouse.wheel({ deltaY: 200 });
    await new Promise((r) => setTimeout(r, 18));
  }
  await new Promise((r) => setTimeout(r, 1200));

  fs.mkdirSync(CONFIG.OUTPUT_DIR, { recursive: true });

  // Calculate exact delta per step
  const stepDelta = (CONFIG.TOTAL_SCROLL_WHEELS * 200) / (CONFIG.TOTAL_FRAMES - 1);
  console.log(`📸 Capturing ${CONFIG.TOTAL_FRAMES} frames (Step Delta: ${stepDelta.toFixed(1)}px)...`);

  for (let i = 0; i < CONFIG.TOTAL_FRAMES; i++) {
    const pad = String(i).padStart(3, '0');
    const filePath = path.join(CONFIG.OUTPUT_DIR, `frame_${pad}.webp`);

    await page.screenshot({
      path: filePath,
      quality: CONFIG.QUALITY,
      type: 'webp',
    });

    // Advance wheel by step delta
    await page.mouse.wheel({ deltaY: stepDelta });
    await new Promise((r) => setTimeout(r, 90));

    if (i % 15 === 0 || i === CONFIG.TOTAL_FRAMES - 1) {
      console.log(`  ✓ Frame ${i + 1}/${CONFIG.TOTAL_FRAMES} saved.`);
    }
  }

  console.log('✨ All frames successfully extracted and saved to', CONFIG.OUTPUT_DIR);
  await browser.close();
})();
