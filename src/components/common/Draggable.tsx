import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { forwardRef, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { DraggableProps } from '../../../types/components/common/Draggable.type';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

const Styled = {
  DraggableContainer: styled(animated.div)`
    position: absolute;
    touch-action: none;
  `,
};

/**
 * A wrapper for any draggable component, that keeps the draggable component,
 * within the given dragConstraints on window resize.
 *
 * There is a bug in framer that disables the drag constraints whenever window resize happens.
 *
 * This component is a fix for that.
 */
export const Draggable = forwardRef<HTMLDivElement, DraggableProps>(
  ({ children, dragConstraints, onMouseDown, ...props }, ref): ReactElement => {
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

    if (width > 0 && lastX > dragConstraints.right) {
      x.set(dragConstraints.right);
    }

    if (height > 0 && lastY > dragConstraints.bottom) {
      y.set(dragConstraints.bottom);
    }

    return (
      <Styled.DraggableContainer
        {...props}
        onMouseDown={onMouseDown}
        {...bind()}
        ref={ref}
        style={{ x, y }}
      >
        {children}
      </Styled.DraggableContainer>
    );
  }
);

Draggable.displayName = 'Draggable';
