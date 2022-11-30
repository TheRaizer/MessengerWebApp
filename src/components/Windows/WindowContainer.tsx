import { useDragControls } from 'framer-motion';
import {
  PointerEvent,
  ReactElement,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { WindowProps } from '../../../types/components/Windows/Window.type';
import { Dimensions } from '../../../types/dimensions.type';
import { INITIAL_WINDOW_DIMENSIONS } from '../../constants/dimensions';
import { CenteredCol } from '../common/Col';
import { DimensionStyles } from '../common/StyledDimensions';
import { WindowHeader } from './WindowHeader';
import { Draggable } from '../common/Draggable';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

const Styled = {
  WindowContainer: styled(CenteredCol)<Dimensions<string>>`
    ${DimensionStyles}
    border: 1px solid black;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.75);
    resize: both;
  `,
};

export const WindowContainer = ({
  title,
  children,
  windowId,
}: WindowProps): ReactElement => {
  const { width, height } = useWindowDimensions();
  const windowContainerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const startDrag = (event: PointerEvent) => {
    dragControls.start(event);
  };

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useLayoutEffect(() => {
    if (!windowContainerRef.current) return;

    const { offsetWidth, offsetHeight } = windowContainerRef.current;

    setWindowWidth(offsetWidth);
    setWindowHeight(offsetHeight);
  }, []);

  const dragConstraints = {
    top: 0,
    left: 0,
    right: width - windowWidth,
    bottom: height - windowHeight,
  };

  return (
    <Draggable
      dragControls={dragControls}
      dragElastic={0}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={dragConstraints}
    >
      <Styled.WindowContainer
        {...INITIAL_WINDOW_DIMENSIONS}
        ref={windowContainerRef}
      >
        <WindowHeader
          title={title}
          onPointerDown={startDrag}
          windowId={windowId}
        />
        {children}
      </Styled.WindowContainer>
    </Draggable>
  );
};
