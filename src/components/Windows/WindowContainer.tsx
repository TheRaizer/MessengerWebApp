import { m, useDragControls } from 'framer-motion';
import {
  PointerEvent,
  ReactElement,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { WindowProps } from '../../../types/components/Windows/WindowProps.type';
import { Dimensions } from '../../../types/dimensions.type';
import { INITIAL_WINDOW_DIMENSIONS } from '../../constants/dimensions';
import { CenteredCol } from '../common/Col';
import { DimensionStyles } from '../common/StyledDimensions';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { WindowHeader } from './WindowHeader';

const Styled = {
  WindowContainer: styled(CenteredCol)<Dimensions<string | number>>`
    position: absolute;
    ${DimensionStyles}
    border: 1px solid black;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.75);
    resize: both;
  `,
};

export const WindowContainer = ({
  title,
  children,
}: WindowProps): ReactElement => {
  const { width, height } = useWindowDimensions();

  const windowContainerRef = useRef<HTMLDivElement>(null);

  // stores some getBoundingClientRect() values of the windowContainerRef from the latest drag event
  const latestDragPositionRef = useRef<{
    top: number;
    left: number;
    bottom: number;
    right: number;
  }>({ top: 0, left: 0, bottom: 0, right: 0 });

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useLayoutEffect(() => {
    if (!windowContainerRef.current) return;

    const { offsetWidth, offsetHeight } = windowContainerRef.current;

    setWindowWidth(offsetWidth);
    setWindowHeight(offsetHeight);

    const { top, left, bottom, right } =
      windowContainerRef.current.getBoundingClientRect();

    if (!latestDragPositionRef.current) return;
    latestDragPositionRef.current = { top, left, bottom, right };
  }, []);

  const dragControls = useDragControls();

  const startDrag = (event: PointerEvent) => {
    dragControls.start(event);
  };

  const dragConstraints = {
    top: 0,
    left: 0,
    right: width - windowWidth,
    bottom: height - windowHeight,
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
      ? width - windowWidth
      : latestDragPositionRef.current.left;

  const positionY =
    latestDragPositionRef.current.bottom > height
      ? height - windowHeight
      : latestDragPositionRef.current.top;

  return (
    <Styled.WindowContainer
      initial={{ x: positionX, y: positionY }}
      drag
      dragConstraints={dragConstraints}
      dragElastic={0}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      onDragEnd={() => {
        if (!windowContainerRef.current) return;

        const { right, bottom, top, left } =
          windowContainerRef.current.getBoundingClientRect();
        latestDragPositionRef.current = { right, bottom, top, left };
      }}
      {...INITIAL_WINDOW_DIMENSIONS}
      as={m.article}
      ref={windowContainerRef}
      // use key made up of window width and height so this element rerenders whenever window is resized.
      key={JSON.stringify({ width, height })}
    >
      <WindowHeader title={title} onPointerDown={startDrag} />
      {children}
    </Styled.WindowContainer>
  );
};
