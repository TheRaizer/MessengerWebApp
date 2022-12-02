import { WindowIdentifier } from '../../types/redux/states/windows.type';
import { BASE_WINDOW_Z_INDEX, MAX_OPEN_WINDOWS } from '../constants/windows';

type Subscription = (zIndex: number) => void;
type WindowProps = {
  id: WindowIdentifier;
  subscription: Subscription;
};

const windowIndices: WindowProps[] = [];

export const addWindowIndex = (
  id: WindowIdentifier,
  subscription: Subscription
) => {
  if (
    windowIndices.length === MAX_OPEN_WINDOWS ||
    windowIndices.findIndex((window) => window.id == id) !== -1
  ) {
    return;
  }

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

export const changeActiveIndex = (id: WindowIdentifier): number => {
  const windowIdx = windowIndices.findIndex((window) => window.id === id);

  if (windowIdx === windowIndices.length - 1) {
    publish();
    return windowIdx;
  }

  const nextActiveWindow = windowIndices[windowIdx];

  windowIndices.splice(windowIdx, 1);
  windowIndices.push(nextActiveWindow);

  publish();

  return windowIndices.length - 1;
};
