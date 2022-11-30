import { WindowIdentifier } from '../../../types/redux/states/windows.type';
import { useAppDispatch } from '../../redux/hooks';
import { removeWindow } from '../../redux/slices/windowsSlice';

export const useCloseWindow = (id: WindowIdentifier) => {
  const dispatch = useAppDispatch();

  const closeWindow = () => {
    dispatch(removeWindow(id));
  };

  return closeWindow;
};
