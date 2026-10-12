import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { FaArrowLeft, FaStore } from "react-icons/fa";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/bazar";
import { formatBengaliNumber, formatUnit } from "@/lib/bazar-format";

export const instant = false;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
    const { slug } = await params;
    const product = await getProduct(slug);
    if (!product) notFound();

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in?reason=protected");
    }

    const markets = product.markets ?? [];
    const minPrice = markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : product.today;
    const maxPrice = markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : product.today;
    const avgPrice = markets.length > 0
        ? Math.round(markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / markets.length)
        : product.today;

    return (
        <main className="min-h-[calc(100vh-140px)] bg-base-200/30 p-4 sm:p-6 md:p-10 flex justify-center">
            <div className="w-full max-w-4xl space-y-6">

                <Link href="/" className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-success">
                    <FaArrowLeft className="w-3.5 h-3.5" /> বাজারের মূল তালিকায় ফিরে যান
                </Link>

                {/* Top — Summary */}
                <div className="bg-base-100 rounded-3xl border border-base-200 p-6 sm:p-8 shadow-xs">
                    <div className="flex items-start sm:items-center gap-4">
                        <span className="text-5xl sm:text-6xl p-3 bg-base-200/50 rounded-2xl flex items-center justify-center">
                            {product.categoryIcon || product.image || "📦"}
                        </span>
                        <div>
                            {/* Emoji + Title */}
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content">
                                {product.nameBn}
                            </h1>

                            {/* Subtitle/description (market summary line) */}
                            <p className="text-xs sm:text-sm text-base-content/60 mt-1">
                                আজকের বাজারে বিভিন্ন্ পাইকারি ও খুচরা বাজারের দরদাম অনুযায়ী হালনাগাদ প্রতিবেদন।
                            </p>

                            {/* Category Tags & Unit */}
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                                <span className="badge badge-success badge-soft text-xs font-semibold px-3 py-2 rounded-lg">
                                    {product.categoryNameBn}
                                </span>
                                <span className="badge badge-outline text-xs font-medium px-3 py-2 rounded-lg">
                                    {formatUnit(product.unit)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price — Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-base-100 border border-base-200 rounded-2xl p-5 text-center shadow-xs">
                        <p className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                            সর্বনিম্ন দাম (Minimum Price)
                        </p>
                        <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-2">
                            ৳ {formatBengaliNumber(minPrice)}
                        </p>
                        <p className="text-xs text-base-content/50 mt-1">{formatUnit(product.unit)}</p>
                    </div>

                    <div className="bg-base-100 border border-base-200 rounded-2xl p-5 text-center shadow-xs">
                        <p className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                            গড় দাম (Average Price)
                        </p>
                        <p className="text-2xl sm:text-3xl font-black text-primary mt-2">
                            ৳ {formatBengaliNumber(avgPrice)}
                        </p>
                        <p className="text-xs text-base-content/50 mt-1">{formatUnit(product.unit)}</p>
                    </div>

                    <div className="bg-base-100 border border-base-200 rounded-2xl p-5 text-center shadow-xs">
                        <p className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                            সর্বোচ্চ দাম (Maximum Price)
                        </p>
                        <p className="text-2xl sm:text-3xl font-black text-error mt-2">
                            ৳ {formatBengaliNumber(maxPrice)}
                        </p>
                        <p className="text-xs text-base-content/50 mt-1">{formatUnit(product.unit)}</p>
                    </div>
                </div>

                {/* বাজারভিত্তিক আজকের দাম (Market Breakdown) */}
                <div className="bg-base-100 rounded-3xl border border-base-200 p-6 sm:p-8 shadow-xs">
                    <div className="flex items-center justify-between pb-4 border-b border-base-200 mb-6">
                        <div className="flex items-center gap-2">
                            <FaStore className="text-success w-5 h-5" />
                            <h2 className="text-lg sm:text-xl font-bold text-base-content">
                                বাজারভিত্তিক আজকের দাম
                            </h2>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="text-xs text-base-content/60 border-b border-base-200">
                                    <th>বাজারের নাম</th>
                                    <th>বিভাগ</th>
                                    <th className="text-right">দাম সীমানা (সর্বনিম্ন - সর্বোচ্চ)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {markets.length > 0 ? (
                                    markets.map((m, idx) => (
                                        <tr key={idx} className="border-b border-base-100 hover:bg-base-200/40 transition-colors">
                                            <td className="font-semibold text-base-content py-4">{m.market}</td>
                                            <td>
                                                <span className="badge badge-ghost badge-sm">{m.division}</span>
                                            </td>
                                            <td className="text-right font-bold text-base-content">
                                                ৳ {formatBengaliNumber(m.min)} - ৳ {formatBengaliNumber(m.max)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="text-center py-6 text-base-content/60">
                                            কোনো বাজারভিত্তিক তথ্য পাওয়া যায়নি
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </main>
    );
}