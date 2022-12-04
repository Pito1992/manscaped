import React from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import XMark from 'assets/images/x-mark.svg';
import Loading from 'components/Loading';

const Portal = dynamic(() => import('components/Portal'), {
  loading: () => <Loading />,
  ssr: false,
})

interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
  onClose?: () => void;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<IModalProps> = ({
  visible = false, onClose, header, body, footer, className, ...restProps
}: IModalProps) => {
  const handleOnClose = React.useCallback(() => {;
    onClose?.();
  }, [onClose]);

  if (!visible) return null;

  return (
    <Portal>
      <>
        <div data-testid='modal-overlay' className='fixed z-10 top-0 left-0 right-0 bottom-0 bg-overlay' onClick={handleOnClose} />
        <div
          data-testid="modal"
          {...restProps}
          className={classNames('fixed z-20 top-1/2 left-0 right-0 px-2 sm:px-3 w-full max-w-lg mx-auto -translate-y-1/2', className)}
        >
          <div className='relative mx-auto rounded p-3 sm:p-6 w-full bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.2)] leading-normal'>
            <button
              data-testid='modal-btn-close'
              className='absolute top-1.5 right-1.5 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 leading-none border-0 bg-transparent focus:ring-0'
              onClick={handleOnClose}
            >
              <XMark className="w-full h-full" />
            </button>
            <div>
              {header && (
                <>
                  {header}
                  <hr className="border-solid border-gray my-2 sm:my-3" />
                </>
              )}
              {body && <div className='min-h-[96px]'>{body}</div>}
              {footer && (
                <>
                  <hr className="border-solid border-gray my-2 sm:my-3" />
                  {footer}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    </Portal>
  );
}

export default Modal