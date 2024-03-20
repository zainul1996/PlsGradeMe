import { useGPAContext } from '@components/contexts/GPAContextProvider';
import { z } from 'zod';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useEffect } from 'react';

const currentGPASectionSchema = z.object({
  currentGPA: z.coerce.number({
    invalid_type_error: 'Current GPA must be a number',
  }).positive({
    message: 'Current GPA must be a positive number',
  }).nullable().default(null),
  currentCredits: z.coerce.number({
    invalid_type_error: 'Current Credits must be a number',
  }).positive({
    message: 'Current Credits must be a positive number',
  }).nullable().default(null),
});

export default function CurrentGPASection() {

  const { currentGPA, currentCredits, setCurrentGPA, setCurrentCredits } = useGPAContext();

  const {
    values,
    handleSubmit,
    errors,
    setFieldValue,
    isValid,
  } = useFormik({
    initialValues: {
      currentGPA,
      currentCredits,
    },
    validationSchema: toFormikValidationSchema(currentGPASectionSchema),
    onSubmit: (values) => {
      setCurrentGPA(values.currentGPA);
      setCurrentCredits(values.currentCredits);
    },
  });

  /**
   * Set the values of currentGPA and currentCredits to the context when the form is valid and the values are not null
   */
  useEffect(() => {
    if (!isValid || !values || !values.currentGPA || !values.currentCredits) return;

    // remove characters from both values
    const newCurrentGPA = parseFloat(values.currentGPA.toString().replace(/[^0-9.]/g, ''));
    const newCurrentCredits = parseFloat(values.currentCredits.toString().replace(/[^0-9.]/g, ''));

    setCurrentGPA(newCurrentGPA);
    setCurrentCredits(newCurrentCredits);

  }, [values, isValid]);

  return (
    <fieldset className="bg-white">
      <legend className="block text-sm font-medium leading-6 text-gray-900">2. Current Results(Optional)</legend>
      <div className="isolate -space-y-px rounded-md shadow-sm">
        <div
          className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
          <label htmlFor="name" className="block text-xs font-medium text-gray-900">
            Current GPA
          </label>
          <input
            type="text"
            name="Current GPA"
            id="current_gpa"
            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="3.25"
            value={values.currentGPA || ''}
            onChange={(e) => setFieldValue('currentGPA', e.target.value.trim())}
          />

          {errors.currentGPA && (
            <label className={'block text-xs font-medium text-red-600'}>
              {errors.currentGPA}
            </label>
          )}
        </div>
        <div
          className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
          <label htmlFor="job-title" className="block text-xs font-medium text-gray-900">
            Current Credits
          </label>
          <input
            type="text"
            name="Current Credits"
            id="current_credits"
            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="130"
            value={values.currentCredits || ''}
            onChange={(e) => setFieldValue('currentCredits', e.target.value.trim())}
          />


          {errors.currentCredits && (
            <label className={'block text-xs font-medium text-red-600'}>
              {errors.currentCredits}
            </label>
          )}
        </div>
      </div>
    </fieldset>
  );
}
