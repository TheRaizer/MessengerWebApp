import dynamic from 'next/dynamic';
import { ComponentType, ReactElement } from 'react';
import { WindowProps, WindowType } from '../../types/redux/states/windows.type';

export const getWindowComponent = (
  id: string | number,
  windowType: WindowType,
  windowProps?: WindowProps
): ReactElement => {
  let Component: ComponentType<any>;

  switch (windowType) {
    case WindowType.MESSAGE:
      Component = dynamic(() =>
        import('../components/Windows/MessageWindow').then(
          (mod) => mod.MessageWindow
        )
      );
      break;
    case WindowType.FRIEND:
      Component = dynamic(() =>
        import('../components/Windows/FriendWindow/FriendWindow').then(
          (mod) => mod.FriendWindow
        )
      );
      break;
    default:
      throw new Error('No such window of type ' + windowType);
  }

  // here we pass the id of the window
  return <Component {...windowProps?.[windowType]} id={id} />;
};
