import Link from "next/link";
import { FlickeringGrid } from "@/components/ui/magicui/flickering-grid";

export default function ContactSection({ dict, whatsappUrl }: { dict: Record<string, any>; whatsappUrl?: string }) {
  return (
    <div className="border border-border/60 rounded-xl p-10 relative bg-muted/10">
      <div className="absolute -top-4 border border-border bg-black shadow-sm z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-white text-sm font-medium">{dict.navigation.contact || "Contact"}</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-clash">
          {dict.contact.title}
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance leading-relaxed">
          {dict.contact.subtitle}{" "}
          <Link
            href={whatsappUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-4 font-semibold"
          >
            {dict.contact.button}
          </Link>
          <br />
          {dict.contact.description}
        </p>
      </div>
    </div>
  );
}
