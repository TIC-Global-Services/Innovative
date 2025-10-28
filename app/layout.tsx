import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Innovative Interiors",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
        <ToastContainer />
        <div className="fixed bottom-10 right-6 z-50 max-w-2xl rounded-3xl px-5">
          <img 
            src="/20.png" 
            alt="Logo" 
            className="md:w-30 md:h-30 h-20 w-20 " 
          />
        </div>
      </body>
    </html>
  );
}