const { extractRecipe } = require('./build-menu-data');
const { isoToFlagEmoji, formatPrice, renderAllergens, escapeHtml } = require('./inject-menu-cards');

describe('build-menu-data: extractRecipe', () => {
    const baseRecipe = {
        id: '2024-01-01__test-recipe',
        name: 'Recette Test',
        description: 'Une description de test.',
        portions: 6,
        country_of_origin: { name_fr: 'Grèce', name_en: 'Greece', iso_code: 'GR' },
        pricing: { price_with_vat: 8.5 },
    };

    test('reads price from pricing.price_with_vat', () => {
        const result = extractRecipe(baseRecipe);
        expect(result.price_with_vat).toBe(8.5);
    });

    test('omits spiciness key entirely when source has no spiciness', () => {
        const result = extractRecipe(baseRecipe);
        expect(result).not.toHaveProperty('spiciness');
    });

    test('includes spiciness when present on the source recipe', () => {
        const result = extractRecipe({ ...baseRecipe, spiciness: 4 });
        expect(result.spiciness).toBe(4);
    });

    test('normalizes missing allergens key to an empty array (confirmed no allergens)', () => {
        const result = extractRecipe(baseRecipe);
        expect(result.allergens).toEqual([]);
    });

    test('maps present allergens to id/name_fr/name_en only', () => {
        const recipe = {
            ...baseRecipe,
            allergens: [
                { id: 'milk', name_fr: 'Lait', name_en: 'Milk', confidence: 1, sources: ['Feta'] },
            ],
        };
        const result = extractRecipe(recipe);
        expect(result.allergens).toEqual([{ id: 'milk', name_fr: 'Lait', name_en: 'Milk' }]);
    });

    test('handles a null iso_code (region rather than country)', () => {
        const recipe = {
            ...baseRecipe,
            country_of_origin: { name_fr: 'Méditerranée', name_en: 'Mediterranean', iso_code: null },
        };
        const result = extractRecipe(recipe);
        expect(result.country.iso_code).toBeNull();
    });

    test('builds card/detail image path stems from the recipe id', () => {
        const result = extractRecipe(baseRecipe);
        expect(result.images.card).toBe('images/recipes/2024-01-01__test-recipe_1');
        expect(result.images.detail).toBe('images/recipes/2024-01-01__test-recipe_2');
    });
});

describe('inject-menu-cards: isoToFlagEmoji', () => {
    test('converts a 2-letter ISO code to a regional indicator flag emoji', () => {
        expect(isoToFlagEmoji('BE')).toBe('🇧🇪');
        expect(isoToFlagEmoji('GR')).toBe('🇬🇷');
    });

    test('returns null for a missing/null iso_code', () => {
        expect(isoToFlagEmoji(null)).toBeNull();
        expect(isoToFlagEmoji(undefined)).toBeNull();
    });
});

describe('inject-menu-cards: formatPrice', () => {
    test('formats with a comma decimal separator (Belgian French convention)', () => {
        expect(formatPrice(8.003)).toBe('8,00');
        expect(formatPrice(11.9992)).toBe('12,00');
    });

    test('returns null when price is missing', () => {
        expect(formatPrice(null)).toBeNull();
        expect(formatPrice(undefined)).toBeNull();
    });
});

describe('inject-menu-cards: renderAllergens', () => {
    test('renders an explicit "no known allergens" note when the array is empty', () => {
        const html = renderAllergens([]);
        expect(html).toContain('Aucun allergène identifié');
        expect(html).toContain('data-en="No known allergens"');
    });

    test('renders each allergen with bilingual data attributes', () => {
        const html = renderAllergens([{ id: 'milk', name_fr: 'Lait', name_en: 'Milk' }]);
        expect(html).toContain('data-fr="Lait"');
        expect(html).toContain('data-en="Milk"');
    });
});

describe('inject-menu-cards: escapeHtml', () => {
    test('escapes HTML-significant characters', () => {
        expect(escapeHtml(`Beef & "cheese" <sauce>`)).toBe('Beef &amp; &quot;cheese&quot; &lt;sauce&gt;');
    });
});
