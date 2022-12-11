import {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { WindowProps } from '../../../types/components/Windows/Window.type';
import { Dimensions } from '../../../types/dimensions.type';
import {
  INITIAL_WINDOW_DIMENSIONS,
  MINIMUM_WINDOW_HEIGHT,
  MINIMUM_WINDOW_WIDTH,
} from '../../constants/dimensions';
import { CenteredCol } from '../common/Col';
import { DimensionStyles } from '../common/StyledDimensions';
import { WindowHeader } from './WindowHeader';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { animated } from 'react-spring';
import { useDragViewportConstrained } from '../../hooks/useDragViewportConstrained';
import { changeActiveIndex } from '../../helpers/window/windowIndexManager';
import interact from 'interactjs';
import { MoveEvent } from '../../../types/interactjs.type';

const Styled = {
  WindowContainer: styled(CenteredCol)<Dimensions<string>>`
    ${DimensionStyles}
    border: 1px solid black;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.75);
    background-color: var(--primary-color);
    touch-action: none;
  `,
  DraggableContainer: styled(animated.div)`
    position: absolute;
    z-index: inherit;
  `,
};

export const WindowContainer = ({
  title,
  children,
  windowId,
}: WindowProps): ReactElement => {
  const { width, height } = useWindowDimensions();

  const windowContainerRef = useRef<HTMLDivElement>(null);
  const draggableContainerRef = useRef<HTMLDivElement>(null);

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [enabled, setEnabled] = useState(false);

  const dragConstraints = {
    top: 0,
    left: 0,
    right: width - windowWidth,
    bottom: height - windowHeight,
  };

  // stores the overall resize delta value which is used to calculate the displacement of the window during resize
  const totalResizeDeltaX = useRef<number>(0);
  const totalResizeDeltaY = useRef<number>(0);

  const { bind, position, simulateDrag } = useDragViewportConstrained(
    dragConstraints,
    {
      x: 0,
      y: 0,
    }
  );

  const assignActiveWindowZIndex = () => {
    changeActiveIndex(windowId);
  };

  useLayoutEffect(() => {
    if (!windowContainerRef.current) return;

    const { offsetWidth, offsetHeight } = windowContainerRef.current;

    setWindowWidth(offsetWidth);
    setWindowHeight(offsetHeight);
  }, []);

  const updateWindowDimensions = (newWidth: number, newHeight: number) => {
    setWindowWidth(newWidth);
    setWindowHeight(newHeight);

    if (!windowContainerRef.current) return;
    Object.assign(windowContainerRef.current.style, {
      width: `${newWidth}px`,
      height: `${newHeight}px`,
    });
  };

  useEffect(() => {
    if (!windowContainerRef.current || enabled) return;
    setEnabled(true);

    interact(windowContainerRef.current).resizable({
      edges: { top: false, left: true, bottom: true, right: true },
      listeners: {
        move: (event: MoveEvent) => {
          //* this move function is NOT called every frame, so there is some unexpected behaviour when resizing very fast.

          // restrict width and height
          if (event.rect.width < MINIMUM_WINDOW_WIDTH) {
            updateWindowDimensions(MINIMUM_WINDOW_WIDTH, event.rect.height);
            return;
          }
          if (event.rect.height < MINIMUM_WINDOW_HEIGHT) {
            updateWindowDimensions(event.rect.width, MINIMUM_WINDOW_HEIGHT);
            return;
          }

          const newTotalDeltaX =
            totalResizeDeltaX.current + event.deltaRect.left;
          const newTotalDeltaY =
            totalResizeDeltaY.current + event.deltaRect.top;

          // calculate the displacement from the last deltas to the current ones, and simulate a drag event.
          const displacementX = newTotalDeltaX - totalResizeDeltaX.current;
          const displacementY = newTotalDeltaY - totalResizeDeltaY.current;
          simulateDrag(displacementX, displacementY);

          totalResizeDeltaX.current = newTotalDeltaX;
          totalResizeDeltaY.current = newTotalDeltaY;

          updateWindowDimensions(event.rect.width, event.rect.height);
        },
      },
    });
  }, [simulateDrag, enabled]);

  return (
    <Styled.DraggableContainer
      style={{ x: position.x, y: position.y }}
      onMouseDown={assignActiveWindowZIndex}
      ref={draggableContainerRef}
    >
      <Styled.WindowContainer
        {...INITIAL_WINDOW_DIMENSIONS}
        ref={windowContainerRef}
      >
        <WindowHeader title={title} windowId={windowId} dragBind={bind} />
        {children}
      </Styled.WindowContainer>
    </Styled.DraggableContainer>
  );
};
