import React, { useState, FormEvent } from 'react';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

type AuthMode = 'login' | 'register';

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [error, setError] = useState<string | null>(null);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (loginEmail === 'test@test.com') {
      onLogin({ name: 'Test User', email: loginEmail });
    } else {
      setError('Invalid email or password.');
    }
  };

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!registerName || !registerEmail || !registerPassword) {
        setError('Please fill in all fields.');
        return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (registerEmail === 'test@test.com') {
        setError('An account with this email already exists.');
        return;
    }
    // Mock registration success
    onLogin({ name: registerName, email: registerEmail });
  };
  
  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError(null);
  };
  
  const activeTabClasses = "border-gray-900 text-gray-900";
  const inactiveTabClasses = "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300";

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => switchMode('login')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${mode === 'login' ? activeTabClasses : inactiveTabClasses}`}
            >
              Login
            </button>
            <button
              onClick={() => switchMode('register')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${mode === 'register' ? activeTabClasses : inactiveTabClasses}`}
            >
              Register
            </button>
          </nav>
        </div>

        <div className="mt-8">
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-gray-900">Welcome Back</h2>
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                {/* FIX: Added missing className prop. */}
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                  />
                </div>
              </div>
              
              {error && <p className="text-sm text-red-600 text-center">{error}</p>}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
                >
                  Sign in
                </button>
              </div>
            </form>
          ) : (
             <form onSubmit={handleRegisterSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-900">Create an Account</h2>
                <div>
                    {/* FIX: Added missing className prop. */}
                    <label htmlFor="register-name" className="block text-sm font-medium text-gray-700">
                    Full Name
                    </label>
                    <input id="register-name" type="text" required value={registerName} onChange={(e) => setRegisterName(e.target.value)} className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                </div>
                <div>
                    {/* FIX: Added missing className prop. */}
                    <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">
                    Email address
                    </label>
                    <input id="register-email" type="email" required value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                </div>
                <div>
                    {/* FIX: Added missing className prop. */}
                    <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">
                    Password
                    </label>
                    <input id="register-password" type="password" required value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                </div>
                <div>
                    {/* FIX: Added missing className prop. */}
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                    </label>
                    <input id="confirm-password" type="password" required value={registerConfirmPassword} onChange={(e) => setRegisterConfirmPassword(e.target.value)} className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                </div>
                
                 {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                <div>
                    <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
                    >
                    Create Account
                    </button>
                </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;