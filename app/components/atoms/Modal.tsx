import React, { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';

import clsx from 'clsx';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  title?: string;
  onClose?: () => void;
}

const styles = {
  backgroundContainer: 'items-center fixed inset-0 flex justify-center z-50 bg-black bg-opacity-80',
  contentMainContainer:
    'max-h-full flex mx-6 md:mx-0 flex justify-center w-full md:h-auto md:max-w-xl',
  contentContainer:
    'rounded-2xl max-h-full flex flex-col bg-white border-0 p-6 space-y-1 overflow-y-auto w-full',
};

/**
 * Pop-up window for information display.
 *
**/
export const Modal = ({ children, isOpen, title = undefined, onClose = undefined }: Props) => {
  if (!isOpen) return <></>;

  const ButtonClose = () => {
    if (!onClose) return <></>;

    return (
      <div className="w-1/4 text-right">
        <button
          type="button"
          className="inline-flex items-center text-sm text-neutral-70 bg-transparent rounded-lg ml-auto p-1.5 border-0 hover:bg-neutral-95 hover:text-neutral-20"
          data-modal-toggle="defaultModal"
          onClick={onClose}
        >
          X
        </button>
      </div>
    );
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.code === 'Escape' && onClose) onClose();
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLInputElement;
    if (target.id === 'backgroundContainer' && onClose) onClose();
  };

  return createPortal(
    <div
      id="backgroundContainer"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={-1}
      className={styles.backgroundContainer}
    >
      <div className={styles.contentMainContainer}>
        <div className={styles.contentContainer}>
          <div
            className={clsx('flex', {
              'justify-start': title || !onClose,
              'justify-end': !title,
            })}
          >
            {title ? (
              <>
                <div className="w-3/4">
                  <span className="text-lg font-extrabold text-neutral-20">{title}</span>
                </div>
                <ButtonClose />
              </>
            ) : (
              false
            )}
          </div>
          {title ? <hr /> : false}
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};
