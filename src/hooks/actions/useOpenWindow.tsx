import {
  WindowProps,
  WindowStateValue,
  WindowType,
} from '../../../types/redux/states/windows.type';
import { useAppDispatch } from '../../redux/hooks';
import { setWindows } from '../../redux/slices/windowsSlice';
import { v4 as uuidv4 } from 'uuid';

export const useOpenWindow = (windowType: WindowType, props?: WindowProps) => {
  const dispatch = useAppDispatch();

  const openWindow = () => {
    const newWindow: WindowStateValue = {
      windowType: windowType,
      windowProps: props,
      id: uuidv4(),
    };

    dispatch(setWindows(newWindow));
  };

  return openWindow;
};
