import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { PageRoutes } from '../../constants/pageRoutes';

export const usePageRouting = (pageRoute: PageRoutes) => {
  const router = useRouter();

  const routeToPage = useCallback(() => {
    router.push(pageRoute).catch((err) => console.error(err));
  }, [pageRoute, router]);

  return routeToPage;
};
