import { memo, ReactElement } from 'react';
import {
  WindowIdentifier,
  WindowState,
  WindowStateValues,
} from '../../types/redux/states/windows.type';
import { getWindowComponent } from '../helpers/getWindowComponent';
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

const Windows = ({ windows }: { windows: WindowState }) => {
  const Windows = Object.entries(windows).map(([id, windowStateValue]) => (
    <WindowComponent windowStateValue={windowStateValue} id={id} key={id} />
  ));

  return <div>{Windows}</div>;
};

export const useWindowsHandler = () => {
  const windows = useAppSelector(selectWindows);

  return <Windows windows={windows} />;
};
