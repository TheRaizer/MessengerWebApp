import useMobileTheme from './useMobileTheme';
import { useAuth } from './useAuth';

export const useAppLifecycle = () => {
  useAuth();
  useMobileTheme();
};
