import { useRouter } from 'next/router';
import { PageRoutes } from '../../constants/pageRoutes';

export const usePageRouting = (pageRoute: PageRoutes) => {
  const router = useRouter();

  const routeToPage = () => {
    router.push(pageRoute).catch((err) => console.error(err));
  };

  return routeToPage;
};
