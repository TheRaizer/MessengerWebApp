import { ReactElement, useLayoutEffect, useRef, useState } from 'react';
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
    background-color: var(--new-primary-color);
  `,
};

let activeWindowZIndex = 0;

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

  const assignActiveWindowZIndex = () => {
    if (
      draggableContainerRef.current?.style.getPropertyValue('z-index') ===
      activeWindowZIndex.toString()
    )
      return;

    activeWindowZIndex++;

    draggableContainerRef.current?.style.setProperty(
      'z-index',
      activeWindowZIndex.toString()
    );
  };

  return (
    <Draggable
      dragConstraints={dragConstraints}
      onMouseDown={assignActiveWindowZIndex}
      ref={draggableContainerRef}
    >
      <Styled.WindowContainer
        {...INITIAL_WINDOW_DIMENSIONS}
        ref={windowContainerRef}
      >
        <WindowHeader title={title} windowId={windowId} />
        {children}
      </Styled.WindowContainer>
    </Draggable>
  );
};
