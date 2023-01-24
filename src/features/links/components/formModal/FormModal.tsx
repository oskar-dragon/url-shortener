/* eslint-disable react/require-default-props */
import React, { Fragment, type ReactNode } from 'react';
import { Button } from 'components/elements';
import { Dialog, Transition } from '@headlessui/react';
import { Form } from 'components';
import { useForm } from 'hooks';
import type { TypeOf, ZodSchema } from 'zod';
import type { DeepPartial, SubmitHandler } from 'react-hook-form';

type FormModalProps<T extends ZodSchema<any>> = {
  title: string;
  description: string;
  isOpen: boolean;
  onSubmit: SubmitHandler<TypeOf<T>>;
  onSubmitText: string;
  onCancel: () => void;
  onCancelText: string;
  schema: T;
  defaultValues?: DeepPartial<TypeOf<T>>;
  children: ReactNode;
};

function FormModal<T extends ZodSchema<any>>({
  title,
  description,
  isOpen,
  onSubmitText,
  onSubmit,
  onCancelText,
  onCancel,
  schema,
  defaultValues,
  children,
}: FormModalProps<T>) {
  const form = useForm({
    schema,
    defaultValues,
  });

  function handleClose() {
    form.reset();
    onCancel();
  }

  function handleSubmit(data: TypeOf<T>) {
    onSubmit(data);
    form.reset();
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => handleClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300,"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="enter-in duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative transform overlfow-hidden overflow-y-auto rounded-lg bg-white transition-all w-full sm:w-[550px]">
                <Form form={form} onSubmit={(data) => handleSubmit(data)}>
                  <div className="px-4 sm:px-8 py-6">
                    <div className="space-y-2 mb-5">
                      <Dialog.Title as="h3" className="text-3xl font-medium leading-6 text-black">
                        {title}
                      </Dialog.Title>
                      <Dialog.Description className="text-sm text-neutral-500">
                        {description}
                      </Dialog.Description>
                    </div>
                    {children}
                  </div>
                  <div className="bg-neutral-50 px-4 sm:px-8 py-3 flex flex-col sm:flex-row-reverse gap-2 sm-gap-4 text-center">
                    <Button type="submit" size="sm" variant="blue">
                      {onSubmitText}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleClose()}>
                      {onCancelText}
                    </Button>
                  </div>
                </Form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default FormModal;
