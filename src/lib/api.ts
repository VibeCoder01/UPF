export interface Product {
    code: string;
    product_name: string;
    brands: string;
    image_url: string;
    ingredients_text: string;
    nova_group: number; // 1-4
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

export async function fetchProducts(pageSize = 100): Promise<Product[]> {
    const fields = [
        "code",
        "product_name",
        "brands",
        "image_url",
        "ingredients_text",
        "nova_group",
        "countries",
        "nutriments",
    ].join(",");

    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_simple=1&action=process&json=1&page_size=${pageSize}&fields=${fields}&countries_tags=en:united-kingdom&sort_by=popularity`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const data: SearchResponse = await response.json();
        return (data.products || []).filter((product) =>
            [1, 2, 3, 4].includes(product.nova_group)
        );
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}
