import { useState, useEffect } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { RequiredDimensions } from '../../types/dimensions.type';

/**
 * Executes a given function whenever the ResizeObserver detects change in
 * the document.body.
 * @param handleResize: function to execute when window is resized.
 * @returns
 * @see windowDimensions: the current window dimensions.
 */
export const useWindowDimensions = (
  handleResize?: ({ width, height }: RequiredDimensions<number>) => void
): RequiredDimensions<number> => {
  const [windowDimensions, setWindowDimensions] = useState<
    RequiredDimensions<number>
  >({
    width: 0,
    height: 0,
  });

  /**
   * Listens for resize events using a ResizeObserver attached to the document body.
   * Executes the onResize function with the new document.body dimensions.
   */

  useEffect(() => {
    const onResize = (dimensions: RequiredDimensions<number>) => {
      setWindowDimensions(dimensions);
      handleResize?.(dimensions);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { inlineSize: width, blockSize: height } =
          entry.contentBoxSize[0];

        onResize({ width, height });
      }
    });

    resizeObserver.observe(document.body);

    return () => resizeObserver.unobserve(document.body);
  }, [handleResize]);

  return windowDimensions;
};
