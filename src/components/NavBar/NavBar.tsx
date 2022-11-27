import dynamic from 'next/dynamic';
import { ReactElement, useEffect, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import styled from 'styled-components';
import { NAV_BAR_HEIGHT } from '../../constants/dimensions';
import {
  getFormattedLocalDateString,
  getFormattedLocalTimeString,
} from '../../helpers/datetime';
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/slices/userSlice';
import { SignOutButton } from './SignOutButton';

const Styled = {
  NavBarContainer: styled.nav`
    height: ${NAV_BAR_HEIGHT}px;
    border-bottom: 1px solid black;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    justify-content: space-between;
  `,
  TimeContainer: styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
  `,
  DateContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
};

const SunIcon = dynamic<IconBaseProps>(() =>
  import('react-icons/bs').then((mod) => mod.BsSun)
);

export const NavBar = (): ReactElement => {
  const [dateString, setDateString] = useState(getFormattedLocalDateString());
  const [timeString, setTimeString] = useState(getFormattedLocalTimeString());

  const userState = useAppSelector(selectUser);

  useEffect(() => {
    const datetimeUpdateInterval = setInterval(() => {
      setDateString(getFormattedLocalDateString());
      setTimeString(getFormattedLocalTimeString());
    }, 5000);

    () => {
      return clearInterval(datetimeUpdateInterval);
    };
  }, []);

  return (
    <Styled.NavBarContainer>
      <p>R-OS</p>
      <Styled.TimeContainer>
        <Styled.DateContainer>
          <SunIcon />
          <p>{dateString}</p>
        </Styled.DateContainer>
        <p>{timeString}</p>
        {userState.user ? <SignOutButton /> : null}
      </Styled.TimeContainer>
    </Styled.NavBarContainer>
  );
};
