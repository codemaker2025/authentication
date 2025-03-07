import InformInput from "../Informed/InformInput";

const UsernameInput = () => (
  <div className="mb-4 w-full">
    <label className="text-white block mb-1">Username</label>
    <InformInput
      field="username"
      name="username"
      type="text"
      placeholder="Enter username"
      className="bg-gray-800  border border-gray-600 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
      validate={(value) => (value ? undefined : "Username is required")}
    />
  </div>
);

export default UsernameInput;
