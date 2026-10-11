import { Product } from "@/types/bazar";
import ProductCard from "./ProductCard";

const fetchAllProducts = async (): Promise<Product[]> => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
};

const AllProducts = async () => {
    const products = await fetchAllProducts();

    return (
        <section id="all-products" className="max-w-6xl mx-auto px-4 my-12">
            <div className="mb-10">
                <h2 className="text-2xl font-extrabold text-base-content tracking-tight">
                    সব পণ্য
                </h2>
                <p className="text-xs sm:text-sm text-base-content/60 mt-1">
                    মোট {products.length}টি পণ্য দেখানো হচ্ছে
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => {
                    const isDecrease = product.change.dir === "down";
                    return (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isDecrease={isDecrease}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default AllProducts;