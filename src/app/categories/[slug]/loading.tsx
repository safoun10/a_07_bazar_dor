export default function CategoryLoading() {
    return (
        <main className="min-h-[calc(100vh-140px)] bg-base-200/30 px-4 py-8 sm:py-10">
            <div className="mx-auto w-full max-w-6xl animate-pulse">
                <div className="mb-4 flex items-center gap-4 rounded-2xl border border-base-200 bg-base-100 px-5 py-5">
                    <div className="h-14 w-14 rounded-2xl bg-base-200" />
                    <div className="space-y-2">
                        <div className="h-5 w-24 rounded bg-base-200" />
                        <div className="h-3 w-52 rounded bg-base-200" />
                    </div>
                </div>
                <div className="mb-4 h-14 rounded-2xl border border-base-200 bg-base-100" />
                <div className="mb-4 h-4 w-40 rounded bg-base-200" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }, (_, index) => (
                        <div key={index} className="h-36 rounded-2xl border border-base-200 bg-base-100" />
                    ))}
                </div>
            </div>
        </main>
    );
}
