import React from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Homepage', href: '/', current: true },
  { name: 'Schools Supported', href: '/school-list', current: false },
  { name: 'Contact us', href: 'contact-us', current: false },
]

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout({ children, }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-full">
      <div className="bg-slate-100 pb-32 dark:bg-slate-900">
        <Disclosure as="nav" className="bg-slate-100 dark:bg-slate-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="border-b border-slate-200 py-2 dark:border-slate-700">
                  <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-16 w-16"
                          src="/images/logo.png"
                          alt="PlsGradeMe logo"
                        />
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'text-black dark:bg-slate-800 dark:text-slate-100'
                                  : 'text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          ))}
                          <a
                            className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50 dark:focus:ring-slate-600 dark:focus:ring-offset-slate-800"
                            key="School Missing?"
                            href="https://github.com/zainul1996/PlsGradeMe"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-900 backdrop-blur-3xl dark:bg-slate-800 dark:text-slate-200">
                              Add Your School
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-slate-100 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200 dark:focus:ring-slate-600 dark:focus:ring-offset-slate-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="border-b border-slate-200 md:hidden dark:border-slate-700">
                <div className="space-y-1 px-2 py-3 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                  <a
                    className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50 dark:focus:ring-slate-600 dark:focus:ring-offset-slate-800"
                    key="School Missing?"
                    href="https://github.com/zainul1996/PlsGradeMe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-900 backdrop-blur-3xl dark:bg-slate-800 dark:text-slate-200">
                      Add Your School
                    </span>
                  </a>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Dashboard
            </h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white px-5 py-6 shadow dark:bg-slate-800 sm:px-6">
            {children}
          </div>
        </div>
      </main>
    </div>
    </>
  )
}
