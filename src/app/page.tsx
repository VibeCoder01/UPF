import { fetchProducts } from "@/lib/api";
import { HomeClient } from "@/components/HomeClient";

export const revalidate = 86400;

export default async function Home() {
  try {
    const products = await fetchProducts(100);
    return <HomeClient products={products} />;
  } catch (error) {
    console.error("Failed to load products:", error);
    // Return empty array to allow page to load gracefully
    return <HomeClient products={[]} />;
  }
}
