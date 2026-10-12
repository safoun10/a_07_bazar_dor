export default function Loading() {
    return (
        <main className="min-h-[calc(100vh-140px)] bg-base-200/30 px-4 py-8" aria-label="লোড হচ্ছে" aria-busy="true">
            <div className="mx-auto max-w-6xl animate-pulse">
                <div className="mb-8 h-64 rounded-3xl bg-base-100" />
                <div className="mb-6 h-6 w-52 rounded bg-base-200" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }, (_, index) => (
                        <div key={index} className="h-36 rounded-xl bg-base-100" />
                    ))}
                </div>
            </div>
        </main>
    );
}
