#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

const LQIP_DATA_FILE = './lqip-data.json';
const HTML_FILE = './index.html';

async function main() {
    console.log('🔄 Injecting LQIPs into HTML (Simple Replacement)...\n');

    // Load LQIP data
    const lqipData = JSON.parse(await fs.readFile(LQIP_DATA_FILE, 'utf8'));

    // Create map
    const lqipMap = new Map();
    lqipData.forEach(item => {
        const filename = path.basename(item.original);
        lqipMap.set(filename, item.lqip);
    });

    // Load HTML
    let html = await fs.readFile(HTML_FILE, 'utf8');

    let count = 0;

    // Just do a global search and replace for each image path
    lqipData.forEach(item => {
        const imagePath = item.original;
        const lqip = item.lqip;

        // Find pattern: src="...svg..." data-src="images/path/to/image.jpg"
        // Replace the src value with LQIP
        const pattern = new RegExp(
            `(src=")data:image/svg\\+xml[^"]*"([^"]*"[^>]*data-src="${imagePath.replace(/\//g, '\\/')}")`,
            'g'
        );

        const replacement = `$1${lqip}"$2`;

        const newHtml = html.replace(pattern, replacement);
        if (newHtml !== html) {
            console.log(`✓ ${imagePath}`);
            html = newHtml;
            count++;
        }
    });

    // Save
    await fs.writeFile(HTML_FILE, html, 'utf8');

    console.log(`\n✅ Updated ${count} images with LQIPs`);
}

main().catch(console.error);
