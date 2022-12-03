import { WindowIdentifier } from '../../redux/states/windows.type';

export type Subscription = (zIndex: number) => void;

export type WindowIndexProps = {
  id: WindowIdentifier;
  subscription: Subscription;
};
