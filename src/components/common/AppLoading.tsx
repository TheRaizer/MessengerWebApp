import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import {
  appLoadingBGBlurIndex,
  loadingSpinnerIndex,
} from '../../constants/zIndices';
import { addNoScroll, removeNoScroll } from '../../helpers/manageNoScroll';
import { useAppSelector } from '../../redux/hooks';
import { selectAppLoading } from '../../redux/slices/appLoadingSlice';
import { BackgroundBlur } from './BackgroundBlur';
import { Spinner } from './Spinner';

const Styled = {
  AppLoadingContainer: styled.div`
    position: fixed;
    z-index: ${loadingSpinnerIndex};
  `,
  AppSpinner: styled(Spinner)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};

export const AppLoading = (): ReactElement | null => {
  const appLoading = useAppSelector(selectAppLoading);

  useEffect(() => {
    if (appLoading) {
      addNoScroll();
    } else {
      removeNoScroll();
    }
  }, [appLoading]);

  if (!appLoading) return null;

  return (
    <>
      <BackgroundBlur zIndex={appLoadingBGBlurIndex} />
      <Styled.AppLoadingContainer>
        <Styled.AppSpinner size={40} />
      </Styled.AppLoadingContainer>
    </>
  );
};
