import styled from 'styled-components';
import { ViewportStates } from '../../../types/redux/states/appConfig.type';
import { StyledDimensions } from '../common/StyledDimensions';

// when in mobile, stretch any modal to the screen size
export const ModalBody = styled(StyledDimensions)`
  width: ${({ theme, width }) =>
    theme.viewportState === ViewportStates.MOBILE ? '100%' : width || 'unset'};
  height: ${({ theme, height }) =>
    theme.viewportState === ViewportStates.MOBILE ? '100%' : height || 'unset'};
`;
