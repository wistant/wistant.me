import { getOAuthGoogleUrl } from "@/admin/server/oauth/google";
import { Button } from "@/admin/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { LockPasswordIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySession } from "@/admin/server/oauth/session";

export default async function AdminLogin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  
  // If already authenticated, bypass login
  if (token) {
    const session = await verifySession(token);
    if (session) {
      redirect("/en/admin");
    }
  }

  const googleUrl = getOAuthGoogleUrl();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border bg-card p-10 shadow-lg">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <HugeiconsIcon icon={LockPasswordIcon} className="size-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Wistant CMS</h1>
          <p className="text-sm text-muted-foreground">
            Zone restreinte. Authentification requise.
          </p>
        </div>

        <div className="grid gap-4">
          <a href={googleUrl}>
            <Button className="w-full group" size="lg">
              Continuer avec Google
              <HugeiconsIcon 
                icon={ArrowRight01Icon} 
                className="ml-2 size-4 transition-transform group-hover:translate-x-1" 
              />
            </Button>
          </a>
          
          <p className="text-center text-xs text-muted-foreground">
            L&apos;accès est réservé à l&apos;administrateur système (Zero-Trust).
          </p>
        </div>
      </div>
    </div>
  );
}
