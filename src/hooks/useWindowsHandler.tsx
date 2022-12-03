import { memo, ReactElement } from 'react';
import {
  WindowIdentifier,
  WindowStateValues,
} from '../../types/redux/states/windows.type';
import { BASE_WINDOW_Z_INDEX } from '../constants/windows';
import { getWindowComponent } from '../helpers/getWindowComponent';
import { addWindowIndex } from '../helpers/windowIndexManager';
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

// The window elements generated by the useWindowsHandler hook.
const windowRefs: { [key: WindowIdentifier]: HTMLDivElement } = {};

export const useWindowsHandler = () => {
  const windows = useAppSelector(selectWindows);

  const Windows = Object.entries(windows).map(([id, windowStateValue]) => {
    addWindowIndex(id, () => windowRefs[id]);

    return (
      <div
        key={id}
        id={id}
        ref={(ref) => {
          if (!ref) return;

          windowRefs[id] = ref;

          // if no z-index is present, assign it to be the new highest indexed window.
          // this ensures that any newly added window is rendered on top of all previous windows.
          if (!ref.style.getPropertyValue('z-index'))
            ref.style.setProperty(
              'z-index',
              (Object.keys(windows).length - 1 + BASE_WINDOW_Z_INDEX).toString()
            );
        }}
      >
        <WindowComponent windowStateValue={windowStateValue} id={id} />
      </div>
    );
  });
  return Windows;
};
