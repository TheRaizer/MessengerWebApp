import { memo, ReactElement } from 'react';
import { WindowStateValue } from '../../types/redux/states/windows.type';
import { getWindowComponent } from '../helpers/getWindowComponent';
import { useAppSelector } from '../redux/hooks';
import { selectWindows } from '../redux/slices/windowsSlice';

const WindowComponent = ({
  windowStateValue,
}: {
  windowStateValue: WindowStateValue;
}): ReactElement => {
  return getWindowComponent(
    windowStateValue.id,
    windowStateValue.windowType,
    windowStateValue.windowProps
  );
};

// memoize so this element will not rerender everytime the mapped list is updated in the useWindowsHandlerHook
// it will only rerender when its props are changed
const MemoizedWindowComponent = memo(WindowComponent);

export const useWindowsHandler = () => {
  const windows = useAppSelector(selectWindows);

  const Windows = windows.map((windowStateValue) => (
    <MemoizedWindowComponent
      windowStateValue={windowStateValue}
      key={windowStateValue.id}
    />
  ));

  return Windows;
};
