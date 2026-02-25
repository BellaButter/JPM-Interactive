"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";
import { getLocaleFromPathname, pathnames, prefixPath } from "@/i18n/config";

const navItems = [
    { key: "home", path: "/", icon: "home" },
    { key: "about", path: pathnames.about, icon: "about" },
    { key: "services", path: "/services", icon: "works" },
    { key: "projects", path: "/case-studies", icon: "works" },
    { key: "articles", path: "/content", icon: "articles" },
    { key: "industries", path: "/industries", icon: "works" },
    { key: "contact", path: "/contact", icon: "contact" },
];

function NavIcon({ type, className }: { type: string; className?: string }) {
    const c = className ?? "w-5 h-5";
    switch (type) {
        case "home":
            return (
                <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            );
        case "works":
            return (
                <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.655M9 10a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
            );
        case "articles":
            return (
                <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            );
        case "contact":
            return (
                <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            );
        case "about":
            return (
                <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        default:
            return null;
    }
}

export default function Navigation() {
    const { t } = useLocale();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const [menuPanelMarginRight, setMenuPanelMarginRight] = useState(88);
    const pathname = usePathname();
    const locale = getLocaleFromPathname(pathname) ?? "en";
    const contactHref = prefixPath(locale, "/contact");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menus on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setMenuDropdownOpen(false);
    }, [pathname]);

    // Lusion-style: align menu panel right edge with Menu/Close button
    useEffect(() => {
        if (!menuDropdownOpen || typeof window === "undefined") return;
        const measure = () => {
            const btn = menuButtonRef.current;
            if (!btn) return;
            const btnRight = btn.getBoundingClientRect().right;
            const paddingRight = Math.min(64, Math.max(24, window.innerWidth * 0.05));
            const containerRight = window.innerWidth - paddingRight;
            setMenuPanelMarginRight(Math.max(0, containerRight - btnRight));
        };
        const t = setTimeout(measure, 50);
        window.addEventListener("resize", measure);
        return () => {
            clearTimeout(t);
            window.removeEventListener("resize", measure);
        };
    }, [menuDropdownOpen]);


    const homeHref = prefixPath(locale, "/");
    const handleNavClick = (e: React.MouseEvent, path: string, href: string) => {
        if (path === "/" && pathname === homeHref) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setMobileMenuOpen(false);
        setMenuDropdownOpen(false);
    };

    const isActive = (itemPath: string) => {
        const href = prefixPath(locale, itemPath);
        if (itemPath === "/") return pathname === href || pathname === `/${locale}`;
        return pathname === href || pathname.startsWith(href + "/");
    };

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-[100]"
            >
                <div
                    className="w-full flex justify-center min-w-0"
                    style={{
                        paddingLeft: "clamp(1rem, 4vw, 4rem)",
                        paddingRight: "clamp(1rem, 4vw, 4rem)",
                    }}
                >
                    <div className="w-full max-w-[1600px] flex items-center justify-between h-16 sm:h-20">
                        {/* Logo - Text only, no background */}
                        <Link href={homeHref} onClick={(e) => handleNavClick(e, "/", homeHref)} className="relative group">
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400 }}
                                className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-[#6B9FF7] to-[#8B9FF8] bg-clip-text text-transparent"
                            >
                                JPM Interactive
                            </motion.span>
                        </Link>

                        {/* Desktop Navigation - Lusion style: CTA pill + MENU dropdown + Language */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="hidden md:flex items-center gap-3"
                        >
                            {/* Let's Talk - CTA pill (theme gradient, padding เท่าเมนู) */}
                            <Link
                                href={contactHref}
                                onClick={(e) => handleNavClick(e, "/contact", contactHref)}
                                style={{ padding: "0.5rem 1rem" }}
                                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6B9FF7] to-[#8B5CF6] text-white text-base font-semibold uppercase tracking-wider shadow-lg shadow-[#6B9FF7]/25 hover:shadow-xl hover:shadow-[#6B9FF7]/30 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <span>{t("nav.letsTalk")}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-white/90 group-hover:bg-white transition-colors" aria-hidden />
                            </Link>

                            {/* MENU / CLOSE - light pill, opens overlay panel; เมื่อเปิดเมนู แสดง Close ตรงตำแหน่งเดียวกัน */}
                            <motion.button
                                ref={menuButtonRef}
                                type="button"
                                onClick={() => setMenuDropdownOpen((v) => !v)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{ padding: "0.5rem 1rem" }}
                                className={`inline-flex items-center gap-2 rounded-full text-base font-semibold uppercase tracking-wider transition-all duration-300 ${menuDropdownOpen
                                        ? "bg-[#6B9FF7]/10 text-[#6B9FF7] border-2 border-[#6B9FF7]/30 shadow-md"
                                        : "bg-white/90 text-slate-700 border-2 border-[#7BA9F7]/20 hover:border-[#6B9FF7]/40 hover:bg-[#f8faff] shadow-sm"
                                    }`}
                            >
                                {menuDropdownOpen ? (
                                    <>
                                        <span>{t("common.close")}</span>
                                        <span className="text-slate-400" aria-hidden>:</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{t("nav.menu")}</span>
                                        <span className="flex gap-0.5" aria-hidden>
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                                        </span>
                                    </>
                                )}
                            </motion.button>
                        </motion.div>

                        {/* Mobile: Let's Talk + Menu (hamburger) - theme style */}
                        <div className="flex md:hidden items-center gap-2">
                            <Link
                                href={contactHref}
                                onClick={(e) => handleNavClick(e, "/contact", contactHref)}
                                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#6B9FF7] to-[#8B5CF6] text-white text-sm font-semibold uppercase tracking-wider px-3 py-2 shadow-md shadow-[#6B9FF7]/20"
                            >
                                <span>{t("nav.letsTalk")}</span>
                                <span className="w-1 h-1 rounded-full bg-white/90" aria-hidden />
                            </Link>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-3 text-slate-700 bg-white/90 border-2 border-[#7BA9F7]/20 rounded-full shadow-sm hover:border-[#6B9FF7]/40 transition-colors"
                            >
                                <motion.svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    animate={mobileMenuOpen ? "open" : "closed"}
                                >
                                    <motion.path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        variants={{
                                            closed: { d: "M4 6h16M4 12h16M4 18h16" },
                                            open: { d: "M6 18L18 6M6 6l12 12" },
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.svg>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Desktop Menu Overlay - card style (reference) */}
            <AnimatePresence>
                {menuDropdownOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setMenuDropdownOpen(false)}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[90] hidden md:block"
                            aria-hidden
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 300 }}
                            className="fixed top-20 left-0 right-0 bottom-0 z-[100] hidden md:flex overflow-y-auto"
                        >
                            {/* คลิกด้านนอก (ซ้าย) เพื่อปิดเมนู */}
                            <div
                                className="flex-1 min-w-0 cursor-pointer"
                                onClick={() => setMenuDropdownOpen(false)}
                                aria-label={t("common.close")}
                            />
                            <div
                                className="flex justify-end flex-shrink-0 min-h-0"
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    paddingLeft: "clamp(1.75rem, 6vw, 4rem)",
                                    paddingRight: "clamp(1.75rem, 6vw, 4rem)",
                                }}
                            >
                                <div className="w-full max-w-[1600px] flex justify-end">
                                    <div
                                        className="w-full max-w-[420px] flex flex-col bg-transparent"
                                        style={{ marginRight: menuPanelMarginRight }}
                                    >
                                        <div className="p-6 flex flex-col gap-6 flex-1">
                                            {/* Card: Nav links - แบบ Lusion: การ์ดใหญ่ ตัวหนังสือใหญ่ ระยะห่างเยอะ */}
                                            <div
                                                className="rounded-2xl bg-white border-2 border-[#7BA9F7]/15 overflow-hidden"
                                                style={{
                                                    paddingTop: "2.5rem",
                                                    paddingBottom: "2.5rem",
                                                    paddingLeft: "3rem",
                                                    paddingRight: "2.5rem",
                                                }}
                                            >
                                                <div className="flex flex-col gap-6">
                                                    {navItems.map((item) => {
                                                        const href = prefixPath(locale, item.path);
                                                        const active = isActive(item.path);
                                                        const isContact = item.path === "/contact";
                                                        return (
                                                            <Link
                                                                key={item.path}
                                                                href={href}
                                                                onClick={(e) => handleNavClick(e, item.path, href)}
                                                                className={`group flex items-center justify-between gap-4 mx-3 px-6 py-5 text-xl font-bold uppercase tracking-[0.12em] leading-relaxed transition-colors rounded-xl hover:bg-[#6B9FF7]/5 active:bg-[#6B9FF7]/10 active:scale-[0.99] touch-manipulation ${isContact
                                                                        ? "text-[#6B9FF7]"
                                                                        : active
                                                                            ? "text-[#6B9FF7]"
                                                                            : "text-slate-700 hover:text-[#6B9FF7]"
                                                                    }`}
                                                            >
                                                                <span className="flex items-center gap-3 leading-relaxed">
                                                                    {active && !isContact && <span className="w-1.5 h-1.5 rounded-full bg-[#6B9FF7]" aria-hidden />}
                                                                    {t(`nav.${item.key}`)}
                                                                </span>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Menu - gradient/glass drawer with blue-purple tint */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm z-50 md:hidden backdrop-blur-2xl border-l border-[#7BA9F7]/30 shadow-[ -4px_0_24px_rgba(123,169,247,0.18) ]"
                            style={{
                                background: "linear-gradient(160deg, #f0f4ff 0%, #e8f0ff 45%, #f3e8ff 100%)",
                            }}
                        >
                            <div className="flex flex-col h-full p-6 pt-20">
                                {/* Drawer header */}
                                <div className="mb-8 px-2">
                                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{t("nav.menu")}</span>
                                    <div className="h-0.5 w-16 mt-2 rounded-full bg-gradient-to-r from-[#7BA9F7] to-[#8B5CF6]" />
                                </div>

                                {navItems.map((item, index) => {
                                    const href = prefixPath(locale, item.path);
                                    const active = isActive(item.path);
                                    return (
                                        <motion.div
                                            key={item.path}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ type: "spring", damping: 24, stiffness: 300, delay: index * 0.06 }}
                                        >
                                            <Link
                                                href={href}
                                                onClick={(e) => {
                                                    handleNavClick(e, item.path, href);
                                                    setMobileMenuOpen(false);
                                                }}
                                            >
                                                <motion.div
                                                    whileTap={{ scale: 0.98 }}
                                                    transition={{ duration: 0.15 }}
                                                    className={`flex items-center gap-4 py-6 px-6 mb-4 rounded-2xl transition-colors duration-300 touch-manipulation uppercase tracking-[0.1em] leading-relaxed ${active
                                                            ? "bg-gradient-to-r from-[#7BA9F7] to-[#8B9FF8] text-white shadow-lg shadow-[#7BA9F7]/30"
                                                            : "text-slate-600 active:bg-slate-100 hover:bg-white/60 hover:text-slate-900 hover:shadow-sm"
                                                        }`}
                                                >
                                                    <span className={active ? "text-white" : "text-slate-500"}>
                                                        <NavIcon type={item.icon} />
                                                    </span>
                                                    <span className="text-xl font-semibold">
                                                        {t(`nav.${item.key}`)}
                                                    </span>
                                                </motion.div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}

                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
