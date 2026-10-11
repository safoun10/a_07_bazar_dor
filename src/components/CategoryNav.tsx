"use client";

import { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/types/bazar";

interface CategoryNavProps {
    categoriesPromise: Promise<Category[]>;
}

const CategoryNav = ({ categoriesPromise }: CategoryNavProps) => {
    const categories = use(categoriesPromise);
    const pathname = usePathname();

    return (
        <div className="border-t border-base-200 bg-base-100">
            <div className="max-w-6xl mx-auto px-4 overflow-x-auto scrollbar-none">
                <ul className="flex items-center py-2.5 min-w-max">
                    {categories.map((cat) => {
                        const isActive = pathname === `/categories/${cat.slug}` || (pathname === "/" && cat.slug === "chal");

                        return (
                            <li key={cat.id}>
                                <Link
                                    href={`/categories/${cat.slug}`}
                                    className={`flex font-bold items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${isActive
                                            ? "bg-base-200 text-base-content shadow-2xs"
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
    );
};

export default CategoryNav;