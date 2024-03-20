export default function Step2() {
    return (
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
    )
}