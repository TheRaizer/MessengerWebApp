import { noScroll } from '../constants/classNames';

/**
 * Disables scrolling on the web page.
 */
export const addNoScroll = (): void => {
  document.body.classList.add(noScroll);
};

/**
 * Enables scrolling on the web page.
 */
export const removeNoScroll = (): void => {
  document.body.classList.remove(noScroll);
};
