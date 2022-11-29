import { m } from 'framer-motion';
import { ReactElement, useLayoutEffect, useRef, useState } from 'react';
import { DraggableProps } from '../../../types/components/common/Draggable.type';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

export const Draggable = ({
  children,
  dragControls,
}: DraggableProps): ReactElement => {
  const { width, height } = useWindowDimensions();

  const containerRef = useRef<HTMLDivElement>(null);

  // stores some getBoundingClientRect() values of the windowContainerRef from the latest drag event
  const latestDragPositionRef = useRef<{
    top: number;
    left: number;
    bottom: number;
    right: number;
  }>({ top: 0, left: 0, bottom: 0, right: 0 });

  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const { offsetWidth, offsetHeight } = containerRef.current;

    setContainerWidth(offsetWidth);
    setContainerHeight(offsetHeight);

    const { top, left, bottom, right } =
      containerRef.current.getBoundingClientRect();

    if (!latestDragPositionRef.current) return;
    latestDragPositionRef.current = { top, left, bottom, right };
  }, []);

  const dragConstraints = {
    top: 0,
    left: 0,
    right: width - containerWidth,
    bottom: height - containerHeight,
  };

  /**
   * If the right side of the window container from its last dragged location,
   * is no longer in the viewport, set its current position so that its rightmost side
   * is attached to the right side of the viewport. Otherwise leave it at its last dragged
   * location, adjusted by its width.
   *
   * The same is said but for the bottom of the window container.
   *
   * The left and top values are used in the case that the window container is in the viewport.
   * This is because an element's x and y position in framer motion is defined by its top and left.
   */
  const positionX =
    latestDragPositionRef.current.right > width
      ? width - containerWidth
      : latestDragPositionRef.current.left;

  const positionY =
    latestDragPositionRef.current.bottom > height
      ? height - containerHeight
      : latestDragPositionRef.current.top;

  return (
    <m.div
      initial={{ x: positionX, y: positionY }}
      drag
      dragConstraints={dragConstraints}
      dragElastic={0}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      onDragEnd={() => {
        if (!containerRef.current) return;

        const { right, bottom, top, left } =
          containerRef.current.getBoundingClientRect();
        latestDragPositionRef.current = { right, bottom, top, left };
      }}
      ref={containerRef}
      // use key made up of window width and height so this element rerenders whenever window is resized.
      key={JSON.stringify({ width, height })}
    >
      {children}
    </m.div>
  );
};
