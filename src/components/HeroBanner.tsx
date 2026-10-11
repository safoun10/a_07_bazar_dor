import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
    return (
        <section className="max-w-6xl mx-auto px-4 my-10">
            <div className="bg-base-100 rounded-3xl border border-base-200 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
                <div className="flex-1 space-y-4">
                    <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-1 rounded-full">
                        রবিবার, ১১ অক্টোবর, ২০২৬
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-base-content tracking-tight">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="text-sm md:text-base text-base-content/70 leading-relaxed max-w-xl">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <div className="pt-10">
                        <Link
                            href="#all-products"
                            className="btn btn-success text-white font-bold px-6 shadow-md hover:bg-emerald-700 transition-all rounded-xl"
                        >
                            সব পণ্য দেখুন
                        </Link>
                    </div>
                </div>

                <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
                    <div className="relative w-64 h-56 md:w-80 md:h-64">
                        <Image
                            src="/bazar-hero.png"
                            alt="Market Produce Basket"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;