import { useState, useEffect, useCallback } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';

/**
 * Executes a given function whenever the ResizeObserver detects change in
 * the document.body.
 * @param handleResize: function to execute when window is resized.
 * @returns
 * @see windowDimensions: the current window dimensions.
 */
export const useWindowDimensions = (
  handleResize: ({ width, height }: { width: number; height: number }) => void
): { width: number; height: number } => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  const onResize = useCallback(
    (dimensions: { width: number; height: number }) => {
      setWindowDimensions(dimensions);
      handleResize(dimensions);
    },
    [handleResize]
  );

  /**
   * Listens for resize events using a ResizeObserver attached to the document body.
   * Executes the onResize function with the new document.body dimensions.
   */

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { inlineSize: width, blockSize: height } =
          entry.contentBoxSize[0];

        onResize({ width, height });
      }
    });

    resizeObserver.observe(document.body);

    return () => resizeObserver.unobserve(document.body);
  }, [onResize]);

  return windowDimensions;
};
