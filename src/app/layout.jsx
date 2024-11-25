import "./globals.css";
import { Navbar, NavbarBrand } from "flowbite-react";

export const metadata = {
  title: "Welcome to Kank AI",
  description: "Aplikasi Chat AI canggih yang memberikan pengalaman interaktif dan responsif dengan kecerdasan buatan. Dapatkan jawaban instan untuk pertanyaan Anda, buat percakapan alami, dan nikmati komunikasi yang lebih efisien.",
  openGraph: {
    title: "Welcome to Kank AI",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <link rel="icon" href="https://flowbite-react.com/favicon.svg" sizes="any" />
        <body className="bg-slate-900 overflow-y-hidden">
            <Navbar fluid rounded className="shadow bg-slate-800 z-40 fixed left-0 top-0 w-full rounded-none">
                <NavbarBrand>
                    <img src="https://flowbite-react.com/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-white">Kank AI</span>
                    <span className="ms-2 self-end text-white text-xs">by Alwi Sahrul Al Falah</span>
                </NavbarBrand>
            </Navbar>
            {children}
        </body>
    </html>
  );
}
