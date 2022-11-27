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

const Styled = {
  WindowContainer: styled(CenteredCol)<Dimensions<string | number>>`
    ${DimensionStyles}
    border: 1px solid black;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.75);
    resize: both;
  `,
  Header: styled.header`
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid black;

    &:hover {
      cursor: grab;
    }
    &:active {
      cursor: grabbing;
    }
  `,
};

export const WindowContainer = ({
  title,
  children,
}: WindowProps): ReactElement => {
  const { width, height } = useWindowDimensions();

  const windowContainerRef = useRef<HTMLDivElement>(null);

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useLayoutEffect(() => {
    setWindowWidth(windowContainerRef.current?.offsetWidth || 0);
    setWindowHeight(windowContainerRef.current?.offsetHeight || 0);
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

  return (
    <Styled.WindowContainer
      drag
      dragConstraints={dragConstraints}
      dragElastic={0}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      {...INITIAL_WINDOW_DIMENSIONS}
      as={m.article}
      ref={windowContainerRef}
    >
      <Styled.Header onPointerDown={startDrag}>{title}</Styled.Header>
      {children}
    </Styled.WindowContainer>
  );
};
