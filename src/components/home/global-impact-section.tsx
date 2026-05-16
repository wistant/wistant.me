import Earth from "@/components/mvpblocks/globe";

export function GlobalImpactSection() {
  return (
    <div className="w-full mx-auto py-2 md:py-12 flex justify-center items-center overflow-hidden">
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl aspect-square flex justify-center items-center">
            <Earth className="w-full h-full" />
        </div>
    </div>
  );
}
