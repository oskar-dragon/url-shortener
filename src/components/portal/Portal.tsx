/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type PortalProps = {
  children: ReactNode;
};

function Portal({ children }: PortalProps) {
  const el = document.createElement('div');
  const wrapper: React.RefObject<HTMLElement> = useRef(el);

  useEffect(() => {
    const current = wrapper.current as HTMLElement;
    current.setAttribute('id', 'overlay');
    document.body.appendChild(current);

    return () => {
      document.body.removeChild(current);
    };
  }, []);

  if (!wrapper.current) {
    return <>{null}</>;
  }
  return createPortal(
    <div className="block fixed pt-24 left-0 top-0 w-full h-full overflow-auto">{children}</div>,
    wrapper.current,
  );
}

export default Portal;
