import { Transition } from '@headlessui/react';
import { Toaster as HotToast, resolveValue, type ToastType, ToastIcon } from 'react-hot-toast';
import { cva } from 'class-variance-authority';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import SpinnerIcon from 'assets/icons/spinner.svg';

const toasterStyle = cva('transform py-4 px-4 flex items-center bg-white rounded shadow-lg', {
  variants: {
    variant: {
      default: [],
      success: [],
      loading: [],
      blank: [],
      error: [],
      custom: [],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function statusMap(type: ToastType) {
  switch (type) {
    case 'success': {
      return 'Success';
    }
    case 'error': {
      return 'Error';
    }
    case 'loading': {
      return 'Loading';
    }
    default: {
      return 'Info';
    }
  }
}

function componentMap(type: ToastType) {
  switch (type) {
    case 'success': {
      return <CheckCircleIcon className="h-6 w-6 text-success-600" />;
    }
    case 'error': {
      return <ExclamationTriangleIcon className="h-6 w-6 text-error-500" />;
    }
    case 'loading': {
      return <SpinnerIcon className="h-5 w-5 animate-spin text-royal-600" />;
    }
    default: {
      return <InformationCircleIcon className="h-6 w-6 text-royal-600" />;
    }
  }
}

function Toaster() {
  return (
    <HotToast>
      {(t) => (
        <Transition
          appear
          show={t.visible}
          className={toasterStyle({ variant: t.type })}
          enter="transition-all duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          {componentMap(t.type)}
          <div className="space-y-1 ml-4">
            <p className="text-sm font-semibold text-neutral-700">{resolveValue(t.message, t)}</p>
          </div>
        </Transition>
      )}
    </HotToast>
  );
}

export default Toaster;
