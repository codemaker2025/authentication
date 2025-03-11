import React, { Fragment } from "react";
import InformInput from "./Informed/InformInput";
import { Form as Inform } from "informed";
import { useIntl } from "react-intl";

export default function Language() {
  const { formatMessage } = useIntl();

  const commonProps = {
    required: true,
  };

  const validateNameField = (value, { required, label }) => {
    if (required && !value) {
      return formatMessage({ id: "firstNameRequired" });
    }
    if (value?.toLowerCase() === "john") {
      return formatMessage({ id: "firstNameCannotBeJohn" });
    }
    return undefined;
  };

  return (
    <Fragment>
      <Inform>
        <InformInput
          placeholder={formatMessage({ id: "enterFirstName" })}
          name="firstName"
          label={formatMessage({ id: "firstName" })}
          validatefield={validateNameField}
          {...commonProps}
        />
        <button type="submit">
          {formatMessage({ id: "submit" })}
        </button>
      </Inform>
    </Fragment>
  );
}
