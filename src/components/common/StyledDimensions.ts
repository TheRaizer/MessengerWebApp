import styled, { css } from 'styled-components';
import { Dimensions } from '../../../types/dimensions.type';

export const DimensionStyles = css<Dimensions>`
  width: ${({ width }) => width || 'unset'};
  min-width: ${({ width }) => width || 'unset'};

  height: ${({ height }) => height || 'unset'};
  min-height: ${({ height }) => height || 'unset'};
`;

export const StyledDimensions = styled.div<Dimensions>`
  ${DimensionStyles}
`;
