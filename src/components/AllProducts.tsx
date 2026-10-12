import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/bazar";
import { formatBengaliNumber } from "@/lib/bazar-format";

const AllProducts = async () => {
    const products = await getProducts();

    return (
        <section id="সব-পণ্য" className="max-w-6xl mx-auto px-4 my-12 scroll-mt-40">
            <div className="mb-10">
                <h2 className="text-2xl font-extrabold text-base-content tracking-tight">
                    সব পণ্য
                </h2>
                <p className="text-xs sm:text-sm text-base-content/60 mt-1">
                    মোট {formatBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
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