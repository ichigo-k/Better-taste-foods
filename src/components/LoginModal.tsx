"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuthStore } from "@/context/AuthContext";

interface LoginModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const login = useAuthStore((state) => state.login);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.email || !form.password) {
            toast.error("Please fill in both fields");
            return;
        }

        try {
            setLoading(true);
            await login(form.email, form.password);
            toast.success("Logged in successfully 🎉");
            onOpenChange(false);
        } catch (err: any) {
            toast.error(err.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-3">
                    <Input
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <Input
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <Button
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
