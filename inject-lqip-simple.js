#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// Note: menu.html's recipe cards are generated directly by
// inject-menu-cards.js, which embeds LQIPs itself - it doesn't go through
// this regex-based replacement (that pattern only worked historically
// because of embedded quotes in the original placeholder format).
const LQIP_DATA_FILE = './lqip-data.json';
const HTML_FILES = ['./index.html'];

async function injectIntoFile(htmlFile, lqipData) {
    let html;
    try {
        html = await fs.readFile(htmlFile, 'utf8');
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log(`⏭️  Skipping ${htmlFile} (not found)`);
            return;
        }
        throw err;
    }

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
            console.log(`✓ [${htmlFile}] ${imagePath}`);
            html = newHtml;
            count++;
        }
    });

    await fs.writeFile(htmlFile, html, 'utf8');
    console.log(`✅ Updated ${count} images in ${htmlFile}`);
}

async function main() {
    console.log('🔄 Injecting LQIPs into HTML (Simple Replacement)...\n');

    const lqipData = JSON.parse(await fs.readFile(LQIP_DATA_FILE, 'utf8'));

    for (const htmlFile of HTML_FILES) {
        await injectIntoFile(htmlFile, lqipData);
    }
}

main().catch(console.error);
