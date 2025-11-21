import { Product } from "./api";

export interface DataQualityResult {
    score: number;
    grade: 'A' | 'B' | 'C' | 'D';
    missingFields: string[];
}

export function calculateDataQuality(product: Product): DataQualityResult {
    let score = 0;
    const missingFields: string[] = [];

    // Basic Info (20 points)
    if (product.product_name) score += 10; else missingFields.push("Product Name");
    if (product.brands) score += 10; else missingFields.push("Brand");

    // Visuals (20 points)
    if (product.image_url) score += 20; else missingFields.push("Image");

    // Ingredients (20 points)
    if (product.ingredients_text) score += 20; else missingFields.push("Ingredients");

    // Nutrition (25 points)
    if (product.nutriments) {
        if (product.nutriments["energy-kcal_100g"] !== undefined) score += 5; else missingFields.push("Energy");
        if (product.nutriments.fat_100g !== undefined) score += 5; else missingFields.push("Fat");
        if (product.nutriments.sugars_100g !== undefined) score += 5; else missingFields.push("Sugars");
        if (product.nutriments.salt_100g !== undefined) score += 5; else missingFields.push("Salt");
        if (product.nutriments.proteins_100g !== undefined) score += 5; else missingFields.push("Proteins");
    } else {
        missingFields.push("Nutrition Data");
    }

    // Classification (15 points)
    if (product.nova_group) score += 10; else missingFields.push("NOVA Group");
    if (product.nutriscore_grade) score += 5; else missingFields.push("Nutri-Score");

    // Determine Grade
    let grade: 'A' | 'B' | 'C' | 'D';
    if (score >= 90) grade = 'A';
    else if (score >= 70) grade = 'B';
    else if (score >= 50) grade = 'C';
    else grade = 'D';

    return { score, grade, missingFields };
}
