"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { isLoggedIn, loadUser } = useAuthStore();

    useEffect(() => {
        loadUser().then(() => {
            if (!isLoggedIn) router.replace("/");
        });
    }, [isLoggedIn, loadUser, router]);

    if (!isLoggedIn) return <p>Loading  .... </p>;

    return <>{children}</>;
}
