"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient, signIn } from "@/lib/auth-client";
import { FaGoogle, FaGithub, FaArrowLeft } from "react-icons/fa";

const SignInPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await signIn.email(
            {
                email,
                password,
            },
            {
                onRequest: () => setLoading(true),
                // onSuccess: () => {
                //     setLoading(false);
                //     toast.success("সাইন ইন সফল হয়েছে");
                //     router.push("/");
                //     router.refresh(); // Crucial to update Navbar session state instantly
                // },
                onSuccess: async () => {
                    setLoading(false);
                    toast.success("সফল হয়েছে");

                    // 1. Force Better Auth to re-query the session endpoint and update client state
                    await authClient.getSession();

                    // 2. Then navigate and refresh
                    router.push("/");
                    router.refresh();
                },
                onError: (ctx) => {
                    setLoading(false);
                    toast.error(ctx.error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়");
                },
            }
        );
    };

    const handleSocialSignIn = async (provider: "google" | "github") => {
        await signIn.social({
            provider,
            callbackURL: "/",
        });
    };

    return (
        <main className="min-h-[calc(100vh-140px)] bg-base-200/30 flex flex-col items-center justify-center p-4 py-12">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-extrabold text-base-content tracking-tight">
                    সাইন ইন
                </h1>
                <p className="text-xs sm:text-sm text-base-content/60 mt-1">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            <div className="w-full max-w-md bg-base-100 rounded-3xl border border-base-200 p-6 md:p-8 shadow-xs">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-base-content mb-1.5">
                            ইমেইল
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full bg-base-100 text-sm focus:outline-none focus:border-success rounded-xl"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-base-content mb-1.5">
                            পাসওয়ার্ড
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full bg-base-100 text-sm focus:outline-none focus:border-success rounded-xl"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-success text-white w-full rounded-xl text-sm font-bold mt-2 hover:bg-emerald-600 transition-colors"
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            "সাইন ইন"
                        )}
                    </button>
                </form>

                <div className="divider text-xs text-base-content/40 my-5">অথবা</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => handleSocialSignIn("google")}
                        className="btn btn-outline border-base-300 hover:bg-base-200 hover:border-base-300 text-base-content text-xs font-semibold rounded-xl flex items-center justify-center gap-2 h-11"
                    >
                        <FaGoogle className="text-4285F4 w-4 h-4" />
                        Google দিয়ে চালিয়ে যান
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocialSignIn("github")}
                        className="btn btn-outline border-base-300 hover:bg-base-200 hover:border-base-300 text-base-content text-xs font-semibold rounded-xl flex items-center justify-center gap-2 h-11"
                    >
                        <FaGithub className="w-4 h-4" />
                        GitHub দিয়ে চালিয়ে যান
                    </button>
                </div>

                <p className="text-center text-xs text-base-content/70 mt-6">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link href="/sign-up" className="text-success font-semibold hover:underline">
                        সাইন আপ করুন
                    </Link>
                </p>
            </div>

            <Link
                href="/"
                className="text-xs text-base-content/60 hover:text-base-content transition-colors mt-6 flex items-center gap-1"
            >
                <FaArrowLeft className="w-3 h-3" /> হোম পেজে ফিরে যান
            </Link>
        </main>
    );
};

export default SignInPage;