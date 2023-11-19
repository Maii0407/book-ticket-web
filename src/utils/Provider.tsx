'use client';
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient())

  return (
    <>
      <QueryClientProvider client={client}>
        <ReactQueryStreamedHydration>
          <CacheProvider>
            <ChakraProvider>
              {children}
            </ChakraProvider>
          </CacheProvider>
        </ReactQueryStreamedHydration>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
