import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import { IconBaseProps } from 'react-icons';
import styled from 'styled-components';
import { WindowHeaderProps } from '../../../types/components/Windows/Window.type';
import { Dimensions } from '../../../types/dimensions.type';
import { Col } from '../common/Col';

const Styled = {
  HeaderContainer: styled.header`
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid black;
  `,
  HeaderLine: styled.div`
    border-top: 1px solid black;
    height: 0px;
    width: 100%;
    padding: 0px 10px;
  `,
  HeaderLineContainer: styled(Col)<Dimensions<string>>`
    padding: 0 10px;
    justify-content: center;
    width: ${({ width }) => width};
  `,
  IconsContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    padding-right: 5px;
    width: 43px;
  `,
  IdentifierContainer: styled.div`
    width: inherit;
    display: flex;
    justify-content: center;

    &:hover {
      cursor: grab;
    }
    &:active {
      cursor: grabbing;
    }
  `,
};

const HeaderLines = ({
  dimensions,
}: {
  dimensions: Dimensions<string>;
}): ReactElement => {
  return (
    <Styled.HeaderLineContainer gap={2} {...dimensions}>
      <Styled.HeaderLine />
      <Styled.HeaderLine />
      <Styled.HeaderLine />
      <Styled.HeaderLine />
    </Styled.HeaderLineContainer>
  );
};

const Close = dynamic<IconBaseProps>(() =>
  import('react-icons/ai').then((mod) => mod.AiOutlineCloseSquare)
);

const Expand = dynamic<IconBaseProps>(() =>
  import('react-icons/bi').then((mod) => mod.BiExpand)
);

export const WindowHeader = ({
  title,
  onPointerDown,
}: WindowHeaderProps): ReactElement => {
  return (
    <Styled.HeaderContainer>
      <Styled.IdentifierContainer onPointerDown={onPointerDown}>
        <HeaderLines dimensions={{ width: '100%' }} />
        {title}
        <HeaderLines dimensions={{ width: '82%' }} />
      </Styled.IdentifierContainer>
      <Styled.IconsContainer>
        <Expand size={17} />
        <Close size={20} />
      </Styled.IconsContainer>
    </Styled.HeaderContainer>
  );
};
