import AllProducts from "@/components/AllProducts";
import HeroBanner from "@/components/HeroBanner";
import PriceDecreasedToday from "@/components/PriceDecreasedToday";
import PriceIncreasedToday from "@/components/PriceIncreasedToday";
import { Suspense } from "react";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";

const App = () => {
    return (
        <div>
            <Suspense fallback={
                <section className="mx-auto my-10 h-80 max-w-6xl animate-pulse rounded-3xl bg-base-100 px-4" aria-label="লোড হচ্ছে" />
            }>
                <HeroBanner />
            </Suspense>
            <Suspense fallback={<ProductGridSkeleton title="আজ দাম বেড়েছে" />}>
                <PriceIncreasedToday></PriceIncreasedToday>
            </Suspense>
            <Suspense fallback={<ProductGridSkeleton title="আজ দাম কমেছে" />}>
                <PriceDecreasedToday></PriceDecreasedToday>
            </Suspense>
            <Suspense fallback={<ProductGridSkeleton title="সব পণ্য" count={6} />}>
                <AllProducts></AllProducts>
            </Suspense>
        </div>
    );
};

export default App;