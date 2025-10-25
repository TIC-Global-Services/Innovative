"use client";

import React, { ReactNode } from "react";
import TopNav from "../ReusableComponenets/TopNav";


interface LayoutProps {
    children: ReactNode;
}

const SidebarLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen">
            <TopNav />

            <main className="flex-grow bg-[#FAFBFC] dark:bg-[#181818] flex flex-col overflow-y-auto">
                
                <div className="p-3">
                    {children}
                    
                </div>
            </main>
        </div>
    );
};

export default SidebarLayout;



