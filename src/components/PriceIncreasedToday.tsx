import { Product } from "@/types/bazar";
import ProductCard from "./ProductCard";

const fetchAllProducts = async (): Promise<Product[]> => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
};

const PriceIncreasedToday = async () => {
    const products = await fetchAllProducts();

    const topIncreasedProducts = products
        .filter((item) => item.change.dir === "up" && item.change.pct > 0)
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    return (
        <section className="max-w-6xl mx-auto px-4 my-8">
            <div className="flex items-center gap-2 mb-6">
                <span className="text-error text-sm">▲</span>
                <h2 className="text-xl font-extrabold text-base-content tracking-tight">
                    আজ দাম বেড়েছে
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topIncreasedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default PriceIncreasedToday;