#!/usr/bin/env node

/**
 * Generate static recipe card HTML + Menu JSON-LD from menu-data.json and
 * inject them into menu.html between marker comments. Cards are baked into
 * the raw HTML (not fetched/rendered client-side) so non-JS-executing
 * crawlers see the real recipe content, same reasoning as the rest of the
 * site's translated text living in the raw HTML rather than only in JS.
 *
 * Usage: node inject-menu-cards.js
 */

const fs = require('fs').promises;

const DATA_FILE = './menu-data.json';
const LQIP_DATA_FILE = './lqip-data.json';
const HTML_FILE = './menu.html';

const FALLBACK_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Crect width='800' height='800' fill='%23e0e0e0'/%3E%3C/svg%3E";

function buildLqipMap(lqipData) {
    const map = new Map();
    lqipData.forEach((item) => {
        map.set(item.original.replace(/^\.\//, ''), item.lqip);
    });
    return map;
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function isoToFlagEmoji(isoCode) {
    if (!isoCode || isoCode.length !== 2) return null;
    const codePoints = [...isoCode.toUpperCase()].map((c) => 0x1f1e6 + (c.charCodeAt(0) - 65));
    return String.fromCodePoint(...codePoints);
}

function formatPrice(priceWithVat) {
    if (typeof priceWithVat !== 'number') return null;
    return priceWithVat.toFixed(2).replace('.', ',');
}

function renderAllergens(allergens) {
    if (!allergens || allergens.length === 0) {
        return `<span class="allergen-tag no-allergens" data-fr="Aucun allergène identifié" data-en="No known allergens">Aucun allergène identifié</span>`;
    }
    return allergens
        .map((a) => `<span class="allergen-tag" data-fr="${escapeHtml(a.name_fr)}" data-en="${escapeHtml(a.name_en)}">${escapeHtml(a.name_fr)}</span>`)
        .join(', ');
}

function renderCard(recipe, lqipMap) {
    const flag = isoToFlagEmoji(recipe.country.iso_code);
    const countryLabel = flag
        ? `<span class="recipe-flag" aria-hidden="true">${flag}</span> <span data-fr="${escapeHtml(recipe.country.name_fr)}" data-en="${escapeHtml(recipe.country.name_en)}">${escapeHtml(recipe.country.name_fr)}</span>`
        : `<span data-fr="${escapeHtml(recipe.country.name_fr)}" data-en="${escapeHtml(recipe.country.name_en)}">${escapeHtml(recipe.country.name_fr)}</span>`;

    const price = formatPrice(recipe.price_with_vat);
    const priceHtml = price
        ? `<span class="recipe-price">${price} € <span data-key="perPortionLabel">/ portion</span></span>`
        : '';

    const spicinessHtml = typeof recipe.spiciness === 'number'
        ? `<span class="recipe-spiciness" aria-label="Spiciness level ${recipe.spiciness}/5">${'🌶️'.repeat(Math.min(recipe.spiciness, 5))}</span>`
        : '';

    const cardImg = `${recipe.images.card}.jpg`;
    const cardImgWebp = `${recipe.images.card}.webp`;
    const detailImgJpg = `${recipe.images.detail}.jpg`;
    const detailImgWebp = `${recipe.images.detail}.webp`;
    const lqip = lqipMap.get(cardImg) || FALLBACK_PLACEHOLDER;

    return `                    <article class="recipe-card">
                        <div class="recipe-card-image">
                            <picture>
                                <source data-srcset="${cardImgWebp}" type="image/webp">
                                <img src="${lqip}" data-src="${cardImg}" alt="${escapeHtml(recipe.name)}" width="800" height="800" class="lazy recipe-card-img" tabindex="0" role="button" aria-label="Agrandir la photo de ${escapeHtml(recipe.name)}" data-detail-jpg="${detailImgJpg}" data-detail-webp="${detailImgWebp}" data-detail-title="${escapeHtml(recipe.name)}">
                            </picture>
                        </div>
                        <div class="recipe-card-body">
                            <h3 class="recipe-title">${escapeHtml(recipe.name)}</h3>
                            <p class="recipe-description">${escapeHtml(recipe.description)}</p>
                            <div class="recipe-meta">
                                ${priceHtml}
                                <span class="recipe-portions"><span data-key="fromPortionsLabel">à partir de</span> ${recipe.portions} <span data-key="portionsLabel">portions</span></span>
                            </div>
                            <div class="recipe-badges">
                                <span class="recipe-country">${countryLabel}</span>
                                ${spicinessHtml}
                            </div>
                            <div class="recipe-allergens">
                                <strong data-key="allergensLabel">Allergènes :</strong>
                                ${renderAllergens(recipe.allergens)}
                            </div>
                        </div>
                    </article>`;
}

function renderJsonLd(recipes) {
    const menuItems = recipes.map((r) => ({
        '@type': 'MenuItem',
        name: r.name,
        description: r.description,
        image: `https://www.evasiongusto.be/${r.images.card}.jpg`,
        offers: {
            '@type': 'Offer',
            price: r.price_with_vat,
            priceCurrency: 'EUR',
        },
    }));

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Menu',
        name: 'Menu Évasion Gusto',
        hasMenuItem: menuItems,
    };

    return `    <script type="application/ld+json">\n    ${JSON.stringify(jsonLd, null, 4).split('\n').join('\n    ')}\n    </script>`;
}

function replaceBetweenMarkers(html, startMarker, endMarker, content) {
    const pattern = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`);
    if (!pattern.test(html)) {
        throw new Error(`Markers not found: ${startMarker} / ${endMarker}`);
    }
    return html.replace(pattern, `${startMarker}\n${content}\n${endMarker}`);
}

async function main() {
    console.log('Injecting recipe cards + Menu JSON-LD into menu.html...\n');

    const recipes = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
    const lqipData = JSON.parse(await fs.readFile(LQIP_DATA_FILE, 'utf8'));
    const lqipMap = buildLqipMap(lqipData);
    let html = await fs.readFile(HTML_FILE, 'utf8');

    const cardsHtml = recipes.map((r) => renderCard(r, lqipMap)).join('\n');
    html = replaceBetweenMarkers(html, '<!-- RECIPE_CARDS_START -->', '<!-- RECIPE_CARDS_END -->', cardsHtml);

    const jsonLdHtml = renderJsonLd(recipes);
    html = replaceBetweenMarkers(html, '<!-- MENU_JSONLD_START -->', '<!-- MENU_JSONLD_END -->', jsonLdHtml);

    await fs.writeFile(HTML_FILE, html, 'utf8');

    console.log(`Injected ${recipes.length} recipe cards and Menu JSON-LD into ${HTML_FILE}`);
}

if (require.main === module) {
    main().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}

module.exports = { isoToFlagEmoji, formatPrice, renderAllergens, escapeHtml };
