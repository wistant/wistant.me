import { Suspense } from 'react';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';
import { socialPosts } from '@/data/social-posts';
import TweetCard from '@/components/mvpblocks/twittercard';
import { Metadata } from 'next';
import { DATA } from '@/data/resume';

export const metadata: Metadata = {
  title: 'Posts | Wistant Kode',
  description: 'Social sharing, insights, and quick thoughts from X and LinkedIn.',
  openGraph: {
    title: 'Posts | Wistant Kode',
    description: 'Social sharing, insights, and quick thoughts from X and LinkedIn.',
    type: 'website',
    url: `${DATA.url}/posts`,
  },
};

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute top-0 left-0 z-0 w-full h-[400px] mask-[linear-gradient(to_top,transparent_10%,black_80%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#3b82f6"
          maxOpacity={0.15}
          flickerChance={0.05}
        />
      </div>

      {/* Header Section */}
      <div className="pt-32 pb-16 px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-bold text-4xl md:text-6xl tracking-tighter mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Social Wall
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Quick thoughts, technical shares, and updates from X and LinkedIn.
          </p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
        <Suspense fallback={<div className="text-center py-20">Loading social posts...</div>}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {socialPosts.map((post) => (
              <div key={post.id} className="flex justify-center">
                {post.platform === 'x' ? (
                  <TweetCard
                    authorName={post.authorName}
                    authorHandle={post.authorHandle}
                    authorImage={post.authorImage}
                    content={post.content}
                    isVerified={post.isVerified}
                    timestamp={post.timestamp}
                    reply={post.reply}
                  />
                ) : (
                  /* LinkedIn simplistic override for now using TweetCard as base style */
                  <div className="w-full max-w-xl">
                    <TweetCard
                      authorName={post.authorName}
                      authorHandle={post.authorHandle}
                      authorImage={post.authorImage}
                      content={post.content}
                      isVerified={post.isVerified}
                      timestamp={post.timestamp}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
