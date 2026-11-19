import React from 'react';

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

const Details = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-4">1. Organization Details</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel required>Organization Name</FieldLabel>
            <TextInput placeholder="Enter organization name" />
          </div>
          <div>
            <FieldLabel required>Organization Type</FieldLabel>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-700">
              <option>Select organization type</option>
              <option>Private Company</option>
              <option>University / Institution</option>
              <option>NGO</option>
              <option>Government Body</option>
            </select>
          </div>
          <div>
            <FieldLabel required>Official Email</FieldLabel>
            <TextInput type="email" placeholder="Enter official email" />
          </div>
          <div>
            <FieldLabel required>Official Phone Number</FieldLabel>
            <TextInput type="tel" placeholder="Enter phone number" />
          </div>
          <div>
            <FieldLabel>Official Website</FieldLabel>
            <TextInput placeholder="Enter website" />
          </div>
          <div>
            <FieldLabel>Year Established</FieldLabel>
            <TextInput placeholder="Enter year" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">2. Organization Location</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel required>State</FieldLabel>
            <TextInput value="Jharkhand" readOnly />
          </div>
          <div>
            <FieldLabel required>District</FieldLabel>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-700">
              <option>Select district</option>
              <option>Ranchi</option>
              <option>Jamshedpur</option>
              <option>Khunti</option>
            </select>
          </div>
          <div>
            <FieldLabel required>City / Block</FieldLabel>
            <TextInput placeholder="Enter city or block" />
          </div>
          <div>
            <FieldLabel required>PIN Code</FieldLabel>
            <TextInput placeholder="Enter PIN" />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel required>Full Address</FieldLabel>
            <TextInput placeholder="Enter complete organization address" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;