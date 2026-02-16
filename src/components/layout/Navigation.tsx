"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
const navItems = [
    { name: "Home", path: "/" },
    { name: "Works", path: "/works" },
    { name: "Articles", path: "/content" },
    { name: "Contact", path: "/contact" },
];

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

                        {/* Menu */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white/95 backdrop-blur-2xl border-l border-gray-200 z-50 md:hidden shadow-2xl"
                        >
                            <div className="flex flex-col h-full p-8 pt-24">
                                {navItems.map((item, index) => {
                                    const isActive = pathname === item.path;
                                    return (
                                        <motion.div
                                            key={item.path}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                href={item.path}
                                                onClick={(e) => {
                                                    handleNavClick(e, item.path);
                                                    setMobileMenuOpen(false);
                                                }}
                                            >
                                                <motion.div
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`py-4 px-6 mb-2 rounded-xl transition-all duration-300 ${isActive
                                                        ? "bg-gradient-to-r from-[#6B9FF7]/20 to-[#8B9FF8]/20 text-gray-900"
                                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                                        }`}
                                                >
                                                    <span className="text-lg font-medium">
                                                        {item.name}
                                                    </span>
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="mobileActiveIndicator"
                                                            className="h-1 w-12 bg-gradient-to-r from-[#6B9FF7] to-[#8B9FF8] rounded-full mt-2"
                                                        />
                                                    )}
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
