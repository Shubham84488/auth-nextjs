"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/login", "/signup","/forgotPassword","/resetPassword","/verifyEmail","/profile"];
  const hideLayout = noLayoutRoutes.includes(pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="relative overflow-hidden">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
