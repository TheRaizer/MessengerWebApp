import {
  Subscription,
  WindowIndexProps,
} from '../../../types/helpers/window/windowIndexManager.type';
import { WindowIdentifier } from '../../../types/redux/states/windows.type';
import { BASE_WINDOW_Z_INDEX, MAX_OPEN_WINDOWS } from '../../constants/windows';

/**
 * This file contains the functions required to manipulate the zIndices of windows without requiring rerenders.
 * This is done by using subscribers that will set the style of the window their related too. This will change their z-index
 * without triggering a rerender.
 *
 * The reason for this, is a rerender can be both expensive when it occurs on a window,
 * and it causes a flicker every time a click on the window occurs.
 */

/**
 * The array of window indices. The index of a window in this array plus the base window index corrosponds to their z-index.
 */
const windowIndices: WindowIndexProps[] = [];

/**
 * This will add a new window index to manage.
 * @param id the id of the window whose z-index will be managed
 * @param subscription the callback function triggered when a new active window is selected.
 */
export const addWindowIndex = (
  id: WindowIdentifier,
  getElement: () => HTMLElement
) => {
  if (
    windowIndices.length === MAX_OPEN_WINDOWS ||
    windowIndices.findIndex((window) => window.id == id) !== -1
  ) {
    return;
  }

  /**
   * A subscription function that is published whenever the new active window changes.
   * @param zIndex the new z-index to assign to the window.
   */
  const subscription: Subscription = (zIndex: number) => {
    getElement().style.setProperty('z-index', zIndex.toString());
  };

  windowIndices.push({ id, subscription });
};

export const removeWindowIndex = (id: WindowIdentifier) => {
  const idxToRemove = windowIndices.findIndex((window) => window.id === id);

  windowIndices.splice(idxToRemove, 1);
};

const publish = () => {
  windowIndices.forEach(({ subscription }, idx) => {
    subscription(idx + BASE_WINDOW_Z_INDEX);
  });
};

/**
 * A given window will become active. Moving its z-index above all other windows.
 *
 * This is done by taking that windows position in the windowIndices array, and moving it
 * to the end of the array.
 *
 * We then publish all subscriptions with the new window indices.
 *
 * @param id the index of the window that will become active
 * @returns the new z-index of the active array
 */
export const changeActiveIndex = (id: WindowIdentifier): number => {
  const windowIdx = windowIndices.findIndex((window) => window.id === id);

  if (windowIdx === windowIndices.length - 1) return windowIdx;

  const nextActiveWindow = windowIndices[windowIdx];

  windowIndices.splice(windowIdx, 1);
  windowIndices.push(nextActiveWindow);

  publish();

  return windowIndices.length - 1;
};
