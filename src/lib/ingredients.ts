export interface IngredientAnalysis {
    isUpf: boolean;
    redFlags: string[];
    additives: string[];
}

const UPF_MARKERS = [
    "high fructose corn syrup",
    "glucose-fructose syrup",
    "hydrogenated",
    "interesterified",
    "hydrolyzed",
    "maltodextrin",
    "dextrose",
    "invert sugar",
    "modified starch",
    "soy protein isolate",
    "whey protein isolate",
    "flavor enhancer",
    "flavour enhancer",
    "artificial flavor",
    "artificial flavour",
    "color",
    "colour",
    "emulsifier",
    "thickener",
    "sweetener",
    "preservative",
    "stabilizer",
    "gelling agent",
    "glazing agent",
    "foaming agent",
    "bulking agent",
    "carbonating agent",
    "firming agent",
    "humectant",
    "sequesterant",
    "palm oil", // Often refined/processed
    "huile de palme",
    "rapeseed oil", // Often refined
    "colza oil",
    "huile de colza",
    "sunflower oil", // Often refined
    "huile de tournesol",
    "coconut oil",
    "huile de coco",
    "shea butter",
    "beurre de karité",
    "glucose syrup",
    "sirop de glucose",
    "sugar", // High sugar content is a flag, though not always UPF, but in context of additives it helps
    "sucre",
    "vanillin",
    "vanilline",
    "lecithin",
    "lécithine",
    "soy lecithin",
    "lécithine de soja",
    "flavoring",
    "aroma",
    "arôme",
    "yeast extract",
    "extrait de levure",
];

const ADDITIVE_REGEX = /\bE\d{3,4}[a-z]?\b/gi;

export function analyzeIngredients(text: string): IngredientAnalysis {
    if (!text) {
        return { isUpf: false, redFlags: [], additives: [] };
    }

    const lowerText = text.toLowerCase();
    const redFlags: string[] = [];
    const additives: string[] = [];

    // Check for text markers
    UPF_MARKERS.forEach((marker) => {
        if (lowerText.includes(marker)) {
            redFlags.push(marker);
        }
    });

    // Check for E-numbers
    const additiveMatches = text.match(ADDITIVE_REGEX);
    if (additiveMatches) {
        additiveMatches.forEach((match) => {
            if (!additives.includes(match)) {
                additives.push(match);
            }
        });
    }

    // Combine for total count
    const totalFlags = redFlags.length + additives.length;

    return {
        isUpf: totalFlags > 0,
        redFlags,
        additives,
    };
}
