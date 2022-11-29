import { m } from 'framer-motion';
import { ReactElement, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { DraggableProps } from '../../../types/components/common/Draggable.type';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

const Styled = {
  DraggableContainer: styled(m.div)`
    position: absolute;
  `,
};

/**
 * A wrapper for any draggable component, that keeps the draggable component,
 * within the viewport on window resize.
 *
 * Framer motion drag does not account for window resize.
 * There is a bug in framer that disables the drag constraints whenever window resize happens.
 *
 * This component is a fix for that.
 */
export const Draggable = ({
  children,
  dragControls,
  dragConstraints,
  ...props
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

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const { top, left, bottom, right } =
      containerRef.current.getBoundingClientRect();

    if (!latestDragPositionRef.current) return;
    latestDragPositionRef.current = { top, left, bottom, right };
  }, []);

  /**
   * If the right side of the container from its last dragged location,
   * is no longer in the viewport, set its current position so that its rightmost side
   * is attached to the right side of the drag constraint. Otherwise leave it at its last dragged
   * location, adjusted by its width.
   *
   * The same is said but for the bottom of the container.
   *
   * The left and top values are used in the case that the container is in the viewport.
   * This is because an element's x and y position in framer motion is defined by its top and left.
   */
  const positionX =
    latestDragPositionRef.current.right > width
      ? dragConstraints.right
      : latestDragPositionRef.current.left;

  const positionY =
    latestDragPositionRef.current.bottom > height
      ? dragConstraints.bottom
      : latestDragPositionRef.current.top;

  return (
    <Styled.DraggableContainer
      initial={{ x: positionX, y: positionY }}
      drag
      dragConstraints={dragConstraints}
      dragControls={dragControls}
      {...props}
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
    </Styled.DraggableContainer>
  );
};
