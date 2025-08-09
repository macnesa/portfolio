// components/RouteGuard.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  return <>{children}</>;
}


  