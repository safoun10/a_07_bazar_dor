"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types/bazar";
import { formatBengaliNumber } from "@/lib/bazar-format";
import ProductCard from "./ProductCard";

type SortOrder = "default" | "ascending" | "descending";

interface SortableCategoryProductsProps {
    products: Product[];
}

export default function SortableCategoryProducts({ products }: SortableCategoryProductsProps) {
    const [sortOrder, setSortOrder] = useState<SortOrder>("default");
    const sortedProducts = useMemo(() => {
        if (sortOrder === "default") return products;
        return [...products].sort((a, b) =>
            sortOrder === "ascending" ? a.today - b.today : b.today - a.today
        );
    }, [products, sortOrder]);

    return (
        <>
            <div className="mb-4 flex justify-end rounded-2xl border border-base-200 bg-base-100 px-4 py-3 sm:px-6">
                <label className="flex items-center gap-2 text-xs text-base-content/60">
                    <span>সাজান</span>
                    <select
                        className="select select-bordered select-sm rounded-lg bg-base-100 text-base-content"
                        value={sortOrder}
                        onChange={(event) => setSortOrder(event.target.value as SortOrder)}
                        aria-label="পণ্যের দাম অনুযায়ী সাজান"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="ascending">দাম: কম থেকে বেশি</option>
                        <option value="descending">দাম: বেশি থেকে কম</option>
                    </select>
                </label>
            </div>

            <p className="mb-4 text-xs text-base-content/60">
                মোট {formatBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>

            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sortedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isDecrease={product.change.dir === "down"}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-base-200 bg-base-100 px-6 py-12 text-center text-sm text-base-content/60">
                    এই বিভাগে কোনো পণ্য পাওয়া যায়নি।
                </div>
            )}
        </>
    );
}
