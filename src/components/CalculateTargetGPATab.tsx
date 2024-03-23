import { classNames } from '@components/layout';
import { School, useGPAContext } from '@components/contexts/GPAContextProvider';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useEffect } from 'react';
import { z } from 'zod';
import { calculateGoalGPA } from '@utils/gpaCalculator';

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

export default function CalculateTargetGPATab({ school }: { school: School }) {
  const {
    currentGPA,
    currentCredits,
    targetGPA,
    targetCredits,
    setTargetCredits,
    setTargetGPA,
  } = useGPAContext();

  const { values, handleSubmit, errors, setFieldValue, isValid } = useFormik({
    initialValues: {
      targetGPA: targetGPA || 0,
      targetCredits: targetCredits || 0,
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
      <p className={'mt-4 text-center text-white'}>
        Please fill in your current GPA and credits to calculate your target GPA
      </p>
    );
  }

  const calculatedTargetGPA = calculateGoalGPA(
    currentGPA,
    currentCredits,
    values.targetGPA!,
    values.targetCredits!,
    school
  );

  return (
    <>
      <fieldset
        className={classNames(
          !school ? 'opacity-40' : 'opacity-100',
          'rounded-md bg-white p-6 shadow-sm transition-all dark:bg-transparent'
        )}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex-1">
            <label
              htmlFor="current_gpa"
              className="block w-full border-0 p-0 text-gray-300 placeholder:text-gray-700 focus:ring-0 disabled:cursor-not-allowed sm:text-sm sm:leading-6"
            >
              Target GPA
            </label>
            <div className="relative rounded-md py-2 pl-3 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600 dark:ring-slate-600 dark:focus-within:ring-slate-500">
              <input
                disabled={!school}
                type="text"
                name="Current GPA"
                id="current_gpa"
                className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 disabled:cursor-not-allowed sm:text-sm sm:leading-6 dark:bg-transparent dark:text-slate-200 dark:placeholder-slate-400"
                placeholder="3.25"
                value={values.targetGPA || ''}
                onChange={(e) =>
                  setFieldValue('targetGPA', e.target.value.trim())
                }
              />
            </div>
            {errors.targetGPA && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.targetGPA}
              </p>
            )}
          </div>

          <div className="flex-1">
            <label
              htmlFor="current_credits"
              className="block w-full border-0 p-0 text-gray-300 placeholder:text-gray-700 focus:ring-0 disabled:cursor-not-allowed sm:text-sm sm:leading-6"
            >
              Credits for next semester
            </label>
            <div className="relative rounded-md py-2 pl-3 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600 dark:ring-slate-600 dark:focus-within:ring-slate-500">
              <input
                disabled={!school}
                type="text"
                name="Current Credits"
                id="current_credits"
                className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 disabled:cursor-not-allowed sm:text-sm sm:leading-6 dark:bg-transparent dark:text-slate-200 dark:placeholder-slate-400"
                placeholder="130"
                value={values.targetCredits || ''}
                onChange={(e) =>
                  setFieldValue('targetCredits', e.target.value.trim())
                }
              />
            </div>
            {errors.targetCredits && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.targetCredits}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {calculatedTargetGPA && values.targetCredits && (
        <div className={'my-3 text-center text-gray-200'}>
          {calculatedTargetGPA.isAchievable ? (
            <p>
              You&apos;ll need a minimum of{' '}
              <span className={'font-bold underline'}>
                {calculatedTargetGPA.goalGPA}
              </span>{' '}
              to achieve your target GPA! All the best, we&apos;re rooting for
              you!
            </p>
          ) : (
            <p>
              Unfortunately, it&apos;s not possible to achieve your target GPA
              within the next semester. You&apos;ll need more than 1 semester to
              achieve your target GPA.
            </p>
          )}
        </div>
      )}
    </>
  );
}
