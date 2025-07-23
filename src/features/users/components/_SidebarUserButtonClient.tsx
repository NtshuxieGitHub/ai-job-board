"use client";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";
import {
  ChevronsUpDown,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

type User = {
  name: string;
  imageUrl: string;
  email: string;
};

export function SidebarUserButtonClient({ user }: { user: User }) {
  const isMobile = useIsMobile();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <UserInfo {...user} />
          <ChevronsUpDown className="ml-auto group-data-[state=collapsed]:hidden" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={4}
        align="end"
        side={isMobile ? "bottom" : "right"}
        className="min-w-64 max-w-80 rounded-md border bg-popover p-1 shadow-md"
      >
        <DropdownMenuLabel className="font-normal p-2">
          <UserInfo {...user} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 h-px bg-border" />
        <DropdownMenuItem
          onClick={() => openUserProfile()}
          className="flex items-start gap-2 px-2 py-1.5 text-sm w-full hover:bg-muted hover:text-foreground"
        >
          <UserIcon className="w-4 h-4 text-muted-foreground" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/user-settings/notifications"
            className="flex items-center gap-2 px-2 py-1.5 text-sm w-full hover:bg-muted hover:text-foreground"
          >
            <SettingsIcon className="w-4 h-4 text-muted-foreground" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 h-px bg-border" />
        <SignOutButton>
          <DropdownMenuItem className="flex items-start gap-2 px-2 py-1.5 text-sm w-full hover:bg-muted hover:text-foreground">
            <LogOutIcon className="w-4 h-4 text-muted-foreground" />
            Log Out
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserInfo({ imageUrl, email, name }: User) {
  const nameInitials = name
    .split(" ")
    .slice(0, 2)
    .map((str) => str[0])
    .join("");

  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <Avatar.Root className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full bg-muted">
        <Avatar.Image
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
        <Avatar.Fallback className="flex h-full w-full items-center justify-center uppercase bg-primary text-primary-foreground">
          {nameInitials}
        </Avatar.Fallback>
      </Avatar.Root>
      <div className="flex flex-col flex-1 min-w-0 leading-tight group-data-[state=collapsed]:hidden">
        <span className="truncate text-sm font-semibold">{name}</span>
        <span className="truncate text-xs">{email}</span>
      </div>
    </div>
  );
}
