import Link from "next/link";
import React from "react";

const NavItem = ({ label, href }: { label: string; href: string }) => {
  return (
    <Link href={href}>
      <p>{label}</p>
    </Link>
  );
};

export default NavItem;
