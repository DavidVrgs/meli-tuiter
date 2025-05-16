import { useCallback, useMemo, useState } from "react";

export const usePagination = <TData>(
  { initialPage = 1, rowsPerPage = 20 },
  data?: TData[]
) => {
  const [page, setPage] = useState<number>(initialPage);

  const handlePage = useCallback(
    (_: unknown, newPage: number): void => setPage(newPage),
    []
  );

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data?.slice(start, end);
  }, [data, page, rowsPerPage]);

  return {
    page,
    rowsPerPage,
    paginatedData,
    handlePage,
  };
};
