import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import { IconBaseProps } from 'react-icons';
import styled from 'styled-components';
import { WindowHeaderProps } from '../../../types/components/Windows/Window.type';
import { Dimensions } from '../../../types/dimensions.type';
import { useCloseWindow } from '../../hooks/actions/useCloseWindow';
import { Col } from '../common/Col';
import { DimensionStyles } from '../common/StyledDimensions';

const Styled = {
  HeaderContainer: styled.header`
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid black;
    touch-action: none;
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
    gap: 2px;
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
  IconButton: styled.button<Dimensions<string>>`
    ${DimensionStyles}
    display: flex;
    align-items: center;
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
  windowId,
  dragBind,
}: WindowHeaderProps): ReactElement => {
  const closeWindow = useCloseWindow(windowId);

  return (
    <Styled.HeaderContainer {...dragBind()}>
      <Styled.IdentifierContainer>
        <HeaderLines dimensions={{ width: '100%' }} />
        {title}
        <HeaderLines dimensions={{ width: '82%' }} />
      </Styled.IdentifierContainer>
      <Styled.IconsContainer>
        <Styled.IconButton width="20px" height="20px">
          <Expand size={17} />
        </Styled.IconButton>
        <Styled.IconButton width="20px" height="20px" onClick={closeWindow}>
          <Close size={20} />
        </Styled.IconButton>
      </Styled.IconsContainer>
    </Styled.HeaderContainer>
  );
};
