import { getAdminDictionary } from "@/lib/dictionary";
import { Language } from "@/types/locale";
import { getContent } from "@/lib/admin/server/cms/engine";

// Unified settings manager
import { SettingsManager } from "@/components/admin/dashboard/settings/settings-manager";
import { ResumeUpload } from "@/components/admin/dashboard/resume-upload";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getAdminDictionary(lang);
  const siteSettings = await getContent("settings", "site", lang);

  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{dict.settings?.title || "Settings"}</h1>
        <p className="text-muted-foreground">Manage your portfolio configurations and global site appearance.</p>
      </div>

      <ResumeUpload />
      <SettingsManager initialSiteSettings={siteSettings} lang={lang} />
    </div>
  );
}
