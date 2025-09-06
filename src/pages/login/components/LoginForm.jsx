import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for authentication
  const mockCredentials = {
    admin: { email: 'admin@rockguard.ai', password: 'RockGuard2025!' },
    analyst: { email: 'analyst@rockguard.ai', password: 'Geology123!' },
    operator: { email: 'operator@rockguard.ai', password: 'Monitor2025!' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check mock credentials
    const isValidCredentials = Object.values(mockCredentials)?.some(
      cred => cred?.email === formData?.email && cred?.password === formData?.password
    );
    
    if (isValidCredentials) {
      // Store user session
      localStorage.setItem('rockguard_user', JSON.stringify({
        email: formData?.email,
        loginTime: new Date()?.toISOString(),
        rememberMe: formData?.rememberMe
      }));
      
      navigate('/real-time-dashboard');
    } else {
      setErrors({
        general: 'Invalid email or password. Please check your credentials and try again.'
      });
    }
    
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to forgot password page
    alert('Password reset functionality would be implemented here. Please contact your system administrator.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} color="var(--color-error)" />
              <p className="text-sm font-body text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={isLoading}
        />

        {/* Password Field */}
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          disabled={isLoading}
        />

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm font-body text-primary hover:text-primary/80 transition-colors duration-200"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="right"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Registration Link */}
        <div className="text-center">
          <p className="text-sm font-body text-text-secondary">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="font-medium text-primary hover:text-primary/80 transition-colors duration-200"
              disabled={isLoading}
            >
              Create Account
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;