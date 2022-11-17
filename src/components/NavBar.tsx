import dynamic from 'next/dynamic';
import { ReactElement, useState } from 'react';
import { IconBaseProps, IconType } from 'react-icons';
import styled from 'styled-components';
import { NAV_BAR_HEIGHT } from '../constants/dimensions';

const Styled = {
  NavBarContainer: styled.nav`
    height: ${NAV_BAR_HEIGHT};
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
};

const SunIcon = dynamic<IconBaseProps>(() =>
  import('react-icons/bs').then((mod) => mod.BsSun)
);

export const NavBar = (): ReactElement => {
  // TODO: get current timezone from user computer
  const [dateString, setDateString] = useState(
    new Date().toLocaleString('en-US', {
      month: 'short',
      weekday: 'short',
      day: 'numeric',
    })
  );

  const [timeString, setTimeString] = useState(
    new Date().toLocaleTimeString('en-US', { timeStyle: 'short' })
  );
  return (
    <Styled.NavBarContainer>
      <p>R-OS</p>
      <Styled.TimeContainer>
        <SunIcon />
        <p>{dateString}</p>
        <p>{timeString}</p>
      </Styled.TimeContainer>
    </Styled.NavBarContainer>
  );
};
