import Link from "next/link";
import { Category } from "@/types/bazar";
import PriceTicker from "./PriceTicker";
import CategoryNav from "./CategoryNav";
import Image from "next/image";

const fetchCategories = async (): Promise<Category[]> => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
};

const categoriesPromise = fetchCategories();

const Navbar = () => {
    const isAuthenticated = false;

    return (
        <>
            <header className="bg-base-100 border-b border-base-200 sticky top-0 z-100 shadow-xs">
                <div className="navbar max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="navbar-start w-auto">
                        <Link href="/" className="flex items-center gap-2 md:gap-3">
                            <div className="bg-success text-success-content p-2 md:p-2.5 rounded-xl flex items-center justify-center text-lg md:text-xl shadow-sm shrink-0">
                                🛒
                            </div>
                            <div className="min-w-0">
                                <span className="text-lg md:text-xl font-bold tracking-tight text-base-content block leading-none truncate">
                                    বাজার দর
                                </span>
                                <span className="text-[11px] md:text-xs text-base-content/60 mt-1 block truncate">
                                    রবিবার, ১১ অক্টোবর, ২০২৬
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="navbar-end w-auto">
                        {isAuthenticated ? (
                            <div className="dropdown dropdown-end">
                                <button
                                    tabIndex={0}
                                    role="button"
                                    className="flex items-center gap-2 focus:outline-none hover:bg-base-200 px-3 py-2 rounded-full transition-colors"
                                >
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral text-neutral-content rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold relative overflow-hidden">
                                            <Image
                                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                                alt="User Avatar"
                                                width={32}
                                                height={32}
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-base-content hidden sm:inline">রেজওয়ান</span>
                                    <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div
                                    tabIndex={0}
                                    className="dropdown-content mt-2 w-56 bg-base-100 rounded-box shadow-xl border border-base-200 p-2 z-100"
                                >
                                    <div className="px-3 py-2 border-b border-base-100 mb-1">
                                        <p className="text-sm font-semibold text-base-content">রেজওয়ান আহমেদ</p>
                                        <p className="text-xs text-base-content/60 truncate">rezwanahmed@gmail.com</p>
                                    </div>
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-2 px-3 py-2 text-sm text-base-content hover:bg-base-200 rounded-lg transition-colors"
                                    >
                                        👤 আমার প্রোফাইল
                                    </Link>
                                    <button
                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors mt-1"
                                    >
                                        ↩ সাইন আউট
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 md:gap-3">
                                <Link href="/sign-in" className="btn btn-ghost btn-sm font-bold text-xs md:text-sm px-3 md:px-6 py-2 h-auto min-h-0">
                                    সাইন ইন
                                </Link>
                                <Link
                                    href="/sign-up"
                                    className="btn btn-success btn-sm text-white font-bold text-xs md:text-sm px-3 md:px-6 py-2 h-auto min-h-0"
                                >
                                    সাইন আপ
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <CategoryNav categoriesPromise={categoriesPromise} />
                <hr className="border-gray-300" />
            </header>

            <PriceTicker />
        </>
    );
};

export default Navbar;