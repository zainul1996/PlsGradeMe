import { Button } from '../../@components/ui/button';
import { School, useGPAContext } from '@components/contexts/GPAContextProvider';
import { Fragment, useMemo } from 'react';
import GPAData from '@utils/GPAData';
import { calculateGPA, Module } from '@utils/gpaCalculator';
import { ModuleComponent } from '@components/ModuleComponent';

export default function CalculateCGPATab() {
  const {
    school,
    modules,
    addModule,
    removeModule,
    editModule,
    currentCredits,
    currentGPA,
  } = useGPAContext();

  const selectedSchool = useMemo(() => {
    return GPAData.find((sch) => sch.school === school);
  }, [school]);

  const handleAddModule = () => {
    //   Add a new module to the modules array

    // Get the default grade and points
    // The default grade is determined by the 3rd key in the grades object (e.g. A+ or 4.7 – Depending on school)
    const defaultGrade = Object.keys(
      selectedSchool!.grades
    )[3] as keyof School['grades'];
    const defaultPoints = selectedSchool!.grades[defaultGrade];

    addModule({ points: defaultPoints, credits: 0 });
  };

  const calculatedCGPA = useMemo(() => {
    return calculateGPA(modules, currentGPA || 0, currentCredits || 0);
  }, [modules, currentGPA, currentCredits]);

  return (
    <>
      <div className={'space-y-1'}>
        {modules.map((module, idx) => (
          <ModuleComponent
            editModule={(module: Module) => {
              editModule(idx, module);
            }}
            removeModule={() => removeModule(idx)}
            selectedSchool={selectedSchool!}
            module={module}
            key={idx}
          />
        ))}
      </div>

      <Button
        disabled={!selectedSchool}
        onClick={handleAddModule}
        className="ml-4 my-4 bg-black text-white"
      >
        Add module
      </Button>

      {calculatedCGPA && (
        <>
          <p>Result:</p>
          <p>{calculatedCGPA}</p>
        </>
      )}
    </>
  );
}
