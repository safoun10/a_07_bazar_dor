"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signUp, signIn } from "@/lib/auth-client";
import { FaGoogle, FaGithub, FaArrowLeft } from "react-icons/fa";

const SignUpPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("পাসওয়ার্ড দুটি মেলেনি");
            return;
        }

        if (formData.password.length < 8) {
            toast.error("পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে");
            return;
        }

        setLoading(true);

        await signUp.email(
            {
                email: formData.email,
                password: formData.password,
                name: formData.name,
            },
            {
                onRequest: () => setLoading(true),
                onSuccess: () => {
                    setLoading(false);
                    toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে");
                    router.push("/sign-in");
                },
                onError: (ctx) => {
                    setLoading(false);
                    toast.error(ctx.error.message || "এই ইমেইল দিয়ে ইতিপূর্বে অ্যাকাউন্ট খোলা হয়েছে");
                },
            }
        );
    };

    const handleSocialSignIn = async (provider: "google" | "github") => {
        setSocialLoading(provider);
        try {
            await signIn.social(
                {
                    provider,
                    callbackURL: "/",
                },
                {
                    onError: (ctx) => {
                        toast.error(ctx.error.message || `${provider} দিয়ে সাইন ইন করা যায়নি`);
                    },
                }
            );
        } catch (error) {
            toast.error(error instanceof Error ? error.message : `${provider} দিয়ে সাইন ইন করা যায়নি`);
        } finally {
            setSocialLoading(null);
        }
    };

    return (
        <main className="min-h-[calc(100vh-140px)] bg-base-200/30 flex flex-col items-center justify-center p-4 py-12">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-extrabold text-base-content tracking-tight">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>
                <p className="text-xs sm:text-sm text-base-content/60 mt-1">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>

            <div className="w-full max-w-md bg-base-100 rounded-3xl border border-base-200 p-6 md:p-8 shadow-xs">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-base-content mb-1.5">
                            নাম
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="যেমন: রহিম উদ্দিন"
                            value={formData.name}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-base-100 text-sm focus:outline-none focus:border-success rounded-xl"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-base-content mb-1.5">
                            ইমেইল
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-base-100 text-sm focus:outline-none focus:border-success rounded-xl"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-base-content mb-1.5">
                            পাসওয়ার্ড
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            value={formData.password}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-base-100 text-sm focus:outline-none focus:border-success rounded-xl"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-base-content mb-1.5">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            placeholder="আবার লিখুন"
                            value={formData.confirmPassword}
                            onChange={handleChange}
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
                            "অ্যাকাউন্ট তৈরি করুন"
                        )}
                    </button>
                </form>

                <div className="divider text-xs text-base-content/40 my-5">অথবা</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => handleSocialSignIn("google")}
                        disabled={loading || socialLoading !== null}
                        className="btn btn-outline border-base-300 hover:bg-base-200 hover:border-base-300 text-base-content text-xs font-semibold rounded-xl flex items-center justify-center gap-2 h-11"
                    >
                        {socialLoading === "google" ? <span className="loading loading-spinner loading-xs" /> : <FaGoogle className="text-4285F4 w-4 h-4" />}
                        {socialLoading === "google" ? "Google-এ সংযোগ হচ্ছে" : "Google দিয়ে চালিয়ে যান"}
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocialSignIn("github")}
                        disabled={loading || socialLoading !== null}
                        className="btn btn-outline border-base-300 hover:bg-base-200 hover:border-base-300 text-base-content text-xs font-semibold rounded-xl flex items-center justify-center gap-2 h-11"
                    >
                        {socialLoading === "github" ? <span className="loading loading-spinner loading-xs" /> : <FaGithub className="w-4 h-4" />}
                        {socialLoading === "github" ? "GitHub-এ সংযোগ হচ্ছে" : "GitHub দিয়ে চালিয়ে যান"}
                    </button>
                </div>

                <p className="text-center text-xs text-base-content/70 mt-6">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link href="/sign-in" className="text-success font-semibold hover:underline">
                        সাইন ইন করুন
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

export default SignUpPage;