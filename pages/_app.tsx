import { useEffect, useState } from "react";
import { broadcastQueryClient } from "@tanstack/query-broadcast-client-experimental";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

import "../src/styles/globals.css";

const DEFAULT_STALE_TIME = 1000 * 60 * 5; // 5 minutes

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // refetchOnWindowFocus: false,
            staleTime: DEFAULT_STALE_TIME,
          },
        },
      }),
  );

  useEffect(() => {
    return broadcastQueryClient({
      queryClient,
      broadcastChannel: "tanstack-query",
    });
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />;
    </QueryClientProvider>
  );
}
