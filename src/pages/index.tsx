import { Inter } from "next/font/google";
import Head from "next/head";
import Layout from "@components/layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>GPA Calculator | For Universities and Polytechnics in Singapore</title>
        <meta name="description" content="Calculate your GPA easily with our user-friendly GPA calculator, designed specifically for students in universities and polytechnics across Singapore." />
        <meta name="keywords" content="GPA calculator, Singapore universities, Singapore polytechnics, cumulative GPA, semester GPA, target GPA" />
        
        {/* open graph */}
        <meta property="og:title" content="GPA Calculator | For Universities and Polytechnics in Singapore" />
        <meta property="og:description" content="Calculate your GPA easily with our user-friendly GPA calculator, designed specifically for students in universities and polytechnics across Singapore." />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="http://www.plsgrade.me" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PlsGradeMe" />

        {/* twitter */}
        <meta name="twitter:title" content="GPA Calculator | For Universities and Polytechnics in Singapore" />
        <meta name="twitter:description" content="Calculate your GPA easily with our user-friendly GPA calculator, designed specifically for students in universities and polytechnics across Singapore." />
        <meta name="twitter:image" content="/images/twitter-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="telephone" content="+65 9116 8420" />

        {/* favicon, logos and manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/images/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/images/favicon-16x16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="android-chrome-192x192" href="/images/android-chrome-192x192.png" />
        <link rel="android-chrome-512x512" href="/images/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Layout>
        <h1 className="text-4xl font-bold text-center">Welcome to PlsGradeMe</h1>
      </Layout>
    </>
  );
}
