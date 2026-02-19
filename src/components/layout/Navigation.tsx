"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
const navItems = [
    { name: "Home", path: "/", icon: "home" },
    { name: "Works", path: "/works", icon: "works" },
    { name: "Articles", path: "/content", icon: "articles" },
    { name: "Contact", path: "/contact", icon: "contact" },
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
        default:
            return null;
    }
}

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    const handleNavClick = (e: React.MouseEvent, path: string) => {
        if (pathname === "/" && path === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setMobileMenuOpen(false);
    };

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-50"
            >
                <div
                    className="w-full flex justify-center"
                    style={{
                        paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
                        paddingRight: "clamp(1.5rem, 5vw, 4rem)",
                    }}
                >
                    <div className="w-full max-w-[1600px] flex items-center justify-between h-16 sm:h-20">
                        {/* Logo - Text only, no background */}
                        <Link href="/" onClick={(e) => handleNavClick(e, '/')} className="relative group">
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400 }}
                                className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#6B9FF7] to-[#8B9FF8] bg-clip-text text-transparent"
                            >
                                JPM Interactive
                            </motion.span>
                        </Link>

                        {/* Desktop Navigation - Floating Pill */}
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="hidden md:flex items-center bg-white/90 backdrop-blur-md shadow-lg rounded-full border border-gray-200/50"
                            style={{ gap: '6px', padding: '8px 10px' }}
                        >
                            {navItems.map((item) => {
                                const isActive = pathname === item.path;
                                return (
                                    <Link key={item.path} href={item.path} onClick={(e) => handleNavClick(e, item.path)}>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                                                isActive 
                                                    ? "bg-gradient-to-r from-[#7BA9F7] to-[#8B9FF8] text-white shadow-md" 
                                                    : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                            style={{ padding: '10px 24px' }}
                                        >
                                            {item.name}
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </motion.div>

                        {/* Mobile Menu Button - Floating */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-3 text-gray-900 bg-white/90 backdrop-blur-md rounded-full shadow-lg"
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
            </nav>

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
                                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Menu</span>
                                    <div className="h-0.5 w-16 mt-2 rounded-full bg-gradient-to-r from-[#7BA9F7] to-[#8B5CF6]" />
                                </div>

                                {navItems.map((item, index) => {
                                    const isActive = pathname === item.path;
                                    return (
                                        <motion.div
                                            key={item.path}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ type: "spring", damping: 24, stiffness: 300, delay: index * 0.06 }}
                                        >
                                            <Link
                                                href={item.path}
                                                onClick={(e) => {
                                                    handleNavClick(e, item.path);
                                                    setMobileMenuOpen(false);
                                                }}
                                            >
                                                <motion.div
                                                    whileTap={{ scale: 0.98 }}
                                                    transition={{ duration: 0.15 }}
                                                    className={`flex items-center gap-4 py-5 px-5 mb-2 rounded-2xl transition-colors duration-300 touch-manipulation ${
                                                        isActive
                                                            ? "bg-gradient-to-r from-[#7BA9F7] to-[#8B9FF8] text-white shadow-lg shadow-[#7BA9F7]/30"
                                                            : "text-slate-600 active:bg-slate-100 hover:bg-white/60 hover:text-slate-900 hover:shadow-sm"
                                                    }`}
                                                >
                                                    <span className={isActive ? "text-white" : "text-slate-500"}>
                                                        <NavIcon type={item.icon} />
                                                    </span>
                                                    <span className="text-lg font-semibold">
                                                        {item.name}
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
