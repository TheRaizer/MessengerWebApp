import {
  WindowProps,
  WindowStateValue,
  WindowType,
} from '../../../types/redux/states/windows.type';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectWindows, setWindows } from '../../redux/slices/windowsSlice';
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';

export const useOpenWindow = (windowType: WindowType, props?: WindowProps) => {
  const dispatch = useAppDispatch();

  const openWindow = useCallback(() => {
    const newWindow: WindowStateValue = {
      windowType: windowType,
      windowProps: props,
      id: uuidv4(),
    };

    dispatch(setWindows(newWindow));
  }, []);

  return openWindow;
};
