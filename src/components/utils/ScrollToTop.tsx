"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** เลื่อนไปที่บนทุกครั้งที่เปลี่ยนหน้า (รวม client-side navigation) */
export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
