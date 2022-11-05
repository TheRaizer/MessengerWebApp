import styled from 'styled-components';

export const Col = styled.div<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap}px;
`;

export const CenteredCol = styled(Col)`
  align-items: center;
`;
