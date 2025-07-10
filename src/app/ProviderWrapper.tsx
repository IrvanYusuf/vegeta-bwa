// app/ProviderWrapper.tsx
"use client";

import { store } from "@/store";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

export function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
}
