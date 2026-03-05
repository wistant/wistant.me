import { getDictionary } from "@/lib/dictionary";
import ContactSection from "@/components/home/contact-section";
import BlurFade from "@/components/ui/magicui/blur-fade";

type Language = "en" | "fr";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-dvh flex flex-col gap-6 relative px-4 sm:px-6 lg:px-0 py-12 sm:py-24 max-w-3xl mx-auto">
      <section className="w-full flex justify-center">
        <div className="w-full max-w-2xl p-8 sm:p-12 lg:p-16">
          <BlurFade delay={0.04}>
            <div className="flex flex-col gap-4 text-center mb-12">
              <h1 className="text-4xl font-bold font-cal tracking-tighter sm:text-5xl">
                {dict.contact?.title || "Contact"}
              </h1>
              <p className="text-muted-foreground text-lg">
                {dict.contact?.subtitle || "Let's work together."}
              </p>
            </div>
            <ContactSection />
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
