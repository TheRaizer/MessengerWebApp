import { useEffect, RefObject } from 'react';

/**
 * Fires an event when user clicks outside of a given element.
 * @param ref Element to detect a click outside of.
 * @param doOnOutsideClick An event fired when outside of element is clicked.
 */
export const useOutsideClickDetection = (
  ref: RefObject<HTMLElement> | null,
  doOnOutsideClick: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref || !ref.current || ref.current.contains(event.target as Node))
        return;

      doOnOutsideClick();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, doOnOutsideClick]);
};
