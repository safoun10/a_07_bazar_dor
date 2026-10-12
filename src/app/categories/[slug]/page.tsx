import { notFound } from "next/navigation";
import { getCategory, getProducts } from "@/lib/bazar";
import SortableCategoryProducts from "@/components/SortableCategoryProducts";

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const category = await getCategory(slug);
    if (!category) notFound();

    const products = await getProducts(category.id);

    return (
        <main className="min-h-[calc(100vh-140px)] bg-base-200/30 px-4 py-8 sm:py-10">
            <div className="mx-auto w-full max-w-6xl">
                <section className="mb-4 flex items-center gap-4 rounded-2xl border border-base-200 bg-base-100 px-5 py-4 sm:px-6 sm:py-5">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-base-200/50 text-3xl">
                        {category.icon}
                    </span>
                    <div>
                        <h1 className="text-xl font-extrabold text-base-content sm:text-2xl">
                            {category.nameBn}
                        </h1>
                        <p className="mt-1 text-xs text-base-content/60">
                            {formatBengaliCount(products.length)}টি পণ্যের আজকের দর ও পরিবর্তন
                        </p>
                    </div>
                </section>

                <SortableCategoryProducts products={products} />
            </div>
        </main>
    );
}

function formatBengaliCount(count: number): string {
    return new Intl.NumberFormat("bn-BD").format(count);
}
