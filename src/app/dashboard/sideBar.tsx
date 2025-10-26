"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Home, Folder, Settings, LogOut } from "lucide-react";
import Link from "next/link";

interface NavItem {
    label: string;
    icon: React.ElementType;
    href?: string;
}

const navItems: NavItem[] = [
    { label: "Products", icon: Home, href: "/dashboard" },
    { label: "Users", icon: Folder, href: "/dashboard/users" }
];

export default function SideBar() {
    return (
        <aside className="absolute left-0 top-0 min-h-full w-[18%]  flex flex-col ">

            <ScrollArea className="flex-1 px-3 py-4 space-y-[2rem]">
                {navItems.map((item, index) => (
                    <Link key={index} href={item.href || "#"}>
                        <Button
                            variant="ghost"
                            className="w-full justify-start mb-5 gap-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-lg"
                        >
                            <item.icon className="size-5" />
                            {item.label}
                        </Button>
                    </Link>
                ))}
            </ScrollArea>


        </aside>
    );
}
