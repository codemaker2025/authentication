import React from "react";
import useSWR from "swr";
import axiosInstance from "../api/axiosInstance";

const fetcher = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export default function EmpCode() {
  const { data: employmentTypes } = useSWR("/api/v1/settings/employment-types", fetcher);
  console.log(employmentTypes, "employmentTypes");

  if (!employmentTypes) return;
  return (
    <div>
      <label htmlFor="">employmentTypes</label>
      <select name="" id="">
        {employmentTypes?.data?.map((ele) => (
          <option key={ele.id} value="">
            {ele.title}
          </option>
        ))}
      </select>
    </div>
  );
}
