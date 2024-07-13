import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavItem = ({
  label,
  href,
  icon: Icon,
  className
}: {
  label: string;
  href: string;
  className?: string;
  icon?: LucideIcon;
}) => {
  return (
    <Link href={href} className={cn(className)}>
      {Icon && <Icon />}
      <p>{label}</p>
    </Link>
  );
};

export default NavItem;
