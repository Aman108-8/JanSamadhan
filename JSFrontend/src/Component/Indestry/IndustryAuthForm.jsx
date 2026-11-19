import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import bg from './assests/bg.png';
import logo from './assests/logo.svg';

const IndustryAuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <header className="relative z-10 w-full bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={logo} alt="JanSamadhan logo" className="w-10 h-10 object-contain" />
            </div>
            <div className="leading-tight">
              <p className="text-lg font-semibold text-green-900">JanSamadhan</p>
            </div>
          </div>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-gray-700">
            <a href="#" className="hover:text-green-800">Explore Problems</a>
            <a href="#" className="hover:text-green-800">About Us</a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10 overflow-hidden">
        {/* Decorative background trees (simple shapes) */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <svg className="absolute left-0 bottom-0 w-40 h-40" viewBox="0 0 100 100">
            <circle cx="30" cy="30" r="22" fill="#bfe3c8" />
            <rect x="27" y="45" width="6" height="35" fill="#a9c9a9" />
          </svg>
          <svg className="absolute right-0 bottom-0 w-48 h-48" viewBox="0 0 100 100">
            <circle cx="70" cy="35" r="26" fill="#cfead6" />
            <rect x="66" y="55" width="7" height="40" fill="#a9c9a9" />
          </svg>
        </div>

        {/* Auth card */}
        <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-lg px-8 py-10">
          <h1 className="text-2xl font-bold text-green-900 text-center">Industry Partner Login</h1>
          <p className="text-sm text-gray-500 text-center mt-2 mb-6 leading-snug">
            Sign in to manage your assigned challenges and projects.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. name@techinfra.com"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe((v) => !v)}
                />
                Remember me
              </label>
              <a href="#" className="text-sm text-green-800 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-green-900 hover:bg-green-800 text-white font-medium py-2.5 rounded-full transition-colors"
            >
              Login
            </button>

            <button
              type="button"
              className="w-full text-center text-sm text-gray-600 hover:text-green-800 pt-1"
            >
              Continue with OTP
            </button>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <p className="text-center text-sm">
              <Link to="/Industry/Register" className="text-black font-medium hover:underline">
                New Industry Partner? <span className="text-blue-600"> Register </span>
              </Link>
            </p>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            Only verified organizations can access the Industry Portal.
          </p>
        </div>
      </main>

      <footer className="relative z-10 text-center text-xs text-gray-400 py-2">
        © 2024 Govt of Jharkhand | Developed by JAP-IT
      </footer>
    </div>
  );
};

export default IndustryAuthForm;