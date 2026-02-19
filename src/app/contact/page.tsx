"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import PageContainer from "@/components/layout/PageContainer";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const contactInfoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            gsap.from(formRef.current, {
                y: 80,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out",
            });

            gsap.from(contactInfoRef.current, {
                y: 80,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: "power3.out",
            });
        });

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: Connect to email service (e.g., SendGrid, Resend, or serverless function)
        // For now, just show success message

        setSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({ name: "", email: "", message: "" });
            setSubmitted(false);
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <main
            className="relative min-h-screen w-full overflow-hidden flex flex-col items-center bg-white"
            style={{
                paddingTop: '10rem',
                paddingBottom: '10rem'
            }}
        >

            <PageContainer className="relative z-10 w-full">
                {/* Title */}
                <div className="text-center mb-16 md:mb-20 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 ref={titleRef} className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 bg-gradient-to-r from-[var(--color-accent-blue)] via-[var(--color-accent-electric)] to-[var(--color-accent-purple)] bg-clip-text text-transparent">
                            Get In Touch
                        </h1>
                        <p className="text-xl md:text-2xl lg:text-3xl font-light text-[var(--color-text-secondary)]">Let's discuss your next project</p>
                    </motion.div>
                </div>

                <div className="w-full flex justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 xl:gap-24 w-full max-w-[1200px] items-center">
                        {/* Contact Form */}
                    <motion.div
                        className="w-full"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-white rounded-3xl p-8 md:p-10 lg:p-12">
                            <div>
                                <label htmlFor="name" className="block text-base md:text-lg font-bold mb-3 text-[var(--color-text-primary)]">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white border-2 border-[var(--color-dark-border)] rounded-xl focus:outline-none focus:border-[var(--color-accent-blue)] focus:ring-4 focus:ring-[var(--color-accent-blue)]/10 transition-all text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] text-base md:text-lg hover:border-[var(--color-text-muted)] hover:shadow-sm"
                                    style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', paddingTop: '1rem', paddingBottom: '1rem' }}
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-base md:text-lg font-bold mb-3 text-[var(--color-text-primary)]">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white border-2 border-[var(--color-dark-border)] rounded-xl focus:outline-none focus:border-[var(--color-accent-blue)] focus:ring-4 focus:ring-[var(--color-accent-blue)]/10 transition-all text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] text-base md:text-lg hover:border-[var(--color-text-muted)] hover:shadow-sm"
                                    style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', paddingTop: '1rem', paddingBottom: '1rem' }}
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-base md:text-lg font-bold mb-3 text-[var(--color-text-primary)]">
                                    Tell us about your project
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full bg-white border-2 border-[var(--color-dark-border)] rounded-xl focus:outline-none focus:border-[var(--color-accent-blue)] focus:ring-4 focus:ring-[var(--color-accent-blue)]/10 transition-all resize-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] text-base md:text-lg hover:border-[var(--color-text-muted)] hover:shadow-sm"
                                    style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', paddingTop: '1rem', paddingBottom: '1rem' }}
                                    placeholder="Share your vision with us..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative w-full bg-gradient-to-r from-[var(--color-accent-blue)] via-[var(--color-accent-electric)] to-[var(--color-accent-purple)] text-white text-lg md:text-xl font-bold rounded-xl shadow-xl shadow-[var(--color-accent-blue)]/30 hover:shadow-2xl hover:shadow-[var(--color-accent-blue)]/40 transition-all overflow-hidden group"
                                style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-white/20"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Send Message
                                    <motion.svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                        viewBox="0 0 24 24"
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </motion.svg>
                                </span>
                            </motion.button>

                            {submitted && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-6 bg-gradient-to-r from-[var(--color-accent-blue)]/10 to-[var(--color-accent-purple)]/10 border-2 border-[var(--color-accent-blue)] rounded-xl text-center text-[var(--color-accent-blue)] font-semibold text-lg"
                                >
                                    ✓ Thank you! We'll get back to you soon.
                                </motion.div>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        className="w-full"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div
                            ref={contactInfoRef}
                            className="relative bg-white rounded-3xl shadow-2xl w-full border-2 border-[var(--color-accent-blue)]/20 overflow-hidden"
                            style={{
                                padding: "clamp(2rem, 4vw, 3.5rem)",
                            }}
                        >
                            {/* Decorative gradient background */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[var(--color-accent-blue)]/10 to-transparent rounded-full blur-2xl -z-10" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[var(--color-accent-purple)]/10 to-transparent rounded-full blur-2xl -z-10" />

                            {/* Contact items - ใช้ inline style ให้ระยะห่างเห็นผลแน่นอน */}
                            <motion.div
                                className="relative"
                                style={{ marginBottom: "1.5rem" }}
                                whileHover={{ x: 2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="flex items-center gap-4" style={{ marginBottom: "1rem" }}>
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-purple)] flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] leading-relaxed">Email</h3>
                                </div>
                                <a
                                    href="mailto:jpmgroupteam@gmail.com"
                                    className="text-[var(--color-accent-blue)] hover:text-[var(--color-accent-purple)] transition-colors font-medium text-lg md:text-xl block ml-16 leading-loose"
                                    style={{ marginTop: "0.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", lineHeight: 1.9 }}
                                >
                                    jpmgroupteam@gmail.com
                                </a>
                            </motion.div>

                            <motion.div
                                className="relative"
                                style={{ marginBottom: "1.5rem" }}
                                whileHover={{ x: 2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="flex items-center gap-4" style={{ marginBottom: "1rem" }}>
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-electric)] flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] leading-relaxed">Phone</h3>
                                </div>
                                <a
                                    href="tel:+66822941541"
                                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-blue)] transition-colors text-lg md:text-xl block ml-16 leading-loose"
                                    style={{ marginTop: "0.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", lineHeight: 1.9 }}
                                >
                                    082-2941541 (Jha)
                                </a>
                            </motion.div>

                            <div style={{ paddingTop: "1.5rem" }} className="border-t-2 border-[var(--color-dark-border)]">
                                <div className="flex items-center gap-4" style={{ marginBottom: "1rem" }}>
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-blue)] flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] leading-relaxed">Follow Us</h3>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 ml-16" style={{ marginTop: "1rem" }}>
                                    <motion.a
                                        href="https://line.me/R/ti/p/@jpmgroup"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-12 h-12 bg-[#00B900]/10 border-2 border-[#00B900]/40 rounded-full flex items-center justify-center hover:bg-[#00B900] hover:border-[#00B900] hover:text-white transition-all text-[#00B900] shadow-md"
                                        aria-label="LINE @jpmgroup"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.039 1.085l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                        </svg>
                                    </motion.a>
                                    <motion.a
                                        href="#"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-12 h-12 bg-gradient-to-br from-[var(--color-accent-purple)]/10 to-[var(--color-accent-electric)]/10 border-2 border-[var(--color-accent-purple)]/30 rounded-full flex items-center justify-center hover:border-[var(--color-accent-purple)] hover:bg-[var(--color-accent-purple)] hover:text-white transition-all text-[var(--color-accent-purple)] shadow-md"
                                        aria-label="LinkedIn"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    </div>
                </div>
            </PageContainer>
        </main>
    );
}
