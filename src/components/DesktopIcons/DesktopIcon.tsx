import { ComponentType, ReactElement, useRef, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import styled from 'styled-components';
import { useOutsideClickDetection } from '../../hooks/actions/useOutsideClickDetection';

const Styled = {
  DesktopIconContainer: styled.div<{ outline: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--primary-color);

    outline: ${({ outline }) => outline && 'black 1px solid'};
    filter: ${({ outline }) => outline && 'brightness(0.8)'};

    &:hover {
      filter: brightness(0.8);
    }
  `,
};

export const DesktopIcon = ({
  Icon,
  name,
  onDoubleClick,
}: {
  Icon: ComponentType<IconBaseProps>;
  name: string;
  onDoubleClick: () => void;
}): ReactElement => {
  const iconContainerRef = useRef(null);
  const [outline, setOutline] = useState(false);
  useOutsideClickDetection(iconContainerRef, () => setOutline(false));

  return (
    <button
      onDoubleClick={() => {
        onDoubleClick();
        setOutline(false);
      }}
      onClick={() => setOutline(true)}
    >
      <Styled.DesktopIconContainer outline={outline} ref={iconContainerRef}>
        <Icon size="3em" />
        <p>{name}</p>
      </Styled.DesktopIconContainer>
    </button>
  );
};
