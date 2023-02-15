import {
  ReactElement,
  useCallback,
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
  NAV_BAR_HEIGHT,
  WINDOW_HEADER_HEIGHT,
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
  WindowContent: styled.div`
    width: 100%;
    height: calc(100% - ${WINDOW_HEADER_HEIGHT}px);
  `,
};

export const WindowContainer = ({
  title,
  children,
  windowId,
}: WindowProps): ReactElement => {
  const { width: viewportWidth, height: viewportHeight } =
    useWindowDimensions();

  const windowContainerRef = useRef<HTMLDivElement>(null);
  const draggableContainerRef = useRef<HTMLDivElement>(null);

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const dragConstraints = {
    top: 0,
    left: 0,
    right: viewportWidth - windowWidth,
    bottom: viewportHeight - windowHeight - NAV_BAR_HEIGHT,
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

  const calculateResizeDisplacement = (event: MoveEvent) => {
    const newTotalDeltaX = totalResizeDeltaX.current + event.deltaRect.left;
    const newTotalDeltaY = totalResizeDeltaY.current + event.deltaRect.top;

    // calculate the displacement from the last deltas to the current ones, and simulate a drag event.
    const displacementX = newTotalDeltaX - totalResizeDeltaX.current;
    const displacementY = newTotalDeltaY - totalResizeDeltaY.current;

    return { newTotalDeltaX, newTotalDeltaY, displacementX, displacementY };
  };

  const move = useCallback(
    (event: MoveEvent) => {
      //* this move function is NOT called every frame, so there is some unexpected behaviour when resizing very fast.

      const { newTotalDeltaX, newTotalDeltaY, displacementX, displacementY } =
        calculateResizeDisplacement(event);

      const resizeWidth = (constantHeight?: number) => {
        updateWindowDimensions(
          event.rect.width,
          constantHeight || windowHeight
        );
        simulateDrag(displacementX, 0);

        totalResizeDeltaX.current = newTotalDeltaX;
      };

      const resizeHeight = (constantWidth?: number) => {
        updateWindowDimensions(constantWidth || windowWidth, event.rect.height);
        simulateDrag(0, displacementY);

        totalResizeDeltaY.current = newTotalDeltaY;
      };

      // restrict width and height at minimum bounds
      if (event.rect.width < MINIMUM_WINDOW_WIDTH)
        return resizeHeight(MINIMUM_WINDOW_WIDTH);

      if (event.rect.height < MINIMUM_WINDOW_HEIGHT)
        return resizeWidth(MINIMUM_WINDOW_HEIGHT);

      // restrict width and height at maximum bounds
      if (event.rect.width >= viewportWidth) return resizeHeight(viewportWidth);

      if (event.rect.height >= viewportHeight)
        return resizeWidth(viewportHeight);

      updateWindowDimensions(event.rect.width, event.rect.height);
      simulateDrag(displacementX, displacementY);

      totalResizeDeltaX.current = newTotalDeltaX;
      totalResizeDeltaY.current = newTotalDeltaY;
    },
    [simulateDrag, viewportHeight, viewportWidth, windowHeight, windowWidth]
  );

  useEffect(() => {
    if (!windowContainerRef.current) return;

    interact(windowContainerRef.current).resizable({
      edges: { top: false, left: true, bottom: true, right: true },
      listeners: {
        move,
      },
    });
  }, [move]);

  return (
    <Styled.DraggableContainer
      style={{ x: position.x, y: position.y }}
      onMouseDown={() => changeActiveIndex(windowId)}
      ref={draggableContainerRef}
    >
      <Styled.WindowContainer
        {...INITIAL_WINDOW_DIMENSIONS}
        ref={windowContainerRef}
      >
        <WindowHeader title={title} windowId={windowId} dragBind={bind} />
        <Styled.WindowContent>{children}</Styled.WindowContent>
      </Styled.WindowContainer>
    </Styled.DraggableContainer>
  );
};
