import { GradientBars } from '@/components/ui/magicui/gradient-bars';
import { TextReveal } from '@/components/ui/magicui/text-reveal';

export default function GradientBarsPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <GradientBars />
      <TextReveal className="text-foreground text-center text-4xl">
        Awesome backgrounds :)
      </TextReveal>
    </div>
  );
}
