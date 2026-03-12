"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/admin/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/admin/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/admin/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  Megaphone01Icon,
  Layers01Icon,
  UserMultiple02Icon,
  Settings01Icon,
  ArrowDown01Icon,
  UserIcon,
  Logout01Icon,
  Image01Icon,
} from "@hugeicons/core-free-icons";

import { Language, AdminDictionary } from "@/types/locale";

interface SidebarProps extends React.ComponentProps<typeof Sidebar> {
  dict: AdminDictionary;
  lang: Language;
}

export function DashboardSidebar({ dict, lang, ...props }: SidebarProps) {
  const navItems = [
    { title: dict.sidebar.dashboard, icon: DashboardSquare01Icon, href: `/${lang}/admin`, isActive: true },
    { title: dict.sidebar.projects, icon: Layers01Icon, href: `/${lang}/admin/projects` },
    { title: dict.sidebar.blog, icon: Megaphone01Icon, href: `/${lang}/admin/blog` },
    { title: dict.sidebar.resume, icon: UserMultiple02Icon, href: `/${lang}/admin/resume` },
    { title: dict.sidebar.gallery, icon: Image01Icon, href: `/${lang}/admin/gallery` },
    { title: dict.sidebar.analytics || "Analytics", icon: DashboardSquare01Icon, href: `/${lang}/admin/analytics` },
  ];

  const bottomNavItems = [
    { title: dict.sidebar.settings, icon: Settings01Icon, href: `/${lang}/admin/settings` },
  ];

  return (
    <Sidebar collapsible="offcanvas" className="border-r-0!" {...props}>
      <SidebarHeader className="px-3 py-3">
        <div className="flex items-center justify-between w-full">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button className="flex items-center gap-2 outline-none w-full justify-start">
                  <Avatar className="size-7.5 shrink-0">
                    <AvatarImage src="/admin-avatar.jpg" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">Administrator</span>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="size-3 text-muted-foreground shrink-0" />
                </button>
              }
            />
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuGroup>
                <p className="text-muted-foreground text-xs font-medium px-2 py-1.5">
                  Account
                </p>
                <DropdownMenuItem>
                  <HugeiconsIcon icon={UserIcon} className="size-4 mr-2" />
                  Profile
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                <HugeiconsIcon icon={Logout01Icon} className="size-4 mr-2" />
                {dict.sidebar.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.isActive}
                    className="h-9"
                    render={<Link href={item.href} />}
                  >
                    <HugeiconsIcon icon={item.icon} className="size-4 shrink-0" />
                    <span className="text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>


      </SidebarContent>

      <SidebarFooter className="px-2 pb-3">
        <SidebarMenu>
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className="h-9" render={<Link href={item.href} />}>
                <HugeiconsIcon icon={item.icon} className="size-4 shrink-0 text-muted-foreground" />
                <span className="text-sm">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

      </SidebarFooter>
    </Sidebar>
  );
}
