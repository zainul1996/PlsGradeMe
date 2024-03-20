import { Inter } from "next/font/google";
import Head from "next/head";
import Layout from "@components/layout";
import SelectWithImage from "@components/selectWithImage";
import Stepper from "@components/steps";
import ComboBoxWithImage from "@components/comboBoxWithImage";
import Step1 from "@components/comboBoxWithImage";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs";
import { Button } from "../../@components/ui/button";

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
        <meta property="og:image" content="/images/og_image.jpg" />
        <meta property="og:url" content="http://www.plsgrade.me" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PlsGradeMe" />

        {/* twitter */}
        <meta name="twitter:title" content="GPA Calculator | For Universities and Polytechnics in Singapore" />
        <meta name="twitter:description" content="Calculate your GPA easily with our user-friendly GPA calculator, designed specifically for students in universities and polytechnics across Singapore." />
        <meta name="twitter:image" content="/images/twitter_image.jpg" />
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 mt-6">
            <Step1 />
            <fieldset className="bg-white">
              <legend className="block text-sm font-medium leading-6 text-gray-900">2. Current Results(Optional)</legend>
              <div className="isolate -space-y-px rounded-md shadow-sm">
                <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                  <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                    Current GPA
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="3.25"
                  />
                </div>
                <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                  <label htmlFor="job-title" className="block text-xs font-medium text-gray-900">
                    Current Credits
                  </label>
                  <input
                    type="text"
                    name="job-title"
                    id="job-title"
                    className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="130"
                  />
                </div>
              </div>
            </fieldset>
          </div>
          <div className="mt-6 w-full bg-gray-50">
            <Tabs defaultValue="account" className="mx-auto">
              <TabsList className="flex justify-evenly">
                <TabsTrigger value="account">Calculate cGPA</TabsTrigger>
                <TabsTrigger value="password">Calculate Target GPA</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Button className="ml-4 my-4 bg-black text-white">Add module</Button>
              </TabsContent>
              <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
          </div>

        </div>
      </Layout>
    </>
  );
}
