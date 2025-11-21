import { offClient, Product, SearchResponse } from "./client";

export type { Product, SearchResponse };

export async function fetchProducts(pageSize = 100): Promise<Product[]> {
    return offClient.searchProducts({
        page_size: pageSize,
        countries_tags: "en:united-kingdom",
    });
}

export async function fetchProduct(code: string): Promise<Product | null> {
    return offClient.getProduct(code);
}

export async function fetchProductsByBrand(brand: string, pageSize = 50): Promise<Product[]> {
    return offClient.searchProducts({
        page_size: pageSize,
        brands_tags: brand,
    });
}

export async function fetchProductsByCategory(category: string, pageSize = 50): Promise<Product[]> {
    return offClient.searchProducts({
        page_size: pageSize,
        categories_tags: category,
    });
}
