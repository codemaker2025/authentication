import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axiosInstance from "../../api/axiosInstance";
import InformInput from "../Informed/InformInput";
import Department from "../Department";
import Designation from "../Designation";
import EmpCode from "../EmpCode";
import { Form as Informed, Select, RadioGroup, Radio } from "informed";
import useValidation from "../../utils/useValidation";
import useSWR from "swr";
import NumberInput from "../Informed/NumberInput";

const genderMap = { 1: "male", 2: "female", 3: "other" };
const genderReverseMap = { male: 1, female: 2, other: 3 };

export default function EditModal({ employee }) {
  const [show, setShow] = useState(false);
  const { validateNameField, validatePhone } = useValidation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetcher = async (url) => {
    const response = await axiosInstance.get(url);
    return response.data;
  };

  async function handleSubmit({ values }) {
    console.log(values);
    const formData = new FormData();
    formData.append("id",employee.id)
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("designation_id", values.designation_id);
    formData.append("department_id", values.department_id);
    formData.append("phone", values.phone);
    formData.append("gender", genderReverseMap[values.gender]);
    formData.append("date_of_birth", values.date_of_birth);
    formData.append("address", values.address);
    formData.append("city", values.city);
    formData.append("state", values.state);
    formData.append("zip_code", values.zip_code);
    formData.append("country", values.country);
    formData.append("emergency_contact", values.emergency_contact);
    formData.append("salary", values.salary);
    formData.append("employee_code", values.employee_code);
    formData.append("employment_type_id", values.employment_type_id);
    formData.append("bank_account_number", values.bank_account_number);
    formData.append("ifsc_code", values.ifsc_code);
    formData.append("joining_date", values.joining_date);
    
    
    // formData.append("employment_type_id", values.employment_type_id);

    try {
      await axiosInstance.post("/api/v1/employee/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("Update failed:", error);
    }
    // handleClose()
  }
  const commonProps = {
    required: true,
  };
  const { data: departments } = useSWR("/api/v1/settings/departments", fetcher);
  const { data: designations } = useSWR(
    "/api/v1/settings/designations",
    fetcher
  );
  const { data: employmentTypes } = useSWR(
    "/api/v1/settings/employment-types",
    fetcher
  );

  const departmentOptions =
    departments?.data?.map((dept) => ({ value: dept.id, label: dept.name })) ||
    [];
  const designationOptions =
    designations?.data?.map((desg) => ({
      value: desg.id,
      label: desg.title,
    })) || [];
  const employmentTypesOptions =
    employmentTypes?.data?.map((emp) => ({
      value: emp.id,
      label: emp.title,
    })) || [];

  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Edit {employee.name}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Informed
            onSubmit={(values) => handleSubmit(values)}
            initialValues={{
              ...employee,
              gender: genderMap[employee.gender] || "",
            }}
          >
            <InformInput
              placeholder="Enter your first name"
              name="name"
              label="First Name"
              validatefield={validateNameField}
              {...commonProps}
            />
            <InformInput
              placeholder="Enter your first name"
              name="email"
              label="First Name"
              validatefield={validateNameField}
              {...commonProps}
            />
            <RadioGroup field="gender">
              <label>
                Male <Radio value="male" />
              </label>
              <label>
                Female <Radio value="female" />
              </label>
              <label>
                Other <Radio value="other" />
              </label>
            </RadioGroup>
            <label className="form-label">Department</label>
            <Select
              field={"department_id"}
              options={departmentOptions}
              className="form-select"
            />
            <Select
              field={"designation_id"}
              options={designationOptions}
              className="form-select"
            />
            <Select
              field={"employment_type_id"}
              options={employmentTypesOptions}
              className="form-select"
            />
            <NumberInput
              placeholder="Enter your phone number"
              name="phone"
              label="Phone Number"
              validatefield={validatePhone}
              formatter="+91##########"
              {...commonProps}
            />
            <NumberInput
              placeholder="Enter your emergency  contact"
              name="emergency_contact"
              label="Phone Number"
              validatefield={validatePhone}
              formatter="+91##########"
              {...commonProps}
            />
            <NumberInput
              placeholder="Enter your salary"
              name="salary"
              label="Phone Number"
              {...commonProps}
            />
            <InformInput
              type="date"
              name="date_of_birth"
              label="Date of birth"
              validatefield={validateNameField}
              {...commonProps}
            />
            <InformInput
              placeholder="Enter your address"
              name="address"
              label="Address"
              validatefield={validateNameField}
              {...commonProps}
            />
            <InformInput
              placeholder="Enter your city"
              name="city"
              label="City"
              validatefield={validateNameField}
              {...commonProps}
            />
            <InformInput
              placeholder="Enter your state"
              name="state"
              label="state"
              validatefield={validateNameField}
              {...commonProps}
            />
            <InformInput
              placeholder="Enter your joining date"
              name="joining_date"
              type="date"
              label="Date"
              validatefield={validateNameField}
              {...commonProps}
            />
            <NumberInput
              placeholder="Enter your zipcode"
              name="zip_code"
              label="Phone Number"
              {...commonProps}
            />
            <NumberInput
              placeholder="Enter country name"
              name="country"
              label="Country"
              {...commonProps}
            />
            <InformInput
              placeholder="Enter your employee code"
              name="employee_code"
              label="Employee Code"
              validatefield={validateNameField}
              {...commonProps}
            />
             <InformInput
              placeholder="Enter your bank account number"
              name="bank_account_number"
              label="Bank Account Number"
              validatefield={validateNameField}
              {...commonProps}
            />
            <InformInput
              placeholder="Enter your bank account number"
              name="ifsc_code"
              label="IFSC CODE"
              validatefield={validateNameField}
              {...commonProps}
            />
            <button type="submit">submit</button>
          </Informed>
        </Modal.Body>
      </Modal>
    </div>
  );
}
