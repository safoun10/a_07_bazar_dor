interface ProductGridSkeletonProps {
    title: string;
    count?: number;
}

export default function ProductGridSkeleton({ title, count = 3 }: ProductGridSkeletonProps) {
    return (
        <section className="mx-auto my-8 max-w-6xl px-4" aria-label={title} aria-busy="true">
            <div className="mb-6 h-6 w-48 animate-pulse rounded bg-base-200" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: count }, (_, index) => (
                    <div key={index} className="h-36 animate-pulse rounded-xl border border-base-200 bg-base-100" />
                ))}
            </div>
        </section>
    );
}
