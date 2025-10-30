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
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => {
            // Listen for Supabase auth changes
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

                // Email + Password login only
                login: async (email, password) => {
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email,
                        password,
                    });

                    if (error) {
                        console.error("Login error:", error.message);
                        throw new Error(error.message);
                    }

                    if (data.session?.user) {
                        const userData = {
                            id: data.session.user.id,
                            name: data.session.user.user_metadata.full_name || "User",
                            email: data.session.user.email || "",
                        };
                        set({ user: userData, isLoggedIn: true });
                    }
                },

                // Logout
                logout: async () => {
                    await supabase.auth.signOut();
                    set({ user: null, isLoggedIn: false });
                },

                // Load current user on refresh
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
