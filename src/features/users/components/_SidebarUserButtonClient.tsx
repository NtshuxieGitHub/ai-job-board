"use client";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";
import { ChevronsUpDown } from "lucide-react";

type User = {
  name: string;
  imageUrl: string;
  email: string;
};

export function SidebarUserButtonClient({ user }: { user: User }) {
  const { isMobile } = useIsMobile();

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
      <DropdownMenuContent>Hi</DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserInfo(user: User) {
  const nameInitials = user.name
    .split(" ")
    .slice(0, 2)
    .map((str) => str[0])
    .join("");

  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <Avatar.Root className="rounded-lg size-8">
        <Avatar.Image
          src={user.imageUrl}
          alt={user.name}
          className="h-full w-full"
        />
        <Avatar.Fallback className="uppercase bg-primary text-primary-foreground">
          {nameInitials}
        </Avatar.Fallback>
      </Avatar.Root>
      <div className="flex flex-col flex-1 min-w-0 leading-tight group-data-[state=collapsed]:hidden">
        <span className="truncate text-sm font-semibold">{user.name}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </div>
  );
}
