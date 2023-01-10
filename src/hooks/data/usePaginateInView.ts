import { useEffect } from 'react';
import { nextCursorSWRGetKey } from '../../helpers/pagination';
import { useInView } from 'react-intersection-observer';
import useSWRInfinite from 'swr/infinite';

export const usePaginateInView = <T>(
  swrKeyUrl: string,
  fetcher: (url: string) => Promise<T>,
  hasMoreData: (data: T[] | undefined) => boolean
) => {
  const getKey = nextCursorSWRGetKey(swrKeyUrl, 1);
  const [ref, inView] = useInView();

  // we do not revalidate this data
  const { data, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (inView && hasMoreData(data) && !isValidating) {
      setSize(size + 1).catch((err) => console.error(err));
    }
  }, [setSize, inView, hasMoreData, isValidating, size, data]);

  return { data, ref };
};
