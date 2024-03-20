import { classNames } from '@components/layout';
import { useGPAContext } from '@components/contexts/GPAContextProvider';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useEffect } from 'react';
import { z } from 'zod';
import { getTargetGPA } from '@utils/gpaCalculator';

const currentGPASectionSchema = z.object({
  targetGPA: z.coerce
    .number({
      invalid_type_error: 'Target GPA must be a number',
    })
    .positive({
      message: 'Target GPA must be a positive number',
    })
    .nullable()
    .default(null),
  targetCredits: z.coerce
    .number({
      invalid_type_error: 'Target Credits must be a number',
    })
    .positive({
      message: 'Target Credits must be a positive number',
    })
    .nullable()
    .default(null),
});

export default function CalculateTargetGPATab() {
  const {
    school,
    currentGPA,
    currentCredits,
    setCurrentGPA,
    setCurrentCredits,
    targetGPA,
    targetCredits,
    setTargetCredits,
    setTargetGPA,
  } = useGPAContext();

  const { values, handleSubmit, errors, setFieldValue, isValid } = useFormik({
    initialValues: {
      targetGPA,
      targetCredits,
    },
    validationSchema: toFormikValidationSchema(currentGPASectionSchema),
    onSubmit: (values) => {},
  });

  /**
   * Set the values of currentGPA and currentCredits to the context when the form is valid and the values are not null
   */
  useEffect(() => {
    if (!isValid || !values || !values.targetCredits || !values.targetCredits)
      return;

    // remove characters from both values
    const newCurrentGPA = parseFloat(
      values.targetGPA!.toString().replace(/[^0-9.]/g, '')
    );
    const newCurrentCredits = parseFloat(
      values.targetCredits.toString().replace(/[^0-9.]/g, '')
    );

    setTargetGPA(newCurrentGPA);
    setTargetCredits(newCurrentCredits);
  }, [values, isValid]);

  if (!currentGPA || !currentCredits) {
    return (
      <p>
        Please fill in your current GPA and credits to calculate your target GPA
      </p>
    );
  }

  const calculatedTargetGPA = getTargetGPA(
    currentGPA,
    currentCredits,
    values.targetGPA!,
    values.targetCredits!
  );

  return (
    <>
      <fieldset
        className={classNames(
          !school ? 'opacity-40' : 'opacity-100',
          'bg-white transition-all'
        )}
      >
        <div className="isolate -space-y-px rounded-md shadow-sm">
          <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-900"
            >
              Target GPA
            </label>
            <input
              disabled={!school}
              type="text"
              name="Current GPA"
              id="current_gpa"
              className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
              placeholder="3.25"
              value={values.targetGPA || ''}
              onChange={(e) =>
                setFieldValue('targetGPA', e.target.value.trim())
              }
            />

            {errors.targetGPA && (
              <label className={'block text-xs font-medium text-red-600'}>
                {errors.targetGPA}
              </label>
            )}
          </div>
          <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
            <label
              htmlFor="job-title"
              className="block text-xs font-medium text-gray-900"
            >
              Credits for next semester
            </label>
            <input
              disabled={!school}
              type="text"
              name="Current Credits"
              id="current_credits"
              className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
              placeholder="130"
              value={values.targetCredits || ''}
              onChange={(e) =>
                setFieldValue('targetCredits', e.target.value.trim())
              }
            />

            {errors.targetCredits && (
              <label className={'block text-xs font-medium text-red-600'}>
                {errors.targetCredits}
              </label>
            )}
          </div>
        </div>
      </fieldset>

      {calculatedTargetGPA && values.targetCredits && values.targetCredits && (
        <>
          <p>Results:</p>
          <p>
            You need to at least get {calculatedTargetGPA} for the next
            semester. Good luck!
          </p>
        </>
      )}
    </>
  );
}
