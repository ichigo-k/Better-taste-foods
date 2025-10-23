'use client';

import React, { ReactElement} from 'react';
import { User, Menu } from "lucide-react";
import Link from "next/link";

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

export default function Navbar(): ReactElement {
    const isLoggedIn: boolean = false;

    type NavLink = {
        name: string;
        link: string;
    };

    const navLinks: NavLink[] = [
        { name: "home", link: "#home" },
        { name: "about us", link: "#about" },
        { name: "shop", link: "#shop" },
        { name: "contact us", link: "#contact" },
    ];

    return (
        <nav className="w-full py-2 sticky top-0 z-[999] bg-white/80 backdrop-blur-lg ">
            <div className="section-content flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold leading-tight">
                    <h2>Better Taste</h2>
                    <h3 className="text-blue-400">Foods</h3>
                </div>


                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((element, key) => {
                        return (
                            <Link
                                key={key}
                                href={element.link}
                                scroll={true}
                                className={`capitalize font-medium transition-colors duration-300 hover:text-blue-500`}
                            >
                                {element.name}
                            </Link>
                        );
                    })}
                </div>


                <div className="flex items-center gap-4">
                    {isLoggedIn ? <p>Hi</p> : <User className="cursor-pointer" />}
                    <Drawer>
                        <DrawerTrigger asChild>
                            <button className="md:hidden p-2">
                                <Menu size={24} />
                            </button>
                        </DrawerTrigger>
                        <DrawerContent className="bg-white border-t rounded-t-2xl">
                            <DrawerHeader className="text-center">
                                <DrawerTitle className="text-xl font-semibold text-gray-700">Menu</DrawerTitle>
                            </DrawerHeader>
                            <div className="flex flex-col items-center justify-center gap-6 py-6">
                                {navLinks.map((element, key) => {

                                    return (
                                        <Link
                                            key={key}
                                            href={element.link}
                                            scroll={true}
                                            className={`capitalize text-lg font-medium transition-colors duration-300 hover:text-blue-500`}
                                        >
                                            {element.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </nav>
    ) as React.ReactElement;
}
