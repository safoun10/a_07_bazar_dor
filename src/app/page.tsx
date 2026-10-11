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
            <Suspense fallback="price decreasing">
                <PriceDecreasedToday></PriceDecreasedToday>
            </Suspense>
        </div>
    );
};

export default App;