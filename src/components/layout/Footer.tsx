"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { pathnames, prefixPath } from "@/i18n/config";
import LanguageSwitcher from "./LanguageSwitcher";

const footerLinks = [
  { key: "about" as const, path: pathnames.about },
  { key: "faq" as const, path: pathnames.faq },
  { key: "contact" as const, path: pathnames.contact },
] as const;

/** ใช้ layout เดียวกับ Navbar: wrapper + inner max-w-[1600px] flex justify-between */
const navLayoutStyle = {
  wrapper: {
    paddingLeft: "clamp(1rem, 4vw, 4rem)" as const,
    paddingRight: "clamp(1rem, 4vw, 4rem)" as const,
  },
};

export default function Footer() {
  const { t, locale } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t border-slate-200 bg-white min-w-0"
      style={{
        paddingTop: "clamp(1.5rem, 4vw, 2.5rem)",
        paddingBottom: "clamp(1.5rem, 4vw, 2.5rem)",
      }}
    >
      {/* โครงเดียวกับ Navbar: จอเต็ม + padding แนวนอน */}
      <div className="w-full flex justify-center min-w-0" style={navLayoutStyle.wrapper}>
        {/* แถวเดียวกับ Nav: max-w-[1600px] flex items-center justify-between */}
        <div className="w-full max-w-[1600px] flex flex-wrap items-center justify-between gap-4 min-w-0">
          {/* ซ้าย: JPM Interactive (ตรงกับ logo ใน nav) */}
          <Link
            href={prefixPath(locale, "/")}
            className="text-lg font-semibold text-slate-800 hover:text-[#6B9FF7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9FF7] rounded shrink-0"
          >
            JPM Interactive
          </Link>

          {/* กลาง: ลิงก์ + LINE + ภาษา */}
          <nav
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 shrink-0"
            aria-label="Footer"
          >
            {footerLinks.map(({ key, path }) => (
              <Link
                key={key}
                href={prefixPath(locale, path)}
                className="text-sm text-slate-600 hover:text-[#6B9FF7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9FF7] rounded px-1"
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
            <a
              href="https://line.me/R/ti/p/@328opglx?oat_content=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#00B900] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B900] rounded inline-flex items-center justify-center"
              aria-label="LINE @328opglx"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.039 1.085l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            </a>
            <LanguageSwitcher variant="minimal" />
          </nav>

          {/* ขวา: ลิขสิทธิ์ (ตรงกับกลุ่มปุ่มขวาใน nav) */}
          <p className="text-xs text-slate-400 shrink-0" style={{ margin: 0 }}>
            © {currentYear} JPM Interactive. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
