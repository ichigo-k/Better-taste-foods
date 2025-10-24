'use client';

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/lib/supabaseClient";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
    loginWithOAuth: (provider: "google") => Promise<void>;
    logout: () => Promise<void>;
    loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => {

            supabase.auth.onAuthStateChange((_event, session) => {
                if (session?.user) {
                    const userData = {
                        id: session.user.id,
                        name: session.user.user_metadata.full_name || "User",
                        email: session.user.email || "",
                    };
                    set({ user: userData, isLoggedIn: true });
                } else {
                    set({ user: null, isLoggedIn: false });
                }
            });

            return {
                user: null,
                isLoggedIn: false,


                loginWithOAuth: async (provider) => {
                    const { error } = await supabase.auth.signInWithOAuth({
                        provider,
                        options: { redirectTo: window.location.origin },
                    });
                    if (error) console.error("Login error:", error.message);
                },


                logout: async () => {
                    await supabase.auth.signOut();
                    set({ user: null, isLoggedIn: false });
                },


                loadUser: async () => {
                    const { data } = await supabase.auth.getSession();
                    const session = data.session;

                    if (session?.user) {
                        const userData = {
                            id: session.user.id,
                            name: session.user.user_metadata.full_name || "User",
                            email: session.user.email || "",
                        };
                        set({ user: userData, isLoggedIn: true });
                    } else {
                        set({ user: null, isLoggedIn: false });
                    }
                },
            };
        },
        { name: "auth-storage" }
    )
);
