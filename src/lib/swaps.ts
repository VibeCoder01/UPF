import { Product } from "./api";

export function getSwapSuggestions(product: Product, allProducts: Product[]): Product[] {
    // Don't suggest swaps for items that are already good (NOVA 1)
    // or if the product has no categories to match against
    if (product.nova_group === 1 || !product.categories_tags || product.categories_tags.length === 0) {
        return [];
    }

    // Filter candidates:
    // 1. Must have a lower NOVA group (better health)
    // 2. Must not be the same product
    // 3. Must share at least one category tag
    const candidates = allProducts.filter(p =>
        p.nova_group < product.nova_group &&
        p.code !== product.code &&
        p.categories_tags &&
        p.categories_tags.some(tag => product.categories_tags.includes(tag))
    );

    // Score candidates based on category overlap
    // More matching tags = more similar product
    const scoredCandidates = candidates.map(p => {
        const overlap = p.categories_tags.filter(tag => product.categories_tags.includes(tag)).length;
        return { product: p, score: overlap };
    });

    // Sort by score (descending)
    // If scores are equal, prefer lower NOVA group
    scoredCandidates.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return a.product.nova_group - b.product.nova_group;
    });

    // Return top 3 suggestions
    return scoredCandidates.slice(0, 3).map(s => s.product);
}
