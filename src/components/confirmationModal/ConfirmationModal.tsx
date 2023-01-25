import { Fragment, useRef } from 'react';
import { Button, type ButtonProps } from 'components/elements';
import { Dialog, Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { cva, type VariantProps } from 'class-variance-authority';

const iconStyles = cva(
  'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 sm:mx-0 sm:h-10 sm:w-10',
  {
    variants: {
      variant: {
        default: ['bg-royal-50', 'text-royal-600'],
        error: ['bg-error-50', 'text-error-600'],
        success: ['bg-success-50', 'text-success-600'],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ConfirmationModalProps = {
  title: string;
  body: string;
  isOpen: boolean;
  primaryActionText: string;
  secondaryActionText: string;
  primaryAction: () => void;
  secondaryAction: () => void;
} & VariantProps<typeof iconStyles>;

function ConfirmationModal({
  title,
  body,
  isOpen,
  variant,
  primaryActionText,
  secondaryActionText,
  primaryAction,
  secondaryAction,
}: ConfirmationModalProps) {
  const cancelButtonRef = useRef(null);

  if (!isOpen) return null;

  const primaryButtonVariant: ButtonProps['variant'] = variant === 'error' ? 'red' : 'blue';

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => secondaryAction()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-10">
                  <div className="sm:flex sm:items-start">
                    <div className={iconStyles({ variant })}>
                      <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6 text-neutral-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{body}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-neutral-50 px-4 py-3 flex flex-col sm:flex-row-reverse sm:px-6  gap-2 sm:gap-4">
                  <Button variant={primaryButtonVariant} onClick={() => primaryAction()}>
                    {primaryActionText}
                  </Button>
                  <Button variant="outline" onClick={() => secondaryAction()}>
                    {secondaryActionText}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ConfirmationModal;
