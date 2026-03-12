
import { getAdminDictionary } from "@/lib/dictionary";
import { Language } from "@/types/locale";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Analytics01Icon,
  Time01Icon,
} from "@hugeicons/core-free-icons";

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getAdminDictionary(lang);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-6 text-center">
      <div className="p-4 rounded-3xl bg-primary/10 animate-pulse">
        <HugeiconsIcon icon={Analytics01Icon} className="size-16 text-primary" />
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-bold tracking-tight">{dict.analytics.title}</h1>
        <p className="text-muted-foreground italic">
          Cette section est en cours de développement. 
          Bientôt, vous pourrez visualiser les statistiques détaillées de votre portfolio, 
          les sources de trafic et l'engagement des visiteurs.
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm font-medium text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full">
        <HugeiconsIcon icon={Time01Icon} className="size-4" />
        Déploiement prévu prochainement
      </div>
    </div>
  );
}
