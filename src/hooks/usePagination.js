import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import axiosInstance from "../api/axiosInstance";
import useSWRImmutable from "swr/immutable";

const fetcher = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

const usePagination = (url, pageSize) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(parseInt(searchParams.get("page")) || 1, 1);

  const { data: apiData, error, isLoading } = useSWRImmutable(
    `${url}?length=${pageSize}&page=${page}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  const totalRecords = apiData?.data?.rows?.total || 50;
  const totalPages = Math.ceil(totalRecords / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage.toString() });
    }
  };

  return {
    apiData,
    error,
    isLoading,
    page,
    totalPages,
    handlePageChange,
  };
};

export default usePagination;