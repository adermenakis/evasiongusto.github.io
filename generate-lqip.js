#!/usr/bin/env node

/**
 * Generate Low-Quality Image Placeholders (LQIP)
 * This script generates tiny, blurred versions of images for progressive loading
 *
 * Usage: node generate-lqip.js
 *
 * Requirements: npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const IMAGE_DIRS = [
    './images/gallery',
    './images/services'
];

const LQIP_WIDTH = 20; // Very small width for LQIP
const LQIP_QUALITY = 20; // Low quality for smaller file size

async function generateLQIP(imagePath) {
    try {
        const ext = path.extname(imagePath).toLowerCase();

        // Only process jpg, jpeg, png, webp
        if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
            return null;
        }

        console.log(`Processing: ${imagePath}`);

        // Generate LQIP
        const buffer = await sharp(imagePath)
            .resize(LQIP_WIDTH, null, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .blur(2)
            .jpeg({ quality: LQIP_QUALITY })
            .toBuffer();

        // Convert to base64 data URI
        const base64 = buffer.toString('base64');
        const dataUri = `data:image/jpeg;base64,${base64}`;

        return {
            original: imagePath,
            lqip: dataUri,
            size: buffer.length
        };
    } catch (error) {
        console.error(`Error processing ${imagePath}:`, error.message);
        return null;
    }
}

async function processDirectory(dir) {
    const results = [];

    try {
        const files = await fs.readdir(dir);

        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = await fs.stat(filePath);

            if (stat.isFile()) {
                const result = await generateLQIP(filePath);
                if (result) {
                    results.push(result);
                }
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error.message);
    }

    return results;
}

async function main() {
    console.log('🖼️  Generating Low-Quality Image Placeholders...\n');

    const allResults = [];

    for (const dir of IMAGE_DIRS) {
        console.log(`\n📁 Processing directory: ${dir}`);
        const results = await processDirectory(dir);
        allResults.push(...results);
    }

    // Save results to JSON file
    const outputPath = './lqip-data.json';
    await fs.writeFile(
        outputPath,
        JSON.stringify(allResults, null, 2),
        'utf8'
    );

    console.log(`\n✅ Generated ${allResults.length} LQIPs`);
    console.log(`📄 Saved to: ${outputPath}`);

    // Calculate total size
    const totalSize = allResults.reduce((sum, r) => sum + r.size, 0);
    console.log(`💾 Total LQIP size: ${(totalSize / 1024).toFixed(2)} KB`);
}

main().catch(console.error);
