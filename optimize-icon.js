const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Input and output paths
const inputPath = path.join(__dirname, 'public', 'Untitled design.png');
const outputDir = path.join(__dirname, 'public', 'assets', 'icons');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Icon sizes for different uses
const sizes = [16, 32, 48, 64, 128, 256, 512];

// Process the image with different optimizations
async function processImage() {
  try {
    // Get the original image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log('Original image:', metadata);

    // Base optimization for main image
    await sharp(inputPath)
      .resize(512, 512, { 
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
      })
      .png({ 
        quality: 90,
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: true
      })
      .toFile(path.join(outputDir, 'brain-card-optimized.png'));
    
    console.log('Created optimized main icon');

    // Create rounded version with drop shadow
    await sharp(inputPath)
      .resize(512, 512, { 
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .composite([{
        input: Buffer.from(
          `<svg><filter id="shadow"><feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3" /></filter><rect x="0" y="0" width="512" height="512" rx="120" ry="120" fill="none" stroke="none" filter="url(#shadow)"/></svg>`
        ),
        blend: 'over'
      }])
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'brain-card-rounded.png'));
    
    console.log('Created rounded version with shadow');

    // Create various sized versions
    for (const size of sizes) {
      await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({ quality: 90 })
        .toFile(path.join(outputDir, `brain-card-${size}.png`));
      
      console.log(`Created ${size}x${size} icon`);
    }

    // Create favicon version (using PNG format instead of ICO)
    await sharp(inputPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(outputDir, 'favicon.png'));
    
    console.log('Created favicon');

    // Create version with enhanced colors
    await sharp(inputPath)
      .resize(512, 512, { 
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .modulate({
        brightness: 1.05,
        saturation: 1.2
      })
      .sharpen()
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'brain-card-enhanced.png'));
    
    console.log('Created color-enhanced version');

    // Create a flat minimalist version
    await sharp(inputPath)
      .resize(512, 512, { 
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      // Reduce colors for a more minimalist look
      .flatten({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .normalize()
      .sharpen()
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'brain-card-flat.png'));
    
    console.log('Created flat minimalist version');

    // Create a square version with padding
    await sharp(inputPath)
      .resize(460, 460, { 
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .extend({
        top: 26,
        bottom: 26,
        left: 26,
        right: 26,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'brain-card-square.png'));
    
    console.log('Created square version with padding');

    console.log('All optimizations completed successfully!');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processImage(); 