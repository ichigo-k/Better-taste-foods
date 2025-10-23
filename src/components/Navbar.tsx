'use client';

import {ReactElement, useEffect, useState} from 'react';
import { User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar(): ReactElement {
    const isLoggedIn: boolean = false;
    const pathname = usePathname();
    const [activeHash, setActiveHash] = useState<string>("");
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    type NavLink = {
        name: string;
        link: string;
    };

    const navLinks: NavLink[] = [
        { name: "home", link: "#home" },
        { name: "about us", link: "/#about" },
        { name: "shop", link: "/#shop" },
        { name: "contact us", link: "/#contact" },
    ];

    useEffect(() => {
        const handleHashChange = () => setActiveHash(window.location.hash);
        window.addEventListener("hashchange", handleHashChange);
        handleHashChange();
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const variants = {
        hidden: { x: "100%" },
        visible: { x: 0, transition: { type: "spring", stiffness: 80 } },
        exit: { x: "100%", transition: { duration: 0.3 } },
    };

    return (
        <nav className="w-full py-3 flex items-center justify-between relative z-50">
            {/* Logo */}
            <div className="text-2xl font-bold">
                <h2>Better Taste</h2>
                <h3 className="text-blue-400 leading-2">Foods</h3>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-10">
                {navLinks.map((element, key) => {
                    const isActive =
                        pathname === element.link || activeHash === element.link;

                    return (
                        <motion.div key={key} whileHover={{ y: -2 }}>
                            <Link
                                href={element.link}
                                scroll={true}
                                className={`capitalize font-medium transition-colors duration-300 ${
                                    isActive
                                        ? "text-blue-500 border-b-2 border-blue-500 pb-1"
                                        : "text-gray-700 hover:text-blue-500"
                                }`}
                            >
                                {element.name}
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* User Icon + Mobile Menu Button */}
            <div className="flex items-center gap-4">
                {isLoggedIn ? <p>Hii</p> : <User className="cursor-pointer" />}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden p-2"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="sidebar"
                        // variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed top-0 right-0 h-full w-full bg-white shadow-lg flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {navLinks.map((element, key) => {
                            const isActive =
                                pathname === element.link || activeHash === element.link;

                            return (
                                <Link
                                    key={key}
                                    href={element.link}
                                    scroll={true}
                                    className={`capitalize text-lg font-medium transition-colors duration-300 ${
                                        isActive
                                            ? "text-blue-500 border-b-2 border-blue-500 pb-1"
                                            : "text-gray-700 hover:text-blue-500"
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {element.name}
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
