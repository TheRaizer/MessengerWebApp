import { ReactElement } from 'react';
import styled from 'styled-components';
import { Spinner } from '../../../../../../Loading/Spinner';
import React from 'react';

const Styled = {
  SpinnerContainer: styled.div`
    padding-top: 5%;
  `,
};
export const FriendLoadingSpinner = React.forwardRef<HTMLDivElement>(
  (_props, ref): ReactElement => {
    return (
      <Styled.SpinnerContainer ref={ref}>
        <Spinner color="black" size={1.1} />
      </Styled.SpinnerContainer>
    );
  }
);

FriendLoadingSpinner.displayName = 'FriendLoadingSpinner';
