"use client";

import React, { useState } from "react";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CartDrawer from "@/components/CartDrawer";
import MobileMenu from "@/components/MobileMenu";
import { useAuthStore } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";
import Image from "next/image";

export default function Navbar() {
    const { isLoggedIn, logout } = useAuthStore();
    const [loginOpen, setLoginOpen] = useState(false);

    const navLinks = [
        { name: "home", link: "/" },
        { name: "about us", link: "#about" },
        { name: "shop", link: "#shop" },
    ];

    return (
        <nav className="w-full py-2 sticky top-0 z-[300] bg-white/80 backdrop-blur-lg">
            <div className="section-content flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold flex items-center">
                    <Image src={"/logo.png"} alt={"logo"} width={100} height={100}/>
                    <div className={"leading-tight "}>
                        <h2>Better Taste</h2>
                        <h3 className="text-red-400">Foods</h3>
                    </div>

                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link, i) => (
                        <Link
                            key={i}
                            href={link.link}
                            scroll={true}
                            className="capitalize font-medium transition-colors duration-300 hover:text-red-500"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            <Link href="/dashboard">
                                <Button className="cursor-pointer">Dashboard</Button>
                            </Link>
                            <LogOut className="cursor-pointer" onClick={logout} />
                        </>
                    ) : (
                        <LogIn className="cursor-pointer" onClick={() => setLoginOpen(true)} />
                    )}

                    <CartDrawer />
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <MobileMenu navLinks={navLinks} />
                </div>
            </div>

            <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
        </nav>
    );
}
