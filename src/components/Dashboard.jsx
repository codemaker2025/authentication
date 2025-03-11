import { Form, FormStateAccessor } from "informed";
import React from "react";
import InformInput from "./Informed/InformInput";
import NumberInput from "./Informed/NumberInput";
import useValidation from "../utils/useValidation";

export default function Dashboard() {
  const { validateNameField, validatePhone } = useValidation();

  const handleSubmit = async (formState, formApi) => {
    const { values } = formState;
    if (
      !values.email ||
      !values.firstName ||
      !values.lastName ||
      !values.phoneNumber
    ) {
      return;
    }

    console.log("form has been submitted successfully");
    formApi.reset({});
  };

  const commonProps = {
    required: true,
  };

  return (
    <Form>
      {({ formState, formApi }) => (
        <div>
          {/* <pre>{JSON.stringify(formState.values, null, 2)}</pre> */}

          <InformInput
            placeholder="Enter your first name"
            name="firstName"
            label="First Name"
            validatefield={validateNameField}
            {...commonProps}
          />
          <InformInput
            placeholder="Enter your last name"
            name="lastName"
            label="Last Name"
            validatefield={validateNameField}
            {...commonProps}
          />
          <InformInput
            placeholder="Enter your email"
            name="email"
            label="Email"
            validatefield={validateNameField}
            {...commonProps}
          />
          <NumberInput
            placeholder="Enter your phone number"
            name="phoneNumber"
            label="Phone Number"
            validatefield={validatePhone}
            formatter="+91##########"
            {...commonProps}
          />

          <button onClick={() => handleSubmit(formState, formApi)}>
            Submit
          </button>
        </div>
      )}
    </Form>
  );
}
