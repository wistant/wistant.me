import { VerifiedIcon } from 'lucide-react';

export interface SocialPost {
  id: string;
  platform: 'x' | 'linkedin';
  authorName: string;
  authorHandle: string;
  authorImage: string;
  content: string[];
  isVerified: boolean;
  timestamp: string;
  url: string;
  reply?: {
    authorName: string;
    authorHandle: string;
    authorImage: string;
    content: string;
    isVerified: boolean;
    timestamp: string;
  };
}

export const socialPosts: SocialPost[] = [
  {
    id: '1',
    platform: 'x',
    authorName: 'Wistant Kode',
    authorHandle: 'wistant_kode',
    authorImage: 'https://i.postimg.cc/8zX4X0xJ/avatar.png',
    content: [
      'Just migrated my entire portfolio to Content Collections + MDX! 🚀',
      'The performance gains are insane. ⚡',
      '#NextJS #WebPerf #BuildInPublic',
    ],
    isVerified: true,
    timestamp: 'Feb 24, 2026',
    url: 'https://x.com/wistant_kode',
    reply: {
      authorName: 'Vercel',
      authorHandle: 'vercel',
      authorImage: 'https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg',
      content: 'Clean work! 🔥',
      isVerified: true,
      timestamp: '2h ago',
    },
  },
  {
    id: '2',
    platform: 'linkedin',
    authorName: 'Wistant Kode',
    authorHandle: 'wistantkode',
    authorImage: 'https://i.postimg.cc/8zX4X0xJ/avatar.png',
    content: [
      'Proud to announce that wistant.dev is now optimized for Elite performance (100/100 Lighthouse).',
      'It was a long journey of image optimization and font refinement.',
    ],
    isVerified: false,
    timestamp: '2 days ago',
    url: 'https://linkedin.com/in/wistantkode',
  },
];
