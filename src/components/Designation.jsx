
import React from "react";
import useSWR from "swr";
import axiosInstance from "../api/axiosInstance";

const fetcher = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export default function Designation() {
  const { data: designations } = useSWR("/api/v1/settings/designations", fetcher);
  console.log(designations, "designations");

  if (!designations) return;
  return (
    <div>
      <label htmlFor="">designations</label>
      <select name="" id="">
        {designations?.data?.map((ele) => (
          <option key={ele.id} value="">
            {ele.title}
          </option>
        ))}
      </select>
    </div>
  );
}
