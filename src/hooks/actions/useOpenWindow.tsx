import {
  WindowProps,
  WindowStateValue,
  WindowType,
} from '../../../types/redux/states/windows.type';
import { useAppDispatch } from '../../redux/hooks';
import { setWindows } from '../../redux/slices/windowsSlice';
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
  }, [dispatch, props, windowType]);

  return openWindow;
};
