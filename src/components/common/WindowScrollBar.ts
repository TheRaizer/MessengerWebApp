import { css } from 'styled-components';

export const WindowScrollBar = css`
  /* width */
  &::-webkit-scrollbar {
    width: 23px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: var(--primary-color-2);
    border-left: 1px solid black;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-left: 1px solid black;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    background: var(--primary-color);
  }
`;
