"use client";

import { Header } from "@/components/Header";
import { MobileActions } from "@/components/MobileActions";
import { SiteFooter } from "@/components/SiteFooter";

export function PageShell({ children, active = "home" }) {
  return (
    <>
      <Header active={active} />
      {children}
      <SiteFooter />
      <MobileActions />
    </>
  );
}
