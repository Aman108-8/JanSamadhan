import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import Details from './Component/Details';
import Authorized from './Component/Authorized';
import OrgDetails from './Component/OrgDetails';
import Verification from './Component/Verification';

const steps = [
  'Organization Details',
  'Authorized Representative',
  'Expertise & Capabilities',
  'Verification Documents',
];

const IndustryRegistration = () => {
  const [step, setStep] = useState(0);
  const [confirmChecked, setConfirmChecked] = useState(false);

  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      {/* Header */}
      <div className="w-full max-w-4xl flex items-center gap-4 mb-6">
        <div className="leading-tight">
          <p className="text-lg font-bold text-gray-900 tracking-wide">JAN SAMADHAN</p>
          <p className="text-xs text-gray-500">Government of Jharkhand</p>
        </div>
        <div className="h-8 w-px bg-gray-200" />
        <div className="leading-tight">
          <p className="text-sm font-medium text-gray-700">Government of Jharkhand</p>
          <span className="inline-block mt-0.5 bg-green-900 text-white text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded">
            INDUSTRY PARTNER PORTAL
          </span>
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">Register Your Organization</h1>
        <p className="text-sm text-gray-500 mt-1">
          Register your organization to collaborate on verified community challenges.
        </p>
      </div>

      {/* Stepper */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-100 mt-6 px-8 py-6">
        <div className="flex items-center">
          {steps.map((label, i) => (
            <React.Fragment key={label}>
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                    i < step
                      ? 'bg-green-700 text-white'
                      : i === step
                      ? 'bg-green-900 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </span>
                <span
                  className={`text-xs font-medium text-center max-w-[110px] ${
                    i === step ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div className="flex-1 h-px bg-gray-200 mx-2 mb-5" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="border-t border-gray-100 mt-6 pt-6">
          {/* ===== STEP 1: Organization Details ===== */}
          {step === 0 && <Details />}

          {/* ===== STEP 2: Authorized Representative ===== */}
          {step === 1 && <Authorized />}

          {/* ===== STEP 3: Expertise & Capabilities ===== */}
          {step === 2 && <OrgDetails />}

          {/* ===== STEP 4: Verification Documents (incl. resources, experience, account) ===== */}
          {step === 3 && (
            <Verification
              confirmChecked={confirmChecked}
              onConfirmChange={() => setConfirmChecked((v) => !v)}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          {step === 0 ? (
            <Link
              to="/Industry/login"
              className="border border-gray-300 text-gray-700 text-sm font-medium px-5 py-2 rounded-md"
            >
              Back to Login
            </Link>
          ) : (
            <button
              type="button"
              onClick={goBack}
              className="border border-gray-300 text-gray-700 text-sm font-medium px-5 py-2 rounded-md"
            >
              Back
            </button>
          )}

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="bg-green-900 hover:bg-green-950 text-white text-sm font-medium px-6 py-2 rounded-md"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              disabled={!confirmChecked}
              className="bg-green-900 hover:bg-green-950 text-white text-sm font-medium px-6 py-2 rounded-md disabled:opacity-40"
            >
              Submit Registration
            </button>
          )}
        </div>
      </div>

      {step === steps.length - 1 && (
        <p className="text-xs text-gray-400 mt-4">
          Your organization will be reviewed before Industry Portal access is activated.
        </p>
      )}
    </div>
  );
};

export default IndustryRegistration;