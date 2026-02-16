"use client";

import { useEffect } from "react";

/** รีเฟรชหรือโหลดหน้าใหม่ → เลื่อนไปที่บน (HeroSection) ทุกครั้ง */
export default function ScrollToTop() {
    useEffect(() => {
        if (typeof window === "undefined") return;
        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
    }, []);

    return null;
}
