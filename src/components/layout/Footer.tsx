"use client";

import PageContainer from "@/components/layout/PageContainer";
import { useLocale } from "@/context/LocaleContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
    const { t } = useLocale();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full max-w-[100vw] overflow-x-hidden bg-white border-t border-gray-200 flex flex-col items-center" style={{ padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2.5rem)" }}>
            <PageContainer className="w-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
                    <div className="text-center md:text-left">
                        <div className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                            <span className="bg-gradient-to-r from-[#6B9FF7] to-[#8B9FF8] bg-clip-text text-transparent">
                                JPM Interactive
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">{t("footer.tagline")}</p>
                    </div>

                    <LanguageSwitcher variant="minimal" />

                    {/* Social Links */}
                    <div className="flex items-center gap-6">
                        <a
                            href="https://line.me/R/ti/p/@jpmgroup"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-[#00B900] transition-colors duration-300"
                            aria-label="LINE @jpmgroup"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.039 1.085l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                            </svg>
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-sm text-gray-500 text-center md:text-right">
                        © {currentYear} JPM Interactive. {t("footer.copyright")}
                    </div>
                </div>
            </PageContainer>
        </footer>
    );
}
