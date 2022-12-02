import { useDrag } from '@use-gesture/react';
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';
import { useEffect, useState } from 'react';
import { useSpring } from 'react-spring';
import { Coordinate } from '../../types/Coordinate.type';
import { Position } from '../../types/Position.type';
import { useWindowDimensions } from './useWindowDimensions';

export const useDragWindowConstrained = (
  dragConstraints: Position
): {
  bind: (...args: unknown[]) => ReactDOMAttributes;
  position: Coordinate;
} => {
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(
    ({ offset: [xOffset, yOffset] }) => {
      setLastX(xOffset);
      setLastY(yOffset);
      api.set({
        x: xOffset,
        y: yOffset,
      });
    },
    {
      bounds: () => {
        return dragConstraints;
      },
    }
  );

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (width > 0 && lastX > dragConstraints.right) {
      x.set(dragConstraints.right);
    }

    if (height > 0 && lastY > dragConstraints.bottom) {
      y.set(dragConstraints.bottom);
    }
  }, [
    dragConstraints.bottom,
    dragConstraints.right,
    height,
    lastX,
    lastY,
    width,
    x,
    y,
  ]);

  return { bind, position: { x: x.get(), y: y.get() } };
};
