import Link from "next/link";
import { Category } from "@/types/bazar";
import PriceTicker from "./PriceTicker";

const getCategories = async (): Promise<Category[]> => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
};

const Navbar = async () => {
    const isAuthenticated = true;
    const activeCategory = "chal";
    const categories = await getCategories();

    return (
        <header className="bg-base-100 border-b border-base-200">
            <div className="navbar max-w-7xl mx-auto px-4 py-3">
                <div className="navbar-start">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="bg-success text-success-content p-2.5 rounded-xl flex items-center justify-center text-xl shadow-sm">
                            🛒
                        </div>
                        <div>
                            <span className="text-xl font-bold tracking-tight text-base-content block leading-none">
                                বাজার দর
                            </span>
                            <span className="text-xs text-base-content/60 mt-1 block">
                                রবিবার, ১১ অক্টোবর, ২০২৬
                            </span>
                        </div>
                    </Link>
                </div>

                <div className="navbar-end">
                    {isAuthenticated ? (
                        <div className="dropdown dropdown-end">
                            <button
                                tabIndex={0}
                                role="button"
                                className="flex items-center gap-2 focus:outline-none bg-base-200/50 hover:bg-base-200 px-3 py-1.5 rounded-full transition-colors"
                            >
                                <div className="avatar placeholder">
                                    <div className="bg-neutral text-neutral-content rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                                        <img
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                            alt="User Avatar"
                                            className="rounded-full"
                                        />
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-base-content">রেজওয়ান</span>
                                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div
                                tabIndex={0}
                                className="dropdown-content mt-2 w-56 bg-base-100 rounded-box shadow-xl border border-base-200 p-2 z-50"
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
                        <div className="flex items-center gap-3">
                            <Link href="/signin" className="btn btn-ghost btn-sm font-medium">
                                সাইন ইন
                            </Link>
                            <Link
                                href="/signup"
                                className="btn btn-success btn-sm text-success-content font-medium px-4"
                            >
                                সাইন আপ
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t border-base-200 bg-base-100">
                <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-none">
                    <ul className="flex items-center gap-2 py-2.5 min-w-max">
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat.slug;
                            return (
                                <li key={cat.id}>
                                    <Link
                                        href={`/categories/${cat.slug}`}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                                            ? "bg-base-200 text-base-content font-semibold shadow-2xs"
                                            : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                                            }`}
                                    >
                                        <span className="text-base">{cat.icon}</span>
                                        <span>{cat.nameBn}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <hr className="border-gray-100"/>
            <PriceTicker />
        </header>
    );
};

export default Navbar;