import { Button, Alert, Spinner } from "react-bootstrap";
import { Form as Inform } from "informed";
import UsernameInput from "./Fields/UsernameInput";
import PasswordInput from "./Fields/PasswordInput";
import useAuth from "../hooks/useAuth";
import { useAtomValue } from "jotai";
import { authTokenAtom } from "../atoms/authAtom";

const LoginForm = () => {
  const { onLogin, onLogout, loading, error } = useAuth();
  const handleSubmit = async ({ values }) => {
    if (values?.username && values?.password) {
      await onLogin(values?.username, values?.password);
    }
  };
  const token = useAtomValue(authTokenAtom);

  return (
    <div>
      {!token ? (
        <Inform
          onSubmit={handleSubmit}
          className="p-4 bg-dark rounded shadow w-100"
          style={{ maxWidth: "400px" }}
          initialValues={{
            username: "Albin.s@webandcrafts.in",
            password: "Albin@123",
          }}
        >
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="mb-3">
            <UsernameInput />
          </div>

          <div className="mb-3">
            <PasswordInput />
          </div>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Login"}
          </Button>
        </Inform>
      ) : (
        <div>
          Welcome!
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;