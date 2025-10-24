"use client";

import React from "react";
import {LogIn, LogOut, User} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CartDrawer from "@/components/CartDrawer";
import MobileMenu from "@/components/MobileMenu";
import {useAuthStore} from "@/context/AuthContext";


export default function Navbar() {


    const {user, isLoggedIn, loginWithOAuth, logout} = useAuthStore()

    const navLinks = [
        { name: "home", link: "#home" },
        { name: "about us", link: "#about" },
        { name: "shop", link: "#shop" },
    ];

    return (
        <nav className="w-full py-2 sticky top-0 z-[999] bg-white/80 backdrop-blur-lg">
            <div className="section-content flex items-center justify-between">

                <Link href={"/"} className="text-2xl font-bold leading-tight">
                    <h2>Better Taste</h2>
                    <h3 className="text-red-400">Foods</h3>
                </Link>


                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((element, key) => (
                        <Link
                            key={key}
                            href={element.link}
                            scroll={true}
                            className="capitalize font-medium transition-colors duration-300 hover:text-red-500"
                        >
                            {element.name}
                        </Link>
                    ))}
                </div>


                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                       <>
                           <Link href={"/dashboard"}><Button className="cursor-pointer">Dashboard</Button></Link>
                           <LogOut className="cursor-pointer" onClick={() => logout()}/>
                       </>
                    ) : (
                        <LogIn className="cursor-pointer" onClick={() => loginWithOAuth("google")} />
                    )}

                    <CartDrawer />
                    <MobileMenu navLinks={navLinks} />
                </div>
            </div>
        </nav>
    );
}
