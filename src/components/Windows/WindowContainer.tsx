import { ReactElement, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { WindowProps } from '../../../types/components/Windows/Window.type';
import { Dimensions } from '../../../types/dimensions.type';
import { INITIAL_WINDOW_DIMENSIONS } from '../../constants/dimensions';
import { CenteredCol } from '../common/Col';
import { DimensionStyles } from '../common/StyledDimensions';
import { WindowHeader } from './WindowHeader';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { animated } from 'react-spring';
import { useDragWindowConstrained } from '../../hooks/useDragWindowConstrained';
import { changeActiveIndex } from '../../helpers/windowIndices';

const Styled = {
  WindowContainer: styled(CenteredCol)<Dimensions<string>>`
    ${DimensionStyles}
    border: 1px solid black;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.75);
    background-color: var(--new-primary-color);
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

  const { bind, position } = useDragWindowConstrained(dragConstraints);

  const assignActiveWindowZIndex = () => {
    changeActiveIndex(windowId);
  };

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
