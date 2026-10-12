import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
    return (
        <main className="flex min-h-[calc(100vh-140px)] flex-col items-center justify-center bg-base-200/30 px-4 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-success">৪০৪</p>
            <h1 className="mt-2 text-2xl font-extrabold text-base-content">
                পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
            </h1>
            <p className="mt-2 text-sm text-base-content/60">
                ঠিকানাটি সঠিক কিনা দেখে আবার চেষ্টা করুন।
            </p>
            <Link href="/" className="btn btn-success btn-sm mt-6 rounded-xl text-white">
                <FaArrowLeft className="h-3 w-3" />
                হোম পেজে ফিরে যান
            </Link>
        </main>
    );
}
