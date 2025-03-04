const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

const SOURCE_LOGO = path.join(process.cwd(), 'public', 'branding', 'logo_bgrem.png');

// Define all the sizes we need
const LOGO_SIZES = {
  favicons: [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' },
  ],
  social: [
    { width: 200, height: 200, name: 'logo-social-small.png' },
    { width: 400, height: 400, name: 'logo-social.png' },
    { width: 1200, height: 630, name: 'logo-og-image.png' },
    { width: 1500, height: 500, name: 'logo-social-banner.png' },
  ],
  ui: [
    { width: 24, height: 24, name: 'logo-nav-small.png' },
    { width: 40, height: 40, name: 'logo-nav.png' },
    { width: 120, height: 40, name: 'logo-header.png' },
    { width: 200, height: 60, name: 'logo-header-large.png' },
    { width: 250, height: 250, name: 'logo-marketing.png' },
  ],
};

async function generateLogos() {
  try {
    // Read the source image
    const sourceImage = sharp(SOURCE_LOGO);
    
    // Process favicons (square)
    for (const { size, name } of LOGO_SIZES.favicons) {
      await sourceImage
        .clone()
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .toFile(path.join(process.cwd(), 'public', 'branding', 'favicons', name));
      console.log(`Generated: ${name}`);
    }

    // Process social media images
    for (const { width, height, name } of LOGO_SIZES.social) {
      await sourceImage
        .clone()
        .resize(width, height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .toFile(path.join(process.cwd(), 'public', 'branding', 'social', name));
      console.log(`Generated: ${name}`);
    }

    // Process UI images
    for (const { width, height, name } of LOGO_SIZES.ui) {
      await sourceImage
        .clone()
        .resize(width, height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .toFile(path.join(process.cwd(), 'public', 'branding', 'ui', name));
      console.log(`Generated: ${name}`);
    }

    console.log('All logos generated successfully!');
  } catch (error) {
    console.error('Error generating logos:', error);
  }
}

generateLogos(); 