import { useState, useMemo } from 'react';

export function usePagination<T>(data: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);
  
  const next = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  
  const prev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  const jump = (page: number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(Math.min(pageNumber, totalPages));
  };
  
  return {
    next,
    prev,
    jump,
    currentData,
    currentPage,
    totalPages,
    itemsPerPage,
  };
}
