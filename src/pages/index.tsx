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
import { Button } from '../../@components/ui/button';
import { FaShareAlt } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { school, parseData } = useGPAContext();

  /**
   * Get data from the backend if the ?from query parameter is present (to auto-fill the form)
   */
  useEffect(() => {
    // Get ?from= query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from');

    console.log('from', from);

    if (!from) return;

    // Fetch data from backend
    fetch(`/api/store?hash=${from}`)
      .then(res => res.json())
      .then(d => {

        const {data} = d
        parseData(JSON.stringify(data))

      //   Remove the 'from' query parameter from the URL
        window.history.replaceState({}, document.title, window.location.pathname);
      })
      .catch(e => {
        // Show modal or Toast
        console.log('error', e)
      })
  }, []);

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

                <div className={'flex justify-end gap-2 mt-5'}>
                  <Button
                    disabled={!school}
                    onClick={() => {
                    }}
                    size={'sm'}
                    className={'bg-black/50 py-2 text-xs text-white'}
                  >
                    <FaShareAlt className={'mr-2'} />
                    Share your results
                  </Button>
                </div>


              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Layout>
    </>
  );
}
