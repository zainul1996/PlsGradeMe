import { School, useGPAContext } from '@components/contexts/GPAContextProvider';
import { Fragment, useMemo } from 'react';
import { calculateGPA, ModuleWithID } from '@utils/gpaCalculator';
import { ModuleComponent } from '@components/ModuleComponent';
import { Button } from '../../@components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { FaShareAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';

export default function CalculateCGPATab({ school }: { school: School }) {
  const {
    modules,
    addModule,
    removeModule,
    editModule,
    currentCredits,
    currentGPA,
  } = useGPAContext();

  // For the add module modal
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleAddModule = () => {
    //   Add a new module to the modules array

    // Get the default grade and points
    // The default grade is determined by the 3rd key in the grades object (e.g. A+ or 4.7 – Depending on school)
    const defaultGrade = Object.keys(
      school.grades
    )[3] as keyof School['grades'];

    addModule({ name: '', grade: defaultGrade, credits: 0 });
  };

  const calculatedCGPA = useMemo(() => {
    return calculateGPA(modules, currentGPA || 0, currentCredits || 0, school!);
  }, [modules, currentGPA, currentCredits]);

  return (
    <>
      {calculatedCGPA && (
        <>
          <p className={'text-lg text-center'}>
            Your next semester&apos;s GPA:{' '}
            <span className={'font-bold underline'}>{calculatedCGPA}</span>
          </p>
        </>
      )}

      <div className={'flex justify-end gap-2'}>
        <Button
          disabled={!school}
          onClick={handleAddModule}
          size={'sm'}
          className={'bg-black text-white py-2 text-xs'}
        >
          <FaShareAlt className={'mr-2'} />
          Share
        </Button>
      </div>

      <div className={'space-y-3 my-3'}>
        <AnimatePresence>
          {modules.map((module) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 50 },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              key={module.id}
            >
              <ModuleComponent
                editModule={(module: ModuleWithID) => {
                  editModule(module);
                }}
                removeModule={() => removeModule(module.id)}
                selectedSchool={school!}
                module={module}
                key={module.id}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Button
        color={'primary'}
        disabled={!school}
        onClick={handleAddModule}
        size={'sm'}
        className={'flex ml-auto bg-slate-600 text-white text-xs py-2'}
      >
        <FaPlus className={'mr-2'} />
        Add Module
      </Button>

      {/*<AddModuleModal*/}
      {/*  isOpen={isOpen}*/}
      {/*  onOpenChange={onOpenChange}*/}
      {/*  onClose={onOpenChange}*/}
      {/*  selectedSchool={school!}*/}
      {/*/>*/}
    </>
  );
}

// interface AddModuleModalProps {
//   isOpen: boolean;
//   onOpenChange: (open: boolean) => void;
//   onClose: () => void;
//   selectedSchool: School;
// }
//
// const addModuleFormSchema = z.object({
//   moduleName: z.string().nullable(),
//   points: z.coerce.number().positive('Please select a grade').nullable(),
//   credits: z.coerce
//     .number({
//       required_error: 'Credit unit is required',
//       invalid_type_error: 'Credit unit must be a number',
//     })
//     .positive('Credit unit must be positive')
//     .nullable(),
// });

// const initialValues = {
//   moduleName: '',
//   points: 0,
//   credits: 0,
// };
//
// function AddModuleModal({
//   isOpen,
//   onOpenChange,
//   onClose,
//   selectedSchool,
// }: AddModuleModalProps) {
//   const { addModule } = useGPAContext();
//
//   function submitForm(values: {
//     moduleName: string;
//     points: number;
//     credits: number;
//   }) {
//     console.log('values', values);
//
//     addModule({
//       ...values,
//       name: values.moduleName,
//       grade: getGradeByPoints(selectedSchool, values.points) || 'A',
//       credits: parseFloat(values.credits.toString()),
//     });
//
//     onClose();
//     resetForm();
//   }
//
//   const {
//     values,
//     handleSubmit,
//     resetForm,
//     isValid,
//     errors,
//     setFieldValue,
//     dirty,
//     touched,
//   } = useFormik({
//     initialValues: initialValues,
//     validationSchema: toFormikValidationSchema(addModuleFormSchema),
//     onSubmit: submitForm,
//   });
//
//   console.log(values);
//
//   return (
//     <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
//       <ModalContent>
//         {(onClose) => (
//           <>
//             <ModalHeader className="flex flex-col gap-1">
//               Add Module
//             </ModalHeader>
//             <ModalBody>
//               <Input
//                 type="text"
//                 label="Module Name"
//                 isInvalid={touched.moduleName && !!errors.moduleName}
//                 errorMessage={touched.moduleName && errors.moduleName}
//                 placeholder="Introduction to Computer Science"
//                 value={values.moduleName}
//                 onChange={(e) => {
//                   setFieldValue('moduleName', e.target.value);
//                 }}
//               />
//
//               <Select
//                 isRequired
//                 isInvalid={touched.points && !!errors.points}
//                 errorMessage={touched.points && errors.points}
//                 label={`Grade ${values.moduleName && `for "${values.moduleName}"`}`}
//                 placeholder="Select a grade"
//                 className="min-w-full"
//                 multiple={false}
//                 selectionMode="single"
//                 selectedKeys={values.points.toString()}
//                 value={values.points.toString() || undefined}
//                 onChange={(e) => {
//                   console.log(
//                     'selection',
//                     e.target.value,
//                     getPointsByGrade(selectedSchool, e.target.value)
//                   );
//
//                   const val = getPointsByGrade(selectedSchool, e.target.value);
//
//                   console.log(
//                     'selection2',
//                     getGradeByPoints(selectedSchool, val)
//                   );
//                   setFieldValue('points', val);
//                 }}
//               >
//                 {Object.entries(selectedSchool?.grades || {}).map(
//                   ([grade, points]) => (
//                     <SelectItem key={grade} value={grade}>
//                       {grade} ({points})
//                     </SelectItem>
//                   )
//                 )}
//               </Select>
//
//               <Input
//                 isInvalid={touched.credits && !!errors.credits}
//                 errorMessage={touched.credits && errors.credits}
//                 type="text"
//                 label={`Credit Units ${values.moduleName && `for "${values.moduleName}"`}`}
//                 placeholder="6"
//                 value={values.credits.toString() || undefined}
//                 onChange={(e) => {
//                   setFieldValue('credits', e.target.value);
//                 }}
//                 isRequired
//               />
//             </ModalBody>
//             <ModalFooter>
//               <Button color="danger" onClick={onClose}>
//                 Close
//               </Button>
//               <Button
//                 disabled={!isValid && dirty}
//                 color="primary"
//                 onClick={() => submitForm(values)}
//               >
//                 Add Module
//               </Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// }
