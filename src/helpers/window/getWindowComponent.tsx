import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import {
  WindowProps,
  WindowType,
} from '../../../types/redux/states/windows.type';
import { WithRequired } from '../../../types/Required.type';

/**
 * Produces a window component with the given type and props.
 *
 * As a precondition, we expect that the type of windowProps is WindowProps[indexed with the
 * value of windowType].
 *
 * @param id the id used to uniquely identify the window component
 * @param windowType the type of window to create
 * @param windowProps the props to pass to the window
 */
export const getWindowComponent = <K extends WindowType>(
  id: string | number,
  windowType: K,
  windowProps: WindowProps[K]
): ReactElement => {
  let Component = null;

  switch (windowType) {
    case WindowType.MESSAGE:
      Component = dynamic<WithRequired<WindowProps[WindowType.MESSAGE], 'id'>>(
        () =>
          import('../../components/Windows/MessageWindow/MessageWindow').then(
            (mod) => mod.MessageWindow
          )
      );

      return (
        <Component
          {...(windowProps as WindowProps[WindowType.MESSAGE])}
          id={id}
        />
      );
    case WindowType.FRIEND:
      Component = dynamic<WithRequired<WindowProps[WindowType.FRIEND], 'id'>>(
        () =>
          import('../../components/Windows/FriendWindow/FriendWindow').then(
            (mod) => mod.FriendWindow
          )
      );

      return (
        <Component
          {...(windowProps as WindowProps[WindowType.FRIEND])}
          id={id}
        />
      );
    default:
      throw new Error('No such window of type ' + (windowType as string));
  }
};
