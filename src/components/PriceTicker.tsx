import { use, cache } from "react";
import Marquee from "react-fast-marquee";
import { Product } from "@/types/bazar";
import { getProducts } from "@/lib/bazar";
import { formatBengaliNumber, formatUnitName } from "@/lib/bazar-format";

const getTickerProducts = cache(getProducts);

const PriceTicker = () => {
    const products = use(getTickerProducts());

    if (products.length === 0) return null;

    return (
        <div className="py-2.5 overflow-hidden bg-white">
            <Marquee speed={150} pauseOnHover={true} gradient={false}>
                <div className="flex items-center gap-4">
                    {products.map((item) => {
                        const isUp = item.change.dir === "up";
                        const isDown = item.change.dir === "down";
                        return (
                            <div
                                key={item.id}
                                className="flex items-center gap-2 px-3.5 py-1 rounded-full border-r-indigo-500 text-xs whitespace-nowrap"
                            >
                                <span>{item.image || item.categoryIcon}</span>
                                <span className="font-medium text-base-content">{item.nameBn}</span>
                                <span className="font-bold text-base-content">
                                    {formatBengaliNumber(item.today)} টাকা/{formatUnitName(item.unit)}
                                </span>
                                <span
                                    className={`flex items-center gap-0.5 font-semibold ${isUp
                                        ? "text-error"
                                        : isDown
                                            ? "text-success"
                                            : "text-base-content/60"
                                        }`}
                                >
                                    {isUp ? "▲" : isDown ? "▼" : "—"} {formatBengaliNumber(Math.abs(item.change.pct))}%
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