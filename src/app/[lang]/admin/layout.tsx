import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Wistant CMS",
  description: "Git-based CMS for wistant.dev",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-dashboard-wrapper h-screen w-full bg-background text-foreground">
      {children}
    </div>
  );
}
