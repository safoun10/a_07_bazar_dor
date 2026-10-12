"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "react-toastify";

const UserNav = () => {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [signingOut, setSigningOut] = useState(false);

    const handleSignOut = async () => {
        setSigningOut(true);
        try {
            await signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("সাইন আউট সফল হয়েছে");
                        router.push("/");
                        router.refresh();
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message || "সাইন আউট করা যায়নি");
                    },
                },
            });
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "সাইন আউট করা যায়নি");
        } finally {
            setSigningOut(false);
        }
    };

    if (isPending) {
        return <span className="loading loading-spinner loading-xs text-success"></span>;
    }

    if (session?.user) {
        return (
            <div className="dropdown dropdown-end">
                <button
                    tabIndex={0}
                    role="button"
                    className="flex items-center gap-2 focus:outline-none hover:bg-base-200 px-3 py-2 rounded-full transition-colors"
                >
                    <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold relative overflow-hidden">
                            <Image
                                src={session.user.image || "https://i.postimg.cc/FF8YZm4X/Whats-App-Image-2026-07-25-at-4-15-46-PM.jpg"}
                                alt={session.user.name || "User Avatar"}
                                width={32}
                                height={32}
                                className="rounded-full object-cover"
                            />
                        </div>
                    </div>
                    <span className="text-sm font-medium text-base-content hidden sm:inline">
                        {session.user.name}
                    </span>
                    <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <div
                    tabIndex={0}
                    className="dropdown-content mt-2 w-56 bg-base-100 rounded-box shadow-xl border border-base-200 p-2 z-100"
                >
                    <div className="px-3 py-2 border-b border-base-200 mb-1">
                        <p className="text-sm font-semibold text-base-content">{session.user.name}</p>
                        <p className="text-xs text-base-content/60 truncate">{session.user.email}</p>
                    </div>
                    <Link
                        href="/profile"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-base-content hover:bg-base-200 rounded-lg transition-colors"
                    >
                        👤 আমার প্রোফাইল
                    </Link>
                    <button
                        onClick={handleSignOut}
                        disabled={signingOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors mt-1"
                    >
                        {signingOut ? <span className="loading loading-spinner loading-xs" /> : "↩"}
                        {signingOut ? "সাইন আউট হচ্ছে" : "সাইন আউট"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 md:gap-3">
            <Link href="/sign-in" className="btn btn-ghost btn-sm font-bold text-xs md:text-sm px-3 md:px-6 py-2 h-auto min-h-0">
                সাইন ইন
            </Link>
            <Link
                href="/sign-up"
                className="btn btn-success btn-sm text-white font-bold text-xs md:text-sm px-3 md:px-6 py-2 h-auto min-h-0"
            >
                সাইন আপ
            </Link>
        </div>
    );
};

export default UserNav;