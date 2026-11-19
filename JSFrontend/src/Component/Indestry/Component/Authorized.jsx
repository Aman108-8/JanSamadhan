import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const FieldLabel = ({ children, required }) => (
  <label className="block text-sm font-semibold text-gray-800 mb-1">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

const TextInput = (props) => (
  <input
    {...props}
    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
  />
);

const Authorized = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div>
      <h2 className="text-base font-bold text-gray-900 mb-4">Authorized Representative</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel required>Contact Person Name</FieldLabel>
          <TextInput placeholder="Enter full name" />
        </div>
        <div>
          <FieldLabel required>Designation</FieldLabel>
          <TextInput placeholder="Enter designation" />
        </div>
        <div>
          <FieldLabel required>Official Contact Email</FieldLabel>
          <TextInput type="email" placeholder="Enter email" />
        </div>
        <div>
          <FieldLabel required>Contact Number</FieldLabel>
          <TextInput type="tel" placeholder="Enter phone number" />
        </div>
          <div>
            <FieldLabel required>Password</FieldLabel>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <FieldLabel required>Confirm Password</FieldLabel>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re-enter password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Authorized;