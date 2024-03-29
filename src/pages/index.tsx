import CurrentGPASection from '@components/CurrentGPASection';
import SchoolSelectSection from '@components/SchoolSelectSection';
import Layout from '@components/layout';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import CalculateCGPATab from '@components/CalculateCGPATab';
import CalculateTargetGPATab from '@components/CalculateTargetGPATab';
import { useGPAContext } from '@components/contexts/GPAContextProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { school } = useGPAContext();

  // Hash JSON Object and add to KV Store, returns uuid
  // const postData = async () => {
  //   const response = await fetch('/api/store', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: 'John Doe',
  //       age: 30,
  //     }),
  //   });
  //   const { key } = await response.json();
  //   console.log('Key:', key);
  // };

  // gets JSON Object from KV Store, given uuid
  // const getData = async () => {
  //   const response = await fetch(`/api/store?key=${key}`);
  //   const data = await response.json();
  //   console.log('Data:', data);
  // };

  return (
    <>
      <Head>
        <title>
          GPA Calculator | For Universities and Polytechnics in Singapore
        </title>
        <meta
          name="description"
          content="Calculate your GPA easily with our user-friendly GPA calculator, designed specifically for students in universities and polytechnics across Singapore."
        />
        <meta
          name="keywords"
          content="GPA calculator, Singapore universities, Singapore polytechnics, cumulative GPA, semester GPA, target GPA"
        />

        {/* open graph */}
        <meta
          property="og:title"
          content="GPA Calculator | For Universities and Polytechnics in Singapore"
        />
        <meta
          property="og:description"
          content="Calculate your GPA easily with our user-friendly GPA calculator, designed specifically for students in universities and polytechnics across Singapore."
        />
        <meta property="og:image" content="/images/og_image.jpg" />
        <meta property="og:url" content="http://www.plsgrade.me" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PlsGradeMe" />

        {/* twitter */}
        <meta
          name="twitter:title"
          content="GPA Calculator | For Universities and Polytechnics in Singapore"
        />
        <meta
          name="twitter:description"
          content="Calculate your GPA easily with our user-friendly GPA calculator, designed specifically for students in universities and polytechnics across Singapore."
        />
        <meta name="twitter:image" content="/images/twitter_image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="telephone" content="+65 9116 8420" />

        {/* favicon, logos and manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon-16x16.png"
          sizes="16x16"
        />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link
          rel="android-chrome-192x192"
          href="/images/android-chrome-192x192.png"
        />
        <link
          rel="android-chrome-512x512"
          href="/images/android-chrome-512x512.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Layout>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 grid gap-12 bg-white lg:grid-cols-2 dark:bg-slate-800">
            <SchoolSelectSection />
            <CurrentGPASection />
          </div>

          <AnimatePresence>
            {school && (
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="mt-6 w-full rounded-md bg-slate-800 p-4 text-foreground"
              >
                <Tabs defaultValue="calculate_cgpa" className="mx-auto">
                  <TabsList className="flex justify-evenly bg-black/20">
                    <TabsTrigger
                      value="calculate_cgpa"
                      className={'aria-selected:bg-red-500'}
                    >
                      Calculate cGPA
                    </TabsTrigger>
                    <TabsTrigger value="calculate_target_gpa" className={''}>
                      Calculate Target GPA
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="calculate_cgpa">
                    <div
                      className={'rounded-lg bg-black/20 px-3 py-5 text-white'}
                    >
                      <CalculateCGPATab school={school} />
                    </div>
                  </TabsContent>
                  <TabsContent value="calculate_target_gpa">
                    <div
                      className={'rounded-lg bg-black/20 px-3 py-5 text-white'}
                    >
                      <CalculateTargetGPATab school={school} />
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Layout>
    </>
  );
}
