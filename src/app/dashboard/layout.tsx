import React from "react";
import SideBar from "@/app/dashboard/sideBar";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-[70%] bg-background text-foreground relative">

            <SideBar />


            <main className="flex-1 ml-[18%] p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
