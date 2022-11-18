import { getWindowComponent } from '../helpers/getWindowComponent';
import { useAppSelector } from '../redux/hooks';
import { selectWindows } from '../redux/slices/windowsSlice';

export const useWindowsHandler = () => {
  const windows = useAppSelector(selectWindows);

  const Windows = windows.map((windowStateValue) => (
    <div key={windowStateValue.id}>
      {getWindowComponent(
        windowStateValue.id,
        windowStateValue.windowType,
        windowStateValue.windowProps
      )}
    </div>
  ));

  return Windows;
};
