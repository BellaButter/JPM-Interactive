import type { Locale } from "@/types/locale";
import HomePageContent from "@/app/HomePageContent";
import ThHomeContent from "@/app/ThHomeContent";

export default function HomePage({ locale }: { locale: Locale }) {
  if (locale === "en") {
    return <HomePageContent />;
  }
  return <ThHomeContent />;
}
