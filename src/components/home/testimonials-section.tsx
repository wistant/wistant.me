import TestimonialsCarousel from "@/components/mvpblocks/testimonials-carousel";

const engineeringTestimonials = [
  {
    text: 'Wistant’s technical deep dives on Vendure unlocked our team. His understanding of headless architecture and IoC patterns is rare.',
    imageSrc: 'https://github.com/shadcn.png',
    name: 'Arjun M.',
    username: '@arjdev',
    role: 'Lead Backend Developer',
  },
  {
    text: 'The architectural rigour in Shoperzz has completely changed how we think about scaling e-commerce platforms in emerging markets.',
    imageSrc: 'https://i.pravatar.cc/150?u=2',
    name: 'Sara L.',
    username: '@sara_codes',
    role: 'CTO',
  },
  {
    text: 'His dotfiles CLI is a masterclass in clean engineering and high-end aesthetic. It’s a game changer for developer productivity.',
    imageSrc: 'https://i.pravatar.cc/150?u=3',
    name: 'Devon Carter',
    username: '@devninja',
    role: 'Senior System Engineer',
  },
  {
    text: 'A rare balance between extreme technical depth and a relentless pursuit of product aesthetic. True software craftsmanship.',
    imageSrc: 'https://i.pravatar.cc/150?u=4',
    name: 'Chloe Winters',
    username: '@cloudchloe',
    role: 'Product Architect',
  },
];

export function TestimonialsSection() {
  return (
    <div className="w-full">
      <TestimonialsCarousel 
        title="Peer Validation"
        subtitle="What fellow engineers say about the architecture, systems, and open-source contributions."
        testimonials={engineeringTestimonials}
        className="py-12 md:py-24"
      />
    </div>
  );
}
