import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDictionary } from "@/lib/dictionary";
import { Language } from "@/types/locale";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col gap-10 max-w-[608px] mx-auto px-6 sm:px-0 py-16 min-h-screen">
      <div className="flex flex-col gap-6">
        <Link
          href={`/${lang}/projects`}
          className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm flex items-center gap-1.5 w-fit group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{dict.projects?.backToProjects || "projects"}</span>
        </Link>
      </div>
      {children}
    </div>
  );
}
