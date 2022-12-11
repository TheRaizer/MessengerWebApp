import { useDrag } from '@use-gesture/react';
import { useEffect, useState } from 'react';
import { useSpring } from 'react-spring';
import { Coordinate } from '../../types/Coordinate.type';
import { ConstrainedDragReturn } from '../../types/hooks/useDragViewportConstrained.type';
import { Position } from '../../types/Position.type';
import { useWindowDimensions } from './useWindowDimensions';

export const useDragViewportConstrained = (
  dragConstraints: Position,
  initialCoordinates: Coordinate
): ConstrainedDragReturn => {
  // these states are used to keep track of the last updated x and y before constraining occurs
  // this allows the element to automatically return back to the last dragged position when moving constraints.
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const [{ x, y }, api] = useSpring(() => initialCoordinates);

  const updatePosition = (newX: number, newY: number) => {
    setLastX(newX);
    setLastY(newY);

    api.set({
      x: newX,
      y: newY,
    });
  };

  const bind = useDrag(
    ({ offset: [xOffset, yOffset] }) => updatePosition(xOffset, yOffset),
    {
      bounds: () => {
        return dragConstraints;
      },
      from: () => [x.get(), y.get()],
    }
  );

  const simulateDrag = (xOffset: number, yOffset: number) => {
    const newX = x.get() + xOffset;
    const newY = y.get() + yOffset;

    updatePosition(newX, newY);
  };

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    // manage constraints without renewing lastX or lastY states.
    if (lastX < dragConstraints.left) {
      x.set(dragConstraints.left);
    }
    if (lastY < dragConstraints.top) {
      y.set(dragConstraints.top);
    }
    // width and height of window are 0 on initial render, so we need to ignore that.
    if (width > 0 && lastX > dragConstraints.right) {
      x.set(dragConstraints.right);
    }
    if (height > 0 && lastY > dragConstraints.bottom) {
      y.set(dragConstraints.bottom);
    }
  }, [
    dragConstraints.bottom,
    dragConstraints.left,
    dragConstraints.right,
    dragConstraints.top,
    height,
    lastX,
    lastY,
    width,
    x,
    y,
  ]);

  return { bind, position: { x: x.get(), y: y.get() }, simulateDrag };
};
