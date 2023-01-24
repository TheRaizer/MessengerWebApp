import { useEffect } from 'react';
import { nextCursorSWRGetKey } from '../../helpers/pagination';
import { useInView } from 'react-intersection-observer';
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite';

export const usePaginateInView = <T>(
  swrKeyUrl: string,
  fetcher: (url: string) => Promise<T>,
  hasMoreData: (data: T[] | undefined) => boolean,
  limit: number,
  swrConfig?: SWRInfiniteConfiguration<T>
) => {
  const getKey = nextCursorSWRGetKey(swrKeyUrl, limit);
  const [ref, inView] = useInView();

  const { data, size, setSize, isValidating, mutate } = useSWRInfinite(
    getKey,
    fetcher,
    swrConfig
  );

  useEffect(() => {
    if (inView && hasMoreData(data) && !isValidating) {
      setSize(size + 1).catch((err) => console.error(err));
    }
  }, [setSize, inView, hasMoreData, isValidating, size, data]);

  return { data, ref, mutate };
};
