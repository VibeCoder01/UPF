export interface Product {
    code: string;
    product_name: string;
    brands: string;
    image_url: string;
    ingredients_text: string;
    categories_tags: string[];
    nova_group: number; // 1-4
    nutriscore_grade: 'a' | 'b' | 'c' | 'd' | 'e' | string;
    nutrient_levels: {
        fat: 'low' | 'moderate' | 'high' | string;
        salt: 'low' | 'moderate' | 'high' | string;
        "saturated-fat": 'low' | 'moderate' | 'high' | string;
        sugars: 'low' | 'moderate' | 'high' | string;
    };
    countries: string;
    nutriments: {
        "energy-kcal_100g": number;
        fat_100g: number;
        sugars_100g: number;
        salt_100g: number;
        proteins_100g: number;
    };
}

export interface SearchResponse {
    count: number;
    page: number;
    page_size: number;
    products: Product[];
}

const DEFAULT_FIELDS = [
    "code",
    "product_name",
    "brands",
    "image_url",
    "ingredients_text",
    "categories_tags",
    "nova_group",
    "nutriscore_grade",
    "nutrient_levels",
    "countries",
    "nutriments",
].join(",");

export class OpenFoodFactsClient {
    private baseUrl = "https://world.openfoodfacts.org";
    private timeout = 30000;
    private maxRetries = 3;

    private async fetchWithRetry(url: string): Promise<Response> {
        let attempt = 0;
        while (attempt < this.maxRetries) {
            try {
                const controller = new AbortController();
                const id = setTimeout(() => controller.abort(), this.timeout);
                const response = await fetch(url, { signal: controller.signal });
                clearTimeout(id);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response;
            } catch (error) {
                attempt++;
                console.error(`Fetch attempt ${attempt} failed:`, error);
                if (attempt === this.maxRetries) throw error;
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
        throw new Error("Max retries reached");
    }

    async searchProducts(params: Record<string, string | number>): Promise<Product[]> {
        const searchParams = new URLSearchParams({
            search_simple: "1",
            action: "process",
            json: "1",
            fields: DEFAULT_FIELDS,
            sort_by: "popularity",
            ...params,
        } as any);

        const url = `${this.baseUrl}/cgi/search.pl?${searchParams.toString()}`;

        try {
            const response = await this.fetchWithRetry(url);
            const data: SearchResponse = await response.json();
            return (data.products || []).filter((product) =>
                [1, 2, 3, 4].includes(product.nova_group)
            );
        } catch (error) {
            console.error("Error searching products:", error);
            return [];
        }
    }

    async getProduct(code: string): Promise<Product | null> {
        const url = `${this.baseUrl}/api/v2/product/${code}?fields=${DEFAULT_FIELDS}`;
        try {
            const response = await this.fetchWithRetry(url);
            const data = await response.json();
            return data.product || null;
        } catch (error) {
            console.error("Error fetching product:", error);
            return null;
        }
    }
}

export const offClient = new OpenFoodFactsClient();
