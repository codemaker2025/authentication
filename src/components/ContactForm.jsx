import React from "react";
import { Form as Inform } from "informed";
import useFormHandlers from "../hooks/useFormHandlers";
import useContactForm from "../hooks/useContactForm.js";
import { Col, Row } from "react-bootstrap";
import InformInput from "./Informed/InformInput";
import useValidation from "../utils/useValidation";
import NumberInput from "./Informed/NumberInput";
import CustomFileInput from "./Informed/CustomFileInput.jsx";
import { Toaster } from "react-hot-toast";

export default function ContactForm() {
  const { handleFormSubmit, loading } = useContactForm();
  const { validateNameField, validatePhone } = useValidation();

  // const { validateName, validateNumber, validateEmail } = useFormHandlers();
  const commonProps = {
    required: true,
  };

  return (
    <React.Fragment>
      <Toaster />
      <Inform>
        {({ formApi, formState }) => (
          <>
            <h2 className="mb-4">Contact Information</h2>

            <Row className="mb-3">
              <Col md={6}>
                <InformInput
                  placeholder="Enter your first name"
                  name="firstName"
                  label="First Name"
                  validatefield={validateNameField}
                  {...commonProps}
                />
              </Col>
              <Col md={6}>
                <InformInput
                  placeholder="Enter your last name"
                  name="lastName"
                  label="Last Name"
                  validatefield={validateNameField}
                  {...commonProps}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <InformInput
                  placeholder="Enter your email"
                  name="email"
                  label="Email"
                  validatefield={validateNameField}
                  {...commonProps}
                />
              </Col>
            </Row>

            <NumberInput
              placeholder="Enter your phone number"
              name="phoneNumber"
              label="Phone Number"
              validatefield={validatePhone}
              formatter="+91##########"
              {...commonProps}
            />
            <CustomFileInput
              name="file"
              label="Upload File"
              {...commonProps}
              accept=".pdf,.doc,.docx"
            />

            <button onClick={() => handleFormSubmit(formApi, formState)}>
              Submit
            </button>
          </>
        )}
      </Inform>
    </React.Fragment>
  );
}
