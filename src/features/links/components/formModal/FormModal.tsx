// import React, { Fragment, type ReactNode } from 'react';
// import { Button } from 'components/elements';
// import { Dialog, Transition } from '@headlessui/react';
// import { Form } from 'components';

// type FormModalProps = {
//   title: string;
//   description: string;
//   isOpen: boolean;
//   onSubmit: (data: T) => void;
//   onSubmitText: string;
//   onCancel: () => void;
//   onCancelText: string;
//   children: ReactNode;
// };

// function FormModal({
//   title,
//   description,
//   isOpen,
//   onSubmitText,
//   onSubmit,
//   onCancelText,
//   onCancel,
//   children,
// }: FormModalProps) {
//   return (
//     <Transition.Root show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-10" onClose={() => secondAction()}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-300,"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" />
//         </Transition.Child>
//         <div className="fixed inset-0 z-10 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="enter-in duration-300"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="relative transform overlfow-hidden overflow-y-auto rounded-lg bg-white transition-all w-full sm:w-fit">
//                 <Form onSubmit={(e) => onSubmit(e)}>
//                   <div className="px-4 sm:px-8 py-4">
//                     <div className="space-y-2 mb-5">
//                       <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-black">
//                         {title}
//                       </Dialog.Title>
//                       <Dialog.Description className="text-sm text-neutral-500">
//                         {description}
//                       </Dialog.Description>
//                     </div>
//                     {children}
//                   </div>
//                   <div className="bg-neutral-50 px-4 sm:px-8 py-3 flex flex-col sm:flex-row-reverse gap-2 sm-gap-4 text-center">
//                     <Button type="submit" size="sm" variant="blue">
//                       {onSubmitText}
//                     </Button>
//                     <Button size="sm" variant="light" onClick={() => onCancel()}>
//                       {onCancelText}
//                     </Button>
//                   </div>
//                 </Form>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// }

// export default FormModal;
