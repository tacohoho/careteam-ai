import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900">CareTeam AI</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your account
          </p>
        </div>
        
        <RegisterForm />
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 