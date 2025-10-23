"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import Link from "next/link";

type MobileMenuProps = {
    navLinks: { name: string; link: string }[];
};

export default function MobileMenu({ navLinks }: MobileMenuProps) {
    return (
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
                </div>
            </DrawerContent>
        </Drawer>
    );
}
