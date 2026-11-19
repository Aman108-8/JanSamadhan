import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User } from 'lucide-react';
import bg from './assests/bg.png';
import { loginUser, registerUser } from './config/PublicApi';
import logo from './assests/logo.svg';

const AuthPage = ({ isLogin = true }) => {
    const navigate = useNavigate();
    const [view, setView] = useState(isLogin ? 'login' : 'signup');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [loginForm, setLoginForm] = useState({ phoneNo: '', password: '' });
    const [signupForm, setSignupForm] = useState({
        name: '',
        phoneNo: '',
        password: '',
        confirmPassword: '',
        agreed: false,
    });

    const handleLoginChange = (event) => {
        const { name, value } = event.target;
        setLoginForm((previous) => ({ ...previous, [name]: value }));
    };

    const handleSignupChange = (event) => {
        const { name, value, type, checked } = event.target;
        setSignupForm((previous) => ({
            ...previous,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const getErrorMessage = (errorResponse, fallback) => (
        errorResponse?.response?.data?.message || fallback
    );

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!loginForm.phoneNo.trim() || !loginForm.password) {
            setError('Please enter your mobile number and password.');
            return;
        }

        try {
            setLoading(true);
            const response = await loginUser({
                phoneNo: loginForm.phoneNo.trim(),
                password: loginForm.password,
            });
            localStorage.setItem('user', JSON.stringify(response.data));
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('rememberMe');
            }
            navigate('/home');
        } catch (requestError) {
            setError(getErrorMessage(requestError, 'Login failed. Please check your credentials.'));
        } finally {
            setLoading(false);
        }
    };

    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!signupForm.name.trim() || !signupForm.phoneNo.trim() || !signupForm.password) {
            setError('Please fill in all required fields.');
            return;
        }
        if (signupForm.password !== signupForm.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (!signupForm.agreed) {
            setError('Please agree to the Terms of Service and Privacy Policy.');
            return;
        }

        try {
            setLoading(true);
            await registerUser({
                name: signupForm.name.trim(),
                phoneNo: signupForm.phoneNo.trim(),
                password: signupForm.password,
            });
            setSignupForm({ name: '', phoneNo: '', password: '', confirmPassword: '', agreed: false });
            navigate('/home');
        } catch (requestError) {
            setError(getErrorMessage(requestError, 'Sign up failed. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

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
                            {/*<p className="text-xs text-gray-500">Jharkhand Government</p>*/}
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
            <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10 overflow-hidden">
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
                    {error && (
                        <div className="mb-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
                            {error}
                        </div>
                    )}
                    {view === 'login' ? (
                        <>
                            <h1 className="text-2xl font-bold text-green-900 text-center">Welcome Back</h1>
                            <p className="text-sm text-gray-500 text-center mt-2 mb-6">
                                Sign in to track your reported problems and stay updated on their progress.
                            </p>

                            <form className="space-y-4" onSubmit={handleLoginSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Mobile Number or Email
                                    </label>
                                    <input
                                        type="text"
                                        name="phoneNo"
                                        value={loginForm.phoneNo}
                                        onChange={handleLoginChange}
                                        placeholder="Enter mobile number or email"
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
                                            name="password"
                                            value={loginForm.password}
                                            onChange={handleLoginChange}
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
                                    disabled={loading}
                                    className="w-full bg-green-900 hover:bg-green-800 text-white font-medium py-2.5 rounded-full transition-colors"
                                >
                                    {loading ? 'Signing in...' : 'Login'}
                                </button>

                                <p className="text-center text-sm text-gray-600 pt-1">
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setView('signup')}
                                        className="text-green-800 font-medium hover:underline"
                                    >
                                        Sign Up
                                    </button>
                                </p>

                                <div className="flex items-center gap-3 pt-1">
                                    <div className="flex-1 h-px bg-gray-200" />
                                    <span className="text-xs text-gray-400">or</span>
                                    <div className="flex-1 h-px bg-gray-200" />
                                </div>

                                <button
                                    type="button"
                                    className="w-full border border-gray-300 text-gray-700 font-medium py-2.5 rounded-full hover:bg-gray-50 transition-colors"
                                >
                                    Continue with OTP
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold text-green-900 text-center">Create Account</h1>
                            <p className="text-sm text-gray-500 text-center mt-2 mb-6">
                                Sign up to report problems and track their progress in your area.
                            </p>

                            <form className="space-y-4" onSubmit={handleSignupSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={signupForm.name}
                                            onChange={handleSignupChange}
                                            placeholder="Enter your full name"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
                                        />
                                        <User className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Mobile Number or Email
                                    </label>
                                    <input
                                        type="text"
                                        name="phoneNo"
                                        value={signupForm.phoneNo}
                                        onChange={handleSignupChange}
                                        placeholder="Enter mobile number or email"
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
                                            name="password"
                                            value={signupForm.password}
                                            onChange={handleSignupChange}
                                            placeholder="Create a password"
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirm ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={signupForm.confirmPassword}
                                            onChange={handleSignupChange}
                                            placeholder="Re-enter your password"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm((v) => !v)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            aria-label={showConfirm ? 'Hide password' : 'Show password'}
                                        >
                                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 pt-1">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        name="agreed"
                                        checked={signupForm.agreed}
                                        onChange={handleSignupChange}
                                        className="mt-0.5"
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-600">
                                        I agree to the Terms of Service and Privacy Policy
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-green-900 hover:bg-green-800 text-white font-medium py-2.5 rounded-full transition-colors"
                                >
                                    {loading ? 'Creating account...' : 'Sign Up'}
                                </button>

                                <p className="text-center text-sm text-gray-600 pt-1">
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setView('login')}
                                        className="text-green-800 font-medium hover:underline"
                                    >
                                        Login
                                    </button>
                                </p>
                            </form>
                        </>
                    )}

                    <p className="text-center text-xs text-gray-400 mt-6">
                        Your information is securely protected.
                    </p>
                </div>
            </main>

            <footer className="text-center text-xs text-gray-400 py-4">
                © 2024 Govt of Jharkhand | Developed by JAP-IT
            </footer>
        </div>
    );
};

export default AuthPage;