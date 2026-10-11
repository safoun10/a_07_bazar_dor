"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "react-toastify";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = useSession();

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

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("সাইন আউট সফল হয়েছে");
                    router.push("/");
                    router.refresh();
                },
            },
        });
    };

    return (
        <main className="min-h-[calc(100vh-140px)] bg-base-200/30 flex flex-col items-center p-4 py-12">
            <div className="w-full max-w-2xl">
                {/* Header Title */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-base-content tracking-tight">
                        আমার প্রোফাইল
                    </h1>
                    <p className="text-xs sm:text-sm text-base-content/60 mt-1">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                {/* Top User Info Card */}
                <div className="bg-base-100 rounded-3xl border border-base-200 p-6 md:p-8 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-center sm:text-left">
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-16 h-16 flex items-center justify-center text-lg font-semibold relative overflow-hidden shadow-sm">
                                <Image
                                    src={session.user.image || "https://i.postimg.cc/FF8YZm4X/Whats-App-Image-2026-07-25-at-4-15-46-PM.jpg"}
                                    alt={session.user.name || "User Avatar"}
                                    width={64}
                                    height={64}
                                    className="rounded-full object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-base-content">{session.user.name}</h2>
                            <p className="text-xs sm:text-sm text-base-content/60 truncate max-w-55 sm:max-w-xs">
                                {session.user.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Update Route Button as required */}
                        <Link
                            href="/profile/update"
                            className="btn btn-success btn-sm text-white font-semibold rounded-xl px-4 h-10"
                        >
                            প্রোফাইল আপডেট করুন
                        </Link>

                        <button
                            onClick={handleSignOut}
                            className="btn btn-outline btn-error btn-sm font-semibold rounded-xl px-4 h-10"
                        >
                            সাইন আউট
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;