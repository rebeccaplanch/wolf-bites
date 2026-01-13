// Simple script to generate PWA icons
// Run with: node scripts/generate-icons.js
// Note: This requires a canvas library. For now, use the SVG and convert manually,
// or use an online tool like https://realfavicongenerator.net/

console.log(`
To generate PWA icons:

1. Use the SVG file at public/icon.svg
2. Convert to PNG using:
   - Online: https://realfavicongenerator.net/
   - Or: https://cloudconvert.com/svg-to-png
3. Create two sizes:
   - icon-192.png (192x192)
   - icon-512.png (512x512)
4. Save both files to the public/ directory

Alternatively, you can use the generate-icons.html file in public/ and use browser dev tools to download the canvas as PNG.
`);
