import { Dimensions } from '../../types/dimensions.type';

export const NAV_BAR_HEIGHT = 26;

export const MINIMUM_WINDOW_WIDTH = 600;
export const MINIMUM_WINDOW_HEIGHT = 450;

export const INITIAL_WINDOW_DIMENSIONS: Dimensions<string> = {
  width: `min(${MINIMUM_WINDOW_WIDTH}px, 100vw)`,
  height: `min(${MINIMUM_WINDOW_HEIGHT}px, var(--page-height))`,
};
