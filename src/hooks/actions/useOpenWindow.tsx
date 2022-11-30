import {
  WindowProps,
  WindowStateValue,
} from '../../../types/redux/states/windows.type';
import { useAppDispatch } from '../../redux/hooks';
import { setWindows } from '../../redux/slices/windowsSlice';
import { v4 as uuidv4 } from 'uuid';

/**
 * Opens a window by dispatching a new WindowStateValue to the windows redux state.
 * By using this function we satisfy the precondition that the window type and the window props
 * match with the use of generic K.
 *
 * The precondition is satisfied by the type restrictions placed on the following parameters:
 *
 * @param windowType the type of window to open
 * @param props the props of the window to open
 */
export const useOpenWindow = <K extends keyof WindowProps>(
  windowType: K,
  props: WindowProps[K]
) => {
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
