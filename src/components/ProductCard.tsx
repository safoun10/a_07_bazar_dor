import Link from "next/link";
import { Product } from "@/types/bazar";

interface ProductCardProps {
    product: Product;
    isDecrease?: boolean;
}

const ProductCard = ({ product, isDecrease = false }: ProductCardProps) => {
    const isNeutral = product.change.dir === "neutral" || product.change.pct === 0;

    return (
        <Link href={`/products/${product.id}`} className="block group">
            <div className="bg-base-100 rounded-xl border border-base-300 p-6 shadow-2xs hover:shadow-md hover:border-green-300 transition-all flex flex-col justify-between h-full">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-base-200/50 rounded-2xl flex items-center justify-center shrink-0">
                        <span className="text-3xl select-none leading-none">
                            {product.image || "🛒"}
                        </span>
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-bold text-base-content text-lg truncate group-hover:text-success transition-colors">
                            {product.nameBn}
                        </h3>
                        <p className="text-xs text-base-content/60 mt-0.5">
                            {product.unit}
                        </p>
                    </div>
                </div>

                <div className="flex items-end justify-between mt-5 border-t border-base-100 pt-4">
                    <div>
                        <span className="text-xs text-base-content/50 block mb-1">
                            আজকের দাম
                        </span>
                        <span className="text-2xl font-extrabold text-base-content tracking-tight">
                            {product.today} <span className="text-sm font-normal">টাকা</span>
                        </span>
                    </div>

                    <div className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border ${isNeutral
                        ? "bg-base-200 text-base-content/70 border-base-300"
                        : isDecrease
                            ? "bg-emerald-50 text-success border-emerald-100"
                            : "bg-red-50 text-error border-red-100"
                        }`}>
                        <span>{isNeutral ? "—" : isDecrease ? "▼" : "▲"}</span>
                        <span>{product.change.pct}%</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;