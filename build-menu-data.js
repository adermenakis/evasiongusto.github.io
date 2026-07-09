#!/usr/bin/env node

/**
 * Build menu-data.json + images/recipes/* from "recipe data/recipes.json".
 * The raw "recipe data/" folder is gitignored (1.2GB of source images); this
 * script is how its content gets turned into the small, committed subset the
 * menu page actually ships.
 *
 * Usage: node build-menu-data.js
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const RECIPES_JSON = './recipe data/recipes.json';
const SOURCE_IMAGES_DIR = './recipe data/recipe-images';
const OUTPUT_IMAGES_DIR = './images/recipes';
const OUTPUT_DATA_FILE = './menu-data.json';

const IMAGE_SIZE = 800; // source images are 1024x1024 square
const JPEG_QUALITY = 78;
const WEBP_QUALITY = 78;

// Fixed selection for this first pass (seed=42 over the full 250-recipe set).
// Replace with a curated list when one is supplied.
const SELECTED_IDS = [
    '2024-10-07__soupe-aux-lentilles',
    '2024-10-07__spaghetti-aux-scampis',
    '2024-10-14__joues-de-boeuf-a-la-grecque',
    '2024-11-18__dinde-sauce-estragon-et-moutarde',
    '2024-11-18__raviolis-maison-aux-champignons-et-fromage',
    '2024-11-25__crepes-sucrees-avec-cassonade',
    '2024-11-25__hachis-parmentier',
    '2024-12-16__raviolis-maison-au-fromage-et-cepes',
    '2025-03-01__houmous',
    '2025-03-01__pickles-de-navet-libanais',
    '2025-03-01__tzatziki',
    '2025-03-17__irish-stew-casserole',
    '2025-08-01__risotto-champignons-gwen',
    '2025-09-15__ragoût-déchine-de-porc-à-la-tomate-et-vin-rouge',
    '2025-11-16__jambonettes-de-poulet',
    '2025-11-23__cuisse-canard-confit-aux-morilles-et-fino',
    '2025-12-08__paella-aux-fruits-de-mer',
    '2026-01-19__paella',
    '2026-01-19__scampis-façon-saganaki-et-orzo',
    '2026-03-23__hautes-cuisses-de-poulet-au-jambon',
];

function extractRecipe(recipe) {
    return {
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        portions: recipe.portions,
        // Only include spiciness when the source actually has it - most
        // recipes don't, and the UI hides the badge rather than guessing.
        ...(typeof recipe.spiciness === 'number' ? { spiciness: recipe.spiciness } : {}),
        country: {
            name_fr: recipe.country_of_origin?.name_fr ?? null,
            name_en: recipe.country_of_origin?.name_en ?? null,
            iso_code: recipe.country_of_origin?.iso_code ?? null,
        },
        // Missing `allergens` key in the source means confirmed no allergens
        // (per business decision) - normalize to an explicit empty array so
        // the renderer doesn't need to distinguish "missing" from "checked".
        allergens: (recipe.allergens ?? []).map((a) => ({
            id: a.id,
            name_fr: a.name_fr,
            name_en: a.name_en,
        })),
        price_with_vat: recipe.pricing?.price_with_vat ?? null,
        images: {
            card: `images/recipes/${recipe.id}_1`,
            detail: `images/recipes/${recipe.id}_2`,
        },
    };
}

async function processImage(sourcePath, outputBasePath) {
    const buffer = await fs.readFile(sourcePath);
    const image = sharp(buffer).resize(IMAGE_SIZE, IMAGE_SIZE, { fit: 'cover' });

    await Promise.all([
        image.clone().jpeg({ quality: JPEG_QUALITY }).toFile(`${outputBasePath}.jpg`),
        image.clone().webp({ quality: WEBP_QUALITY }).toFile(`${outputBasePath}.webp`),
    ]);
}

async function main() {
    console.log('Building menu data...\n');

    const allRecipes = JSON.parse(await fs.readFile(RECIPES_JSON, 'utf8'));
    const byId = new Map(allRecipes.map((r) => [r.id, r]));

    const missing = SELECTED_IDS.filter((id) => !byId.has(id));
    if (missing.length > 0) {
        throw new Error(`Selected recipe IDs not found in recipes.json: ${missing.join(', ')}`);
    }

    await fs.mkdir(OUTPUT_IMAGES_DIR, { recursive: true });

    const menuData = [];
    for (const id of SELECTED_IDS) {
        const recipe = byId.get(id);
        console.log(`Processing: ${id}`);

        for (const suffix of ['_1', '_2']) {
            const sourcePath = path.join(SOURCE_IMAGES_DIR, `${id}${suffix}.jpg`);
            const outputBasePath = path.join(OUTPUT_IMAGES_DIR, `${id}${suffix}`);
            await processImage(sourcePath, outputBasePath);
        }

        menuData.push(extractRecipe(recipe));
    }

    await fs.writeFile(OUTPUT_DATA_FILE, JSON.stringify(menuData, null, 2), 'utf8');

    console.log(`\nWrote ${menuData.length} recipes to ${OUTPUT_DATA_FILE}`);
    console.log(`Wrote ${menuData.length * 2 * 2} image files to ${OUTPUT_IMAGES_DIR}`);
}

if (require.main === module) {
    main().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}

module.exports = { extractRecipe };
