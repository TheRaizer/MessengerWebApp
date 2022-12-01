import { NO_SCROLL } from '../constants/classNames';

/**
 * Disables scrolling on the web page.
 */
export const addNoScroll = (): void => {
  document.body.classList.add(NO_SCROLL);
};

/**
 * Enables scrolling on the web page.
 */
export const removeNoScroll = (): void => {
  document.body.classList.remove(NO_SCROLL);
};
