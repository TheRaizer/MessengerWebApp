import { ReactElement } from 'react';
import styled from 'styled-components';
import { useWindowsHandler } from '../../hooks/useWindowsHandler';

const Styled = {
  WindowsContainer: styled.div`
    width: 100%;
    height: 100%;
  `,
};

export const Windows = (): ReactElement => {
  const WindowsComponent = useWindowsHandler();

  return <Styled.WindowsContainer>{WindowsComponent}</Styled.WindowsContainer>;
};
