import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Module, ModuleWithID } from '@utils/gpaCalculator';
import GPAData from '@utils/GPAData';
import { generateRandomId } from '@utils/generateRandomId';

interface GPAContextInterface {
  school: School | null;
  currentGPA: number | null;
  currentCredits: number | null;
  modules: ModuleWithID[];

  targetGPA: number | null;
  targetCredits: number | null;

  setSchool: (school: string | null) => void;
  setCurrentGPA: (gpa: number | null) => void;
  setCurrentCredits: (credits: number | null) => void;
  setTargetGPA: (gpa: number | null) => void;
  setTargetCredits: (credits: number | null) => void;

  addModule: (module: Module) => void;
  editModule: (module: ModuleWithID) => void;
  removeModule: (moduleId: string) => void;

  //   Data parsers
  parseData: (data: string) => void;
  stringifyData: () => string;
}

export type SchoolKeys = keyof typeof GPAData;
export type School = typeof GPAData[SchoolKeys];

namespace ParsedDataInterface {
  export interface v1 {
    school: string | null;
    currentGPA: number | null;
    currentCredits: number | null;
    targetGPA: number | null;
    targetCredits: number | null;
    modules: Module[];
    version: number;
  }
}

export const GPAContext = createContext<GPAContextInterface | null>(null);

export const useGPAContext = () => {
  const items = useContext(GPAContext);
  if (!items) {
    throw new Error('useGPAContext must be used within a GPAContextProvider');
  }

  return items;
};

/**
 * GPA Context Provider stores logic of the application and also some helper functions for the states
 * @param children
 * @constructor
 */
export const GPAContextProvider: React.FC<PropsWithChildren<{}>> = ({
                                                                      children,
                                                                    }) => {
  // Used for CGPA calculation
  const [school, _setSchool] = useState<School | null>(null);
  const [currentGPA, setCurrentGPA] = useState<number | null>(null);
  const [currentCredits, setCurrentCredits] = useState<number | null>(null);
  const [modules, setModules] = useState<ModuleWithID[]>([]);

  // Extra states for calculating target GPA
  const [targetGPA, setTargetGPA] = useState<number | null>(null);
  const [targetCredits, setTargetCredits] = useState<number | null>(null);

  /**
   * Set the school state
   * The reason for this is to reset the modules when the school is changed
   * This is because different schools have different grading systems
   *
   * Also, the name is supposed to correspond to the 'school' key in the GPAData.ts file
   * @example 'SP' for Singapore Polytechnic
   * @param school
   */
  const setSchool = (school: string | null) => {
    if (!school) return;
    _setSchool(GPAData[school as SchoolKeys]);
    setModules([]);
  };

  const addModule = (module: Module) => {
    setModules((prev) => {
      return [...prev, { ...module, id: generateRandomId().toString() }];
    });
  };

  const removeModule = (moduleId: string) => {
    setModules((prev) => {
      return prev.filter((_) => _.id !== moduleId);
    });
  };

  const editModule = (module: ModuleWithID) => {
    setModules((prev) => {
      return prev.map((m) => {
        if (m.id === module.id) {
          return module;
        }
        return m;
      });
    });
  };

  const parseData = (data: string) => {

    const dataObj = JSON.parse(data);

    switch (dataObj.version) {
      case 1:
        const parsedData = dataObj as ParsedDataInterface.v1;
        if (parsedData.school) {
          setSchool(parsedData.school);
        }
        if (parsedData.currentGPA) {
          setCurrentGPA(parsedData.currentGPA);
        }
        if (parsedData.currentCredits) {
          setCurrentCredits(parsedData.currentCredits);
        }
        if (parsedData.targetGPA) {
          setTargetGPA(parsedData.targetGPA);
        }
        if (parsedData.targetCredits) {
          setTargetCredits(parsedData.targetCredits);
        }
        if (parsedData.modules) {
          parsedData.modules.forEach((module) => {
            addModule(module);
          });
        }
        break;
    }
  };

  const stringifyData = () => {
    return (
      JSON.stringify({
        school: school?.school,
        currentGPA,
        currentCredits,
        targetGPA,
        targetCredits,
        modules: modules.map((module) => {
          return {
            name: module.name,
            grade: module.grade,
            credits: module.credits,
          };
        }),
        version: 1,
      })
    );
  };

  // console.log('[DEBUG - GPACONTEXTPROVIDER] school', school);
  // console.log('[DEBUG - GPACONTEXTPROVIDER] currentGPA', currentGPA);
  // console.log('[DEBUG - GPACONTEXTPROVIDER] currentCredits', currentCredits);
  console.log('[DEBUG - GPACONTEXTPROVIDER] modules', modules);

  return (
    <GPAContext.Provider
      value={{
        school,
        currentGPA,
        currentCredits,
        setSchool,
        setTargetGPA,
        setTargetCredits,
        setCurrentGPA,
        setCurrentCredits,
        modules,
        addModule,
        editModule,
        removeModule,
        targetGPA,
        targetCredits,
        parseData,
        stringifyData,
      }}
    >
      {children}
    </GPAContext.Provider>
  );
};
