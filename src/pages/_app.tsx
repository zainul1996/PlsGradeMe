import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { GPAContextProvider } from '@components/contexts/GPAContextProvider';
import { NextUIProvider } from '@nextui-org/system';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextUIProvider>
        <GPAContextProvider>
          <main className="dark text-foreground bg-background">
            <Component {...pageProps} />
          </main>
        </GPAContextProvider>
      </NextUIProvider>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
