import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PasswordCreationForm = ({ formData, handleInputChange, errors }) => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    const checks = {
      length: password?.length >= 8,
      lowercase: /[a-z]/?.test(password),
      uppercase: /[A-Z]/?.test(password),
      numbers: /\d/?.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };

    strength = Object.values(checks)?.filter(Boolean)?.length;
    return { strength, checks };
  };

  useEffect(() => {
    if (formData?.password) {
      const { strength } = calculatePasswordStrength(formData?.password);
      setPasswordStrength(strength);
      
      const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
      setStrengthLabel(labels?.[strength - 1] || 'Very Weak');
    } else {
      setPasswordStrength(0);
      setStrengthLabel('');
    }
  }, [formData?.password]);

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-destructive';
    if (passwordStrength <= 2) return 'bg-warning';
    if (passwordStrength <= 3) return 'bg-accent';
    return 'bg-success';
  };

  const getStrengthTextColor = () => {
    if (passwordStrength <= 1) return 'text-destructive';
    if (passwordStrength <= 2) return 'text-warning';
    if (passwordStrength <= 3) return 'text-accent';
    return 'text-success';
  };

  const { checks } = formData?.password ? calculatePasswordStrength(formData?.password) : { checks: {} };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          Security Setup
        </h3>
        <p className="text-sm font-body text-text-secondary">
          Create a strong password to secure your account
        </p>
      </div>
      <div className="space-y-6">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        {formData?.password && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-body font-medium text-text-primary">
                Password Strength
              </span>
              <span className={`text-sm font-body font-medium ${getStrengthTextColor()}`}>
                {strengthLabel}
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-caption">
              <div className={`flex items-center space-x-2 ${checks?.length ? 'text-success' : 'text-text-secondary'}`}>
                <Icon name={checks?.length ? "Check" : "X"} size={12} />
                <span>At least 8 characters</span>
              </div>
              <div className={`flex items-center space-x-2 ${checks?.lowercase ? 'text-success' : 'text-text-secondary'}`}>
                <Icon name={checks?.lowercase ? "Check" : "X"} size={12} />
                <span>Lowercase letter</span>
              </div>
              <div className={`flex items-center space-x-2 ${checks?.uppercase ? 'text-success' : 'text-text-secondary'}`}>
                <Icon name={checks?.uppercase ? "Check" : "X"} size={12} />
                <span>Uppercase letter</span>
              </div>
              <div className={`flex items-center space-x-2 ${checks?.numbers ? 'text-success' : 'text-text-secondary'}`}>
                <Icon name={checks?.numbers ? "Check" : "X"} size={12} />
                <span>Number</span>
              </div>
              <div className={`flex items-center space-x-2 ${checks?.special ? 'text-success' : 'text-text-secondary'}`}>
                <Icon name={checks?.special ? "Check" : "X"} size={12} />
                <span>Special character</span>
              </div>
            </div>
          </div>
        )}

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={errors?.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        {formData?.password && formData?.confirmPassword && (
          <div className={`flex items-center space-x-2 text-sm font-body ${
            formData?.password === formData?.confirmPassword ? 'text-success' : 'text-destructive'
          }`}>
            <Icon 
              name={formData?.password === formData?.confirmPassword ? "Check" : "X"} 
              size={16} 
            />
            <span>
              {formData?.password === formData?.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordCreationForm;