import { useCallback, useEffect, useState } from "react";

export type PaginationType = {
  activePage: number;
  itemsPerPage: number;
  totalPages: number;
  handleSetPage: (page: number) => void;
  handleSetItemsPerPage: (perPage: number) => void;
};

type PaginationProps = {
  totalItems: number;
    onPageChange: (page: number) => void;
};

export const usePagination = ({
  totalItems,
  onPageChange,
}: PaginationProps) => {
  const [activePage, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);

  const handleSetPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setPage(page);
        onPageChange(page);
      }
    },
    [activePage, totalPages]
  );

  const handleSetItemsPerPage = useCallback((perPage: number) => {
    setItemsPerPage(perPage);
    setPage(1);
  }, []);

  useEffect(() => {
    const pages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(pages);
  }, [totalItems, itemsPerPage]);

  return {
    activePage,
    itemsPerPage,
    totalPages,
    handleSetPage,
    handleSetItemsPerPage,
  };
};
