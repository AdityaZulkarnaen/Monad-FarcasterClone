"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { monadChain } from "@/lib/auth/monad-chain";

const wagmiConfig = createConfig({
  chains: [monadChain],
  connectors: [
    injected({
      shimDisconnect: true,
    }),
  ],
  transports: {
    [monadChain.id]: http(monadChain.rpcUrls.default.http[0]),
  },
});

export default function Web3Provider({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
