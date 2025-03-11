import React from "react";
import useSWR from "swr";
import axiosInstance from "../api/axiosInstance";

const fetcher = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export default function Department({value, handleChange }) {
  const { data: departments } = useSWR("/api/v1/settings/departments", fetcher);

  if (!departments) return null;

  const handleSelectChange = (e) => {
    const selectedDepartment = departments.data.find(
      (dept) => dept.id == e.target.value
    );
    handleChange({
      target: {
        name: "department_id",
        value: e.target.value,
      },
    });
    handleChange({
      target: {
        name: "department_name",
        value: selectedDepartment.name,
      },
    });
  };

  return (
    <div>
      <label htmlFor="department_id">Departments</label>
      <select value={value} onChange={handleSelectChange} name="department_id">
        <option value="">Select Department</option>
        {departments?.data?.map((ele) => (
          <option key={ele.id} value={ele.id}>
            {ele.name}
          </option>
        ))}
      </select>
    </div>
  );
}
