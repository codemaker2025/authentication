import React from "react";
import { useField } from "informed";
import Form from "react-bootstrap/Form";

export default function InformInput({
  label,
  type = "text",
  name,
  placeholder,
  infoMessage,
  required = false,
  disabled = false,
  validatefield,
  ...props
}) {
  const { fieldState, fieldApi, render, ref } = useField({
    name,
    validate: (value) => validatefield?.(value, { required, label }),
  });

  const { value, error } = fieldState;
  const { setValue, setTouched, setError } = fieldApi;

  const handleChange = (e) => {
    let newValue = e.target.value;

   

    setValue(newValue, e);

    const validationError = validatefield?.(newValue, { required, label });
    setError(validationError || undefined);
  };

  const { validate, ...restProps } = props;  // <-- strip out any unwanted props

  return render(
    <Form.Group className="mb-3">
      {label && (
        <Form.Label htmlFor={name}>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </Form.Label>
      )}

      {type === "textarea" ? (
        <Form.Control
          as="textarea"
          id={name}
          ref={ref}
          value={!value && value !== 0 ? "" : value}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          disabled={disabled}
          isInvalid={!!error}
          style={{ height: "100px" }}
          {...restProps}  // only safe props passed here
        />
      ) : (
        <Form.Control
          id={name}
          ref={ref}
          type={type}
          value={!value && value !== 0 ? "" : value}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          disabled={disabled}
          isInvalid={!!error}
          {...restProps}  // only safe props passed here
        />
      )}

      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>

      {!error && infoMessage && (
        <Form.Text className="text-muted">{infoMessage}</Form.Text>
      )}
    </Form.Group>
  );
}
