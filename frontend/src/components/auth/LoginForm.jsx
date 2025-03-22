import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      console.log('Login successful, redirecting to main dashboard');
      // Redirect to the main dashboard with all features
      navigate('/main', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.detail || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };
  
  // Added test account function
  const fillTestAccount = () => {
    setEmail('test@example.com');
    setPassword('password123');
  };

  // Handle login with test account in one click
  const loginWithTestAccount = async () => {
    setEmail('test@example.com');
    setPassword('password123');
    setLoading(true);
    
    try {
      await login('test@example.com', 'password123');
      console.log('Test login successful, redirecting to main dashboard');
      navigate('/main', { replace: true });
    } catch (err) {
      console.error('Test login error:', err);
      setError(err.response?.data?.detail || 'Failed to log in with test account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
      <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <button 
              type="button"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot your password?
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {loading ? 'Logging in...' : 'Sign in'}
          </button>
        </div>
        
        {/* Test account buttons */}
        <div className="text-center">
          <button
            type="button"
            onClick={fillTestAccount}
            className="text-sm text-blue-600 hover:text-blue-500 mr-4"
          >
            Fill Test Account
          </button>
          <button
            type="button"
            onClick={loginWithTestAccount}
            className="text-sm text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
          >
            One-Click Test Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm; 