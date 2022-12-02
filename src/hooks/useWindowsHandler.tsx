import { memo, ReactElement } from 'react';
import {
  WindowIdentifier,
  WindowStateValues,
} from '../../types/redux/states/windows.type';
import { BASE_WINDOW_Z_INDEX } from '../constants/windows';
import { getWindowComponent } from '../helpers/getWindowComponent';
import { addWindowIndex } from '../helpers/windowIndices';
import { useAppSelector } from '../redux/hooks';
import { selectWindows } from '../redux/slices/windowsSlice';

const WindowComponent = memo(
  ({
    windowStateValue,
    id,
  }: {
    windowStateValue: WindowStateValues;
    id: WindowIdentifier;
  }): ReactElement => {
    return getWindowComponent(
      id,
      windowStateValue.windowType,
      windowStateValue.windowProps
    );
  }
);
WindowComponent.displayName = 'WindowComponent';

const windowRefs: { [key: WindowIdentifier]: HTMLDivElement } = {};

const setZIndex = (zIndex: number, element: HTMLDivElement) => {
  element.style.setProperty('z-index', zIndex.toString());
};

export const useWindowsHandler = () => {
  const windows = useAppSelector(selectWindows);

  const Windows = Object.entries(windows).map(([id, windowStateValue]) => {
    const subscription = (zIndex: number) => {
      setZIndex(zIndex, windowRefs[id]);
    };

    addWindowIndex(id, subscription);

    return (
      <div
        key={id}
        id={id}
        ref={(ref) => {
          if (!ref) return;

          windowRefs[id] = ref;

          if (!ref.style.getPropertyValue('z-index'))
            setZIndex(
              Object.keys(windows).length - 1 + BASE_WINDOW_Z_INDEX,
              ref
            );
        }}
      >
        <WindowComponent windowStateValue={windowStateValue} id={id} />
      </div>
    );
  });
  return Windows;
};

/**
 * Questions:
 *
 * 1. What will be the biggest challenges to go from a solo developer to an industry developer.
 * 2. How interactive is it being a software developer in a big company. (do you often see what you create)
 * 3. whats it like compared to a startup developer?
 * 4. How much can be learnt in school vs on your own vs in industry. What are the limits of each.
 * 5. What do backend developers mainly work on.
 */
