import { useCallback, useRef } from 'react';
import { RequiredDimensions } from '../../../types/dimensions.type';
import { ViewportStates } from '../../../types/redux/states/appConfig.type';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectAppConfig,
  setViewportState,
} from '../../redux/slices/appConfigSlice';
import { useWindowDimensions } from '../useWindowDimensions';

const useMobileTheme = () => {
  const { viewportState } = useAppSelector(selectAppConfig);
  const dispatch = useAppDispatch();
  const viewportStateRef = useRef(viewportState);

  const handleResize = useCallback(
    () =>
      ({ width }: RequiredDimensions<number>) => {
        const changeViewportState = (newViewportState: ViewportStates) => {
          if (viewportStateRef.current !== newViewportState) {
            dispatch(setViewportState(newViewportState));
            viewportStateRef.current = newViewportState;
          }
        };
        if (width > 900) {
          changeViewportState(ViewportStates.DESKTOP);
        } else if (width <= 900 && width >= 650) {
          changeViewportState(ViewportStates.TABLET);
        } else {
          changeViewportState(ViewportStates.MOBILE);
        }
      },
    [dispatch]
  );

  useWindowDimensions(handleResize);
};

export default useMobileTheme;
