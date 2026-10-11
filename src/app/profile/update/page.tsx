"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const UpdateProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending, refetch } = useSession();

    // Lazy initial state based on session name
    const [name, setName] = useState<string | null>(null);
    const [updating, setUpdating] = useState(false);

    if (isPending) {
        return (
            <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-base-200/30">
                <span className="loading loading-spinner loading-lg text-success"></span>
            </div>
        );
    }

    if (!session?.user) {
        router.push("/sign-in");
        return null;
    }

    const currentName = name !== null ? name : session.user.name || "";

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);

        try {
            await authClient.updateUser({
                name: currentName,
            }, {
                onSuccess: () => {
                    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
                    refetch();
                    router.push("/profile");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "আপডেট করতে সমস্যা হয়েছে");
                },
            });
        } catch {
            toast.error("একটি অনাকাঙ্ক্ষিত ত্রুটি ঘটেছে");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <main className="min-h-[calc(100vh-140px)] bg-base-200/30 flex flex-col items-center p-4 py-12">
            <div className="w-full max-w-md">
                {/* Header Title */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-extrabold text-base-content tracking-tight">
                        প্রোফাইল আপডেট করুন
                    </h1>
                    <p className="text-xs sm:text-sm text-base-content/60 mt-1">
                        আপনার নাম পরিবর্তন করতে নিচকার ফর্মটি ব্যবহার করুন।
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-base-100 rounded-3xl border border-base-200 p-6 md:p-8 shadow-xs">
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-base-content mb-1.5">
                                নাম
                            </label>
                            <input
                                type="text"
                                value={currentName}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="আপনার নাম লিখুন"
                                className="input input-bordered w-full bg-base-100 text-sm focus:outline-none focus:border-success rounded-xl"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={updating}
                            className="btn btn-success text-white w-full rounded-xl text-sm font-bold mt-2 hover:bg-emerald-600 transition-colors"
                        >
                            {updating ? (
                                <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                                "আপডেট ইনফরমেশন"
                            )}
                        </button>
                    </form>
                </div>

                <Link
                    href="/profile"
                    className="text-xs text-base-content/60 hover:text-base-content transition-colors mt-6 flex items-center justify-center gap-1"
                >
                    <FaArrowLeft className="w-3 h-3" /> প্রোফাইলে ফিরে যান
                </Link>
            </div>
        </main>
    );
};

export default UpdateProfilePage;