import styled from 'styled-components';

export const BackgroundBlur = styled.div<{ zIndex: number }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 1000vw;
  height: 1000vh;
  background-color: rgba(0, 0, 0, 0.493);
  backdrop-filter: blur(10px);
  z-index: ${({ zIndex }) => zIndex};
`;
