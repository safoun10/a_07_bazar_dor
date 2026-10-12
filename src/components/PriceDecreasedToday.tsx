import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/bazar";

const PriceDecreasedToday = async () => {
    const products = await getProducts();

    const topDecreasedProducts = products
        .filter((item) => item.change.dir === "down")
        .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
        .slice(0, 6);

    return (
        <section className="max-w-6xl mx-auto px-4 my-8">
            <div className="flex items-center gap-2 mb-6">
                <span className="text-success text-sm">▼</span>
                <h2 className="text-xl font-extrabold text-base-content tracking-tight">
                    আজ দাম কমেছে
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topDecreasedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} isDecrease={true} />
                ))}
            </div>
        </section>
    );
};

export default PriceDecreasedToday;