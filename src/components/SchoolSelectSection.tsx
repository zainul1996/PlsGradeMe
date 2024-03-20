import { useMemo, useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import GPAData from '@utils/GPAData';
import { useGPAContext } from '@components/contexts/GPAContextProvider';

const schools = GPAData;

// const schools = [
//     {
//         id: 1,
//         name: 'Singapore Polytechnic',
//         imageUrl:
//             '/images/school-logos/Singapore_Polytechnic_Square.jpg',
//     },
//     {
//         id: 2,
//         name: 'Ngee Ann Polytechnic',
//         imageUrl:
//             '/images/school-logos/NgeeAnn_Polytechnic_Square.jpg',
//     },
//     {
//         id: 3,
//         name: 'Temasek Polytechnic',
//         imageUrl:
//             '/images/school-logos/Temasek_Polytechnic_Square.jpg',
//     },
//     {
//         id: 4,
//         name: 'Republic Polytechnic',
//         imageUrl:
//             '/images/school-logos/Republic_Polytechnic_Square.jpg',
//     },
//     {
//         id: 5,
//         name: 'Nanyang Polytechnic',
//         imageUrl:
//             '/images/school-logos/Nanyang_Polytechnic_Square.jpg',
//     },
//     {
//         id: 6,
//         name: 'Singapore Institute of Technology',
//         imageUrl:
//             '/images/school-logos/Singapore_Institute_of_Technology_Square.jpg',
//     }
// ]

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

// interface Step1Props {
//     school: string | null;
//     setSchool: React.Dispatch<React.SetStateAction<string | null>>;
// }

export default function SchoolSelectSection() {
  const { school, setSchool } = useGPAContext();
  const [query, setQuery] = useState('');

  const filteredSchools = useMemo(() => {
    if (query.trim().length === 0) return schools;

    return schools.filter((school) => {
      return school.name.toLowerCase().includes(query.toLowerCase());
    });

  }, [query]);

  const selectedSchoolInfo = useMemo(() => {
    return GPAData.find((sch) => sch.school === school);
  }, [school]);

  return (
    <Combobox as="div" value={school} onChange={setSchool}>
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
        1. Select School
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          placeholder={'Search for your school'}
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-slate-200 dark:focus:ring-slate-400 dark:ring-slate-600"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(value: string) => selectedSchoolInfo?.name || ''}
        />

        {/*Dropdown button*/}
        <Combobox.Button
          className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>


        <Combobox.Options
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-slate-700 dark:text-slate-100">
          {filteredSchools.length > 0 ? (
            <>
              {filteredSchools.map((sch) => (
                <Combobox.Option
                  key={sch.school}
                  value={sch.school}
                  className={({ active, disabled }) =>
                    classNames(
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-indigo-600 text-white dark:bg-slate-200 dark:text-gray-900' : 'text-gray-900 dark:text-slate-200',
                      disabled && 'opacity-50',
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <div className="flex items-center">
                        <img src={sch.image} alt=""
                          className="h-6 w-6 flex-shrink-0 rounded-full" />
                        <span
                          className={classNames('ml-3 truncate', selected && 'font-semibold')}>{sch.name}</span>
                      </div>

                      {selected && (
                        <span
                          className={classNames(
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-white dark:text-gray-900' : 'text-indigo-600 dark:text-slate-200'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}

            </>
          ) : (
            <Combobox.Option
              disabled={true}
              value={null}
              className={({ active, disabled }) =>
                classNames(
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                  active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                  disabled && 'opacity-50',
                )
              }
            >
              <div className="flex items-center">
                <span className={classNames('ml-3 truncate')}>No Results Found</span>
              </div>


            </Combobox.Option>
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
