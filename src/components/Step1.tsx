import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'

type Person = {
    id: number
    name: string
    imageUrl: string
}

const people = [
    {
        id: 1,
        name: 'Singapore Polytechnic',
        imageUrl:
            '/images/school-logos/Singapore_Polytechnic_Square.jpg',
    },
    {
        id: 2,
        name: 'Ngee Ann Polytechnic',
        imageUrl:
            '/images/school-logos/NgeeAnn_Polytechnic_Square.jpg',
    },
    {
        id: 3,
        name: 'Temasek Polytechnic',
        imageUrl:
            '/images/school-logos/Temasek_Polytechnic_Square.jpg',
    },
    {
        id: 4,
        name: 'Republic Polytechnic',
        imageUrl:
            '/images/school-logos/Republic_Polytechnic_Square.jpg',
    },
    {
        id: 5,
        name: 'Nanyang Polytechnic',
        imageUrl:
            '/images/school-logos/Nanyang_Polytechnic_Square.jpg',
    },
    {
        id: 6,
        name: 'Singapore Institute of Technology',
        imageUrl:
            '/images/school-logos/Singapore_Institute_of_Technology_Square.jpg',
    }
]

function classNames(...classes: (string | boolean)[]) {
    return classes.filter(Boolean).join(' ')
}

interface Step1Props {
    school: string;
    setSchool: React.Dispatch<React.SetStateAction<string>>;
}

export default function Step1({ school, setSchool }: Step1Props) {
    const [query, setQuery] = useState('')

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Combobox as="div" value={school} onChange={setSchool}>
            <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">1. Select School</Combobox.Label>
            <div className="relative mt-2">
                <Combobox.Input
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(person: Person) => person?.name}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>

                {filteredPeople.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredPeople.map((person) => (
                            <Combobox.Option
                                key={person.id}
                                value={person}
                                className={({ active }) =>
                                    classNames(
                                        'relative cursor-default select-none py-2 pl-3 pr-9',
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <div className="flex items-center">
                                            <img src={person.imageUrl} alt="" className="h-6 w-6 flex-shrink-0 rounded-full" />
                                            <span className={classNames('ml-3 truncate', selected && 'font-semibold')}>{person.name}</span>
                                        </div>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                    active ? 'text-white' : 'text-indigo-600'
                                                )}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    )
}
