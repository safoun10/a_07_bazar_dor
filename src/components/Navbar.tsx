import Link from "next/link";
import { Category } from "@/types/bazar";
import PriceTicker from "./PriceTicker";
import CategoryNav from "./CategoryNav";
import UserNav from "./UserNav"; // Import the client component

const fetchCategories = async (): Promise<Category[]> => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
};

const categoriesPromise = fetchCategories();

const Navbar = () => {
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
                        <UserNav />
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