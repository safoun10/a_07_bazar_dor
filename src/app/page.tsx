import AllProducts from "@/components/AllProducts";
import HeroBanner from "@/components/HeroBanner";
import PriceDecreasedToday from "@/components/PriceDecreasedToday";
import PriceIncreasedToday from "@/components/PriceIncreasedToday";
import { Suspense } from "react";

const App = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <Suspense fallback="price increasing and ">
                <PriceIncreasedToday></PriceIncreasedToday>
            </Suspense>
            <Suspense fallback="price decreasing and ">
                <PriceDecreasedToday></PriceDecreasedToday>
            </Suspense>
            <Suspense fallback="al product loading">
                <AllProducts></AllProducts>
            </Suspense>
        </div>
    );
};

export default App;