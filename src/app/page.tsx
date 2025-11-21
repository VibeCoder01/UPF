import { fetchProducts } from "@/lib/api";
import { HomeClient } from "@/components/HomeClient";

export const revalidate = 86400;

export default async function Home() {
  const products = await fetchProducts(100);
  return <HomeClient products={products} />;
}
