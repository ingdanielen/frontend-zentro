"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer/Footer";

export function FooterWrapper() {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/admin";

  if (isAdminRoute) {
    return null;
  }

  return (
    <div className="pt-24">
      <Footer />
    </div>
  );
} 