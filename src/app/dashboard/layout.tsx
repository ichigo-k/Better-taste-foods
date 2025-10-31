import React from "react";
import SideBar from "@/app/dashboard/sideBar";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen  bg-background text-foreground relative overflow-hidden">
            {/* Sidebar */}
            <SideBar />

            {/* Main scrollable content */}
            <main className="flex-1 md:ml-[18%] ml-0 p-6 overflow-y-auto">
                <div className="max-w-[1440px] mx-auto">{children}</div>
            </main>
        </div>
    );
}
