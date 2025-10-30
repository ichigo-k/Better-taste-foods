"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Home, Folder } from "lucide-react";
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

    return (
        <aside className="absolute left-0 top-0 min-h-full md:w-[18%] w-[12%]  flex flex-col bg-background ">
            <ScrollArea className="flex-1 md:px-3 md:py-4 space-y-[2rem]">
                {navItems.map((item, index) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link key={index} href={item.href || "#"}>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start mb-2 gap-3 text-sm font-medium rounded-lg transition-colors
                                    ${isActive ? "bg-gray-100 text-primary" : "hover:bg-accent hover:text-accent-foreground"}
                                `}
                            >
                                <item.icon className="size-5" />
                                {item.label}
                            </Button>
                        </Link>
                    );
                })}
            </ScrollArea>
        </aside>
    );
}
