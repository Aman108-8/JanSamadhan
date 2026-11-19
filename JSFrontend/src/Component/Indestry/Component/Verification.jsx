import React, { useState } from 'react';
import { Eye, EyeOff, Upload, Plus } from 'lucide-react';

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

const TextArea = (props) => (
  <textarea
    {...props}
    rows={4}
    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
  />
);

const UploadBox = ({ label, optional }) => (
  <div>
    <p className="text-xs font-semibold text-gray-700 mb-1">
      {label} {!optional && <span className="text-red-500">*</span>}
    </p>
    <button
      type="button"
      className="w-full border border-dashed border-gray-300 rounded-md px-3 py-4 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 flex flex-col items-center gap-1"
    >
      <Upload className="w-4 h-4 text-gray-400" />
      Upload Document
    </button>
  </div>
);

const Verification = ({ confirmChecked, onConfirmChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [projects, setProjects] = useState(1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-4">Resources & Capacity</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Number of Employees</FieldLabel>
            <TextInput type="number" placeholder="0" />
          </div>
          <div>
            <FieldLabel>Technical Team Size</FieldLabel>
            <TextInput type="number" placeholder="0" />
          </div>
        </div>
        <div className="mt-4">
          <FieldLabel>Available Equipment / Resources</FieldLabel>
          <TextArea placeholder="List key equipment or resources" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div>
            <FieldLabel>Service Area</FieldLabel>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-700">
              <option>Select service area</option>
              <option>District</option>
              <option>State-wide</option>
            </select>
          </div>
          <div>
            <FieldLabel>Project Capacity</FieldLabel>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-700">
              <option>Select capacity</option>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h2 className="text-base font-bold text-gray-900 mb-1">Previous Experience</h2>
        <p className="text-xs text-gray-500 mb-3">
          Tell us about relevant projects completed by your organization.
        </p>
        {Array.from({ length: projects }).map((_, i) => (
          <TextArea key={i} placeholder={`Previous project ${i + 1} / experience`} />
        ))}
        <button
          type="button"
          onClick={() => setProjects((p) => p + 1)}
          className="mt-3 flex items-center gap-1.5 text-sm font-medium text-green-800 hover:underline"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Create Account</h2>
        
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h2 className="text-base font-bold text-gray-900">Organization Verification</h2>
        <p className="text-xs text-gray-500 mt-1 mb-4">
          These documents will be reviewed by JanSamadhan administration before your
          organization can access the Industry Portal.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <UploadBox label="Government Registration Certificate" />
          <UploadBox label="PAN / Organization ID" />
          <UploadBox label="GST Certificate" optional />
          <UploadBox label="Additional Supporting Document" optional />
        </div>

        <label className="flex items-start gap-2 mt-5 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={confirmChecked}
            onChange={onConfirmChange}
            className="mt-0.5"
          />
          I confirm that the information and documents provided are accurate and belong to
          this organization.
        </label>
      </div>
    </div>
  );
};

export default Verification;