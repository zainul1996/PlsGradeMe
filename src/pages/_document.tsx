import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html
      lang="en"
      className="bg-white text-slate-900 dark:bg-black dark:text-white"
    >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
