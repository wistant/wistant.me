import { FloatingDock } from '@/components/dock/floating-dock';
import Image from 'next/image';
import {
  Github,
  Home,
  Layers,
  RefreshCw,
  Terminal,
  Twitter,
} from 'lucide-react';

export default function FloatingDockDemo() {
  const links = [
    {
      title: 'Home',
      icon: (
        <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#',
    },
    {
      title: 'Products',
      icon: (
        <Terminal className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#',
    },
    {
      title: 'Components',
      icon: (
        <Layers className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#',
    },
    {
      title: 'MVPBlocks',
      icon: (
        <div className="relative h-5 w-5">
          <Image
            src="https://i.postimg.cc/j5dW4vFd/Mvpblocks.webp"
            fill
            alt="MVPBlocks Logo"
            className="rounded-full object-cover"
          />
        </div>
      ),
      href: '#',
    },
    {
      title: 'Changelog',
      icon: (
        <RefreshCw className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#',
    },
    {
      title: 'Twitter',
      icon: (
        <Twitter className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#',
    },
    {
      title: 'GitHub',
      icon: (
        <Github className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#',
    },
  ];
  return (
    <div className="flex h-[35rem] w-full items-center justify-center">
      <FloatingDock mobileClassName="translate-y-20" items={links} />
    </div>
  );
}
