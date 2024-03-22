import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { GPAContextProvider } from '@components/contexts/GPAContextProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GPAContextProvider>
        <Component {...pageProps} />
      </GPAContextProvider>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
