import { Module } from '@utils/gpaCalculator';
import { School } from '@components/contexts/GPAContextProvider';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { Button } from '../../@components/ui/button';
import { getGradeByPoints } from '@utils/dataHelperFunctions';

interface ModuleComponentProps {
  module: Module;
  selectedSchool: School;
  editModule: (module: Module) => void;
  removeModule: () => void;
}

export function ModuleComponent({
  module: { credits, points: modPoints },
  selectedSchool,
  editModule,
  removeModule,
}: ModuleComponentProps) {
  /**
   * Finds the grade that corresponds to the points (e.g. 4.0 -> A+)
   */
  const grade = getGradeByPoints(selectedSchool, modPoints);

  // console.log('grade', grade);

  return (
    <div
      className={'flex flex-wrap p-2 border border-black/20 rounded-lg gap-2'}
    >
      <div className={'flex-1'}>
        <Listbox
          value={grade}
          onChange={(p) => {
            // console.log('points', getPointsByGrade(selectedSchool, p));
            editModule({
              credits,
              points: parseFloat(p),
            });
          }}
        >
          <div className="relative mt-1">
            <label
              htmlFor="job-title"
              className="block text-xs font-medium text-gray-900"
            >
              Module Grade
            </label>

            <Listbox.Button className="relative w-full cursor-default border rounded-lg bg-white py-2 pl-3 pr-10 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{grade}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="z-40 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {/*Map through every grade for the school*/}
                {Object.entries(selectedSchool.grades).map(
                  ([grade, points]) => (
                    <Listbox.Option
                      key={grade}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900'
                        }`
                      }
                      value={points}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {grade}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  )
                )}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      <div className="flex-1 h-fit relative rounded-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
        <label
          htmlFor="job-title"
          className="block text-xs font-medium text-gray-900"
        >
          Module Credits
        </label>
        <input
          type="text"
          name="Current Credits"
          id="current_credits"
          className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="130"
          value={credits || ''}
          onChange={(e) => {
            editModule({
              credits: parseInt(e.target.value),
              points: modPoints,
            });
          }}
        />
      </div>

      <Button onClick={removeModule} className="ml-4 my-4 bg-black text-white">
        Remove
      </Button>
    </div>
  );
}
