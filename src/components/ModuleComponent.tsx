import { ModuleWithID } from '@utils/gpaCalculator';
import { School } from '@components/contexts/GPAContextProvider';
import { FaX } from 'react-icons/fa6';
import { stripLettersFromNumber } from '@utils/stripLettersFromNumber';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Button } from '../../@components/ui/button';

interface ModuleComponentProps {
  module: ModuleWithID;
  selectedSchool: School;
  editModule: (module: ModuleWithID) => void;
  removeModule: () => void;
}

export function ModuleComponent({
  module,
  selectedSchool,
  editModule,
  removeModule,
}: ModuleComponentProps) {
  /**
   * Finds the grade that corresponds to the points (e.g. 4.0 -> A+)
   */
  // const grade = getGradeByPoints(selectedSchool, modPoints);

  // console.log('grade', grade);

  const moduleNameToShow = module.name + "'s" || "Module's";

  return (
    <div className={'relative'}>
      {/*<p>*/}
      {/*  {JSON.stringify({*/}
      {/*    name,*/}
      {/*    credits,*/}
      {/*    modPoints,*/}
      {/*    grade,*/}
      {/*  })}*/}
      {/*</p>*/}

      {/*<label*/}
      {/*  contentEditable={true}*/}
      {/*  htmlFor="module_name"*/}
      {/*  className="block w-full border-0 p-0 text-gray-300 placeholder:text-gray-700 focus:ring-0 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"*/}
      {/*  onInput={(e) => {*/}
      {/*    console.log('e', e.currentTarget.innerText);*/}
      {/*    editModule({*/}
      {/*      ...module,*/}
      {/*      name: e.currentTarget.innerText,*/}
      {/*    });*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {module.name || 'Click here to edit module name'}*/}
      {/*</label>*/}
      <input
        type="text"
        value={module.name}
        placeholder={'Edit module name'}
        className={
          'bg-transparent p-0 m-0 border-0 text-sm text-gray-300 mb-1 w-full'
        }
        onChange={(e) => {
          editModule({
            ...module,
            name: e.target.value,
          });
        }}
      />

      {/*<Input*/}
      {/*  size={'sm'}*/}
      {/*  variant={'faded'}*/}
      {/*  value={module.name}*/}
      {/*  onChange={(e) =>*/}
      {/*    editModule({*/}
      {/*      name: e.target.value,*/}
      {/*      credits: module.credits,*/}
      {/*      grade: module.grade,*/}
      {/*    })*/}
      {/*  }*/}
      {/*/>*/}

      <div
        className={
          'flex flex-wrap p-3 border border-foreground/20 rounded-xl gap-2 bg-white/5'
        }
      >
        {/*<div className={'flex-1'}>*/}
        {/*  <label*/}
        {/*    htmlFor="grade"*/}
        {/*    className="block text-xs font-medium opacity-60"*/}
        {/*  >*/}
        {/*    Module Name*/}
        {/*  </label>*/}

        {/*  <Input*/}
        {/*    value={module.name}*/}
        {/*    onChange={(e) =>*/}
        {/*      editModule({*/}
        {/*        name: e.target.value,*/}
        {/*        credits: module.credits,*/}
        {/*        grade: module.grade,*/}
        {/*      })*/}
        {/*    }*/}
        {/*  />*/}

        {/*  /!*<p>{moduleNameToShow.replace("'s", '')}</p>*!/*/}
        {/*</div>*/}

        <div className={'flex-1'}>
          {/*<p>{module.grade}</p>*/}

          {/*<Select*/}
          {/*  isRequired*/}
          {/*  placeholder="Select a grade"*/}
          {/*  color={'primary'}*/}
          {/*  multiple={false}*/}
          {/*  selectionMode="single"*/}
          {/*  selectedKeys={[module.grade]}*/}
          {/*  onChange={(e) => {*/}
          {/*    editModule({*/}
          {/*      ...module,*/}
          {/*      grade: e.target.value,*/}
          {/*    });*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {Object.keys(selectedSchool.grades).map((grade) => (*/}
          {/*    <SelectItem key={grade} value={grade}>*/}
          {/*      {grade}*/}
          {/*    </SelectItem>*/}
          {/*  ))}*/}
          {/*</Select>*/}

          <Listbox
            value={module.grade}
            onChange={(g) => {
              // console.log('points', getPointsByGrade(selectedSchool, p));
              editModule({
                ...module,
                grade: g,
              });
            }}
          >
            <div className="relative mt-1">
              <label
                htmlFor="grade"
                className="block w-full border-0 p-0 text-gray-300 placeholder:text-gray-700 focus:ring-0 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
              >
                Grade
              </label>

              <Listbox.Button className="relative w-full cursor-default border border-foreground/20 rounded-lg bg-transparent py-2 pl-3 pr-10 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{module.grade}</span>
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
                  {Object.keys(selectedSchool.grades).map((grade) => (
                    <Listbox.Option
                      key={grade}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900'
                        }`
                      }
                      value={grade}
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
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div className={'flex-1'}>
          <label
            htmlFor="credits"
            className="block w-full border-0 p-0 text-gray-300 placeholder:text-gray-700 focus:ring-0 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
          >
            Credits
          </label>

          {/*<p>{credits}</p>*/}

          <div className="relative rounded-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600 dark:ring-slate-600 dark:focus-within:ring-slate-500">
            <input
              className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 disabled:cursor-not-allowed dark:text-slate-200 dark:placeholder-slate-400 dark:bg-transparent"
              placeholder={'6'}
              value={
                isNaN(module.credits)
                  ? ''
                  : module.credits === 0
                    ? ''
                    : module.credits.toString()
              }
              onChange={(e) =>
                editModule({
                  ...module,
                  name: module.name,
                  credits: stripLettersFromNumber(e.target.value),
                  grade: module.grade,
                })
              }
            />
          </div>
        </div>

        <Button
          onClick={removeModule}
          color={'danger'}
          size={'sm'}
          className={
            'absolute top-4 -right-4 rounded-full bg-red-500 w-[30px] h-[30px] aspect-square text-lg'
          }
        >
          <FaX />
        </Button>

        {/*<Button isIconOnly>*/}
        {/*  <TiPencil />*/}
        {/*</Button>*/}
      </div>
    </div>
  );
}
