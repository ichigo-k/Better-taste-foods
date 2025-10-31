"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";
import { Home, Folder, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
    label: string;
    icon: React.ElementType;
    href?: string;
}

const navItems: NavItem[] = [
    { label: "Products", icon: Home, href: "/dashboard" },
    { label: "Orders", icon: Folder, href: "/dashboard/orders" },
];

export default function SideBar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <Button
                className="md:hidden fixed top-[5rem] left-4 z-50"
                onClick={() => setIsOpen(true)}
                variant="outline"
            >
                <Menu />
            </Button>

            {/* Drawer for Mobile */}
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerOverlay />
                <DrawerContent className="w-full bg-background p-4">

                    <span className="sr-only">Navigation Menu</span>
                    <ScrollArea className="h-full space-y-4">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={index}
                                    href={item.href || "#"}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Button
                                        variant="ghost"
                                        className={`mb-2 w-full justify-start gap-3 text-sm font-medium rounded-lg
                      ${isActive ? "bg-gray-100 text-primary" : "hover:bg-accent hover:text-accent-foreground"}
                    `}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.label}
                                    </Button>
                                </Link>
                            );
                        })}
                    </ScrollArea>
                </DrawerContent>
            </Drawer>


            <aside className="hidden md:flex absolute left-0 top-0 h-full w-[18%] flex-col bg-background">
                <ScrollArea className="flex-1 p-4 space-y-4">
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={index} href={item.href || "#"}>
                                <Button
                                    variant="ghost"
                                    className={`w-full justify-start gap-3 mb-3 text-sm font-medium rounded-lg
                    ${isActive ? "bg-gray-100 text-primary" : "hover:bg-accent hover:text-accent-foreground"}
                  `}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </Button>
                            </Link>
                        );
                    })}
                </ScrollArea>
            </aside>
        </>
    );
}
