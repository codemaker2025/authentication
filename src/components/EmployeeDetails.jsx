import React from "react";
import { useParams } from "react-router-dom";
import useEmployeeSWR from "../SWRhelpers/useEmployeeSWR";
import EditModal from "./Modal/EditModal";
export default function EmployeeDetails() {
  const { id } = useParams();
  const { employee, isLoading, isError } = useEmployeeSWR(id);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !employee) return <p>Error loading employee details.</p>;

  const {
    name,
    email,
    phone,
    designation,
    department,
    gender_text,
    profile_picture,
    formatted_dob,
    formatted_joining_date,
    address,
    city,
    state,
    zip_code,
    country,
    employee_code,
    employment_type,
    salary,
    bank_account_number,
    ifsc_code,
    emergency_contact,
    created_by,
    updated_by,
    formatted_created_at,
    formatted_updated_at,
  } = employee;

  return (
    <div className="container mt-4">
      <EditModal employee={employee} />
      <h3>Employee Details</h3>
      <div className="card p-3">
        <div className="row">
          <div className="col-md-4">
            <img
              src={profile_picture}
              alt={name}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-8">
            <h5>{name}</h5>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Phone:</strong> {phone}
            </p>
            <p>
              <strong>Designation:</strong> {designation?.title}
            </p>
            <p>
              <strong>Department:</strong> {department?.name}
            </p>
            <p>
              <strong>Gender:</strong> {gender_text}
            </p>
            <p>
              <strong>Date of Birth:</strong> {formatted_dob}
            </p>
            <p>
              <strong>Joining Date:</strong> {formatted_joining_date}
            </p>
            <p>
              <strong>Address:</strong> {address}, {city}, {state} - {zip_code},{" "}
              {country}
            </p>
            <p>
              <strong>Employee Code:</strong> {employee_code}
            </p>
            <p>
              <strong>Employment Type:</strong> {employment_type?.title}
            </p>
            <p>
              <strong>Salary:</strong> ₹{salary}
            </p>
            <p>
              <strong>Bank Account Number:</strong> {bank_account_number}
            </p>
            <p>
              <strong>IFSC Code:</strong> {ifsc_code}
            </p>
            <p>
              <strong>Emergency Contact:</strong> {emergency_contact}
            </p>
            <p>
              <strong>Created By:</strong> {created_by?.name} on{" "}
              {formatted_created_at}
            </p>
            <p>
              <strong>Updated By:</strong> {updated_by?.name} on{" "}
              {formatted_updated_at}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
