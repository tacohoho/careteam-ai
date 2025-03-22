import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900">CareTeam AI</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>
        
        <LoginForm />
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 