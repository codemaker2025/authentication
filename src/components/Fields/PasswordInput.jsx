import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import InformInput from "../Informed/InformInput";

const PasswordInput = () => {
  const [showPassword, togglePassword] = useState(false);

  return (
    <Form.Group className="mb-3">
      <Form.Label>Password</Form.Label>
      <InputGroup>
        <InformInput
          field="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          validate={(value) => (value ? undefined : "Password is required")}
          className="form-control"
        />
        <InputGroup.Text
          onClick={() => togglePassword((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </InputGroup.Text>
      </InputGroup>
    </Form.Group>
  );
};

export default PasswordInput;
