"use client";

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CartDrawer from "@/components/CartDrawer";
import { useAuthStore } from "@/context/AuthContext";
import { useState } from "react";
import LoginModal from "@/components/LoginModal";

type MobileMenuProps = {
    navLinks: { name: string; link: string }[];
};

export default function MobileMenu({ navLinks }: MobileMenuProps) {
    const { isLoggedIn, logout } = useAuthStore();
    const [loginOpen, setLoginOpen] = useState(false);

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <button className="md:hidden p-2">
                        <Menu size={24} />
                    </button>
                </DrawerTrigger>

                <DrawerContent className="bg-white border-t rounded-t-2xl">
                    <DrawerHeader className="text-center">
                        <DrawerTitle className="text-xl font-semibold text-gray-700">
                            Menu
                        </DrawerTitle>
                    </DrawerHeader>

                    <div className="flex flex-col items-center justify-center gap-6 py-6">
                        {/* Navigation Links */}
                        {navLinks.map((element, key) => (
                            <Link
                                key={key}
                                href={element.link}
                                scroll={true}
                                className="capitalize text-lg font-medium transition-colors duration-300 hover:text-red-500"
                            >
                                {element.name}
                            </Link>
                        ))}

                        <div className="w-3/4 h-[1px] bg-gray-200 my-2" />

                        {/* Cart Drawer */}
                        <CartDrawer />

                        {/* Auth Buttons */}
                        {isLoggedIn ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="w-full flex justify-center"
                                >
                                    <Button className="w-3/4">Dashboard</Button>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 text-red-500 font-medium"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setLoginOpen(true)}
                                className="flex items-center gap-2 text-gray-700 font-medium"
                            >
                                <LogIn size={18} /> Login
                            </button>
                        )}
                    </div>
                </DrawerContent>
            </Drawer>

            {/* Login Modal */}
            <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
        </>
    );
}
