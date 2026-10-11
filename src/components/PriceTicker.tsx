import { use, cache } from "react";
import Marquee from "react-fast-marquee";
import { Product } from "@/types/bazar";

const getProducts = cache(async (): Promise<Product[]> => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
});

const PriceTicker = () => {
    const products = use(getProducts());

    if (products.length === 0) return null;

    return (
        <div className="py-2.5 overflow-hidden">
            <Marquee speed={200} pauseOnHover={true} gradient={false}>
                <div className="flex items-center gap-4">
                    {products.map((item) => {
                        const isUp = item.change.dir === "up";
                        return (
                            <div
                                key={item.id}
                                className="flex items-center gap-2 px-3.5 py-1 rounded-full border-r-indigo-500 text-xs whitespace-nowrap"
                            >
                                <span>{item.image || item.categoryIcon}</span>
                                <span className="font-medium text-base-content">{item.nameBn}</span>
                                <span className="font-bold text-base-content">
                                    {item.today} টাকা/কেজি
                                </span>
                                <span
                                    className={`flex items-center gap-0.5 font-semibold ${isUp ? "text-error" : "text-success"
                                        }`}
                                >
                                    {isUp ? "▲" : "▼"} {item.change.pct}%
                                </span>
                            </div>
                        );
                    })}
                </div>
            </Marquee>
        </div>
    );
};

export default PriceTicker;