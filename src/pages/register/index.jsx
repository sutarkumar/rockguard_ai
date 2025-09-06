import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import UserInformationForm from './components/UserInformationForm';
import AlertPreferencesForm from './components/AlertPreferencesForm';
import GeographicAreaSelection from './components/GeographicAreaSelection';
import PasswordCreationForm from './components/PasswordCreationForm';
import OrganizationVerificationForm from './components/OrganizationVerificationForm';
import TermsAndAgreements from './components/TermsAndAgreements';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // User Information
    fullName: '',
    email: '',
    phoneNumber: '',
    role: '',
    organization: '',
    jobTitle: '',
    
    // Alert Preferences
    notificationChannels: [],
    alertTypes: [],
    
    // Geographic Area
    primaryRegion: '',
    state: '',
    city: '',
    latitude: '',
    longitude: '',
    monitoringRadius: '',
    
    // Password
    password: '',
    confirmPassword: '',
    
    // Organization Verification
    organizationType: '',
    registrationNumber: '',
    companySize: '',
    website: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactEmail: '',
    department: '',
    
    // Terms & Agreements
    acceptTerms: false,
    acceptPrivacy: false,
    emergencyAuthorization: false,
    dataProcessingConsent: false,
    marketingConsent: false
  });

  const steps = [
    { id: 1, title: 'Personal Info', description: 'Basic information' },
    { id: 2, title: 'Alert Preferences', description: 'Notification settings' },
    { id: 3, title: 'Geographic Area', description: 'Monitoring regions' },
    { id: 4, title: 'Security', description: 'Password setup' },
    { id: 5, title: 'Organization', description: 'Company details' },
    { id: 6, title: 'Terms', description: 'Agreements' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (category, field, checked) => {
    if (category === 'notificationChannels' || category === 'alertTypes') {
      setFormData(prev => ({
        ...prev,
        [category]: checked 
          ? [...prev?.[category], field]
          : prev?.[category]?.filter(item => item !== field)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: checked
      }));
    }
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData?.fullName?.trim()) newErrors.fullName = 'Full name is required';
        if (!formData?.email?.trim()) newErrors.email = 'Email is required';
        if (!formData?.phoneNumber?.trim()) newErrors.phoneNumber = 'Phone number is required';
        if (!formData?.role) newErrors.role = 'Role selection is required';
        if (!formData?.organization?.trim()) newErrors.organization = 'Organization is required';
        break;
        
      case 2:
        if (formData?.notificationChannels?.length === 0) {
          newErrors.notificationChannels = 'Select at least one notification channel';
        }
        if (formData?.alertTypes?.length === 0) {
          newErrors.alertTypes = 'Select at least one alert type';
        }
        break;
        
      case 3:
        if (!formData?.primaryRegion) newErrors.primaryRegion = 'Primary region is required';
        if (!formData?.state) newErrors.state = 'State is required';
        if (!formData?.city?.trim()) newErrors.city = 'City is required';
        break;
        
      case 4:
        if (!formData?.password) newErrors.password = 'Password is required';
        if (formData?.password?.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (!formData?.confirmPassword) newErrors.confirmPassword = 'Password confirmation is required';
        if (formData?.password !== formData?.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
        
      case 5:
        if (!formData?.organizationType) newErrors.organizationType = 'Organization type is required';
        if (!formData?.emergencyContactName?.trim()) {
          newErrors.emergencyContactName = 'Emergency contact name is required';
        }
        if (!formData?.emergencyContactPhone?.trim()) {
          newErrors.emergencyContactPhone = 'Emergency contact phone is required';
        }
        if (!formData?.emergencyContactEmail?.trim()) {
          newErrors.emergencyContactEmail = 'Emergency contact email is required';
        }
        break;
        
      case 6:
        if (!formData?.acceptTerms) newErrors.acceptTerms = 'You must accept the terms of service';
        if (!formData?.acceptPrivacy) newErrors.acceptPrivacy = 'You must accept the privacy policy';
        if (!formData?.emergencyAuthorization) {
          newErrors.emergencyAuthorization = 'Emergency contact authorization is required';
        }
        if (!formData?.dataProcessingConsent) {
          newErrors.dataProcessingConsent = 'Data processing consent is required';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps?.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration data:', formData);
      
      // Navigate to login with success message
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please check your email for verification instructions.',
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <UserInformationForm
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <AlertPreferencesForm
            formData={formData}
            handleCheckboxChange={handleCheckboxChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <GeographicAreaSelection
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <PasswordCreationForm
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 5:
        return (
          <OrganizationVerificationForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            errors={errors}
          />
        );
      case 6:
        return (
          <TermsAndAgreements
            formData={formData}
            handleCheckboxChange={handleCheckboxChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreadcrumbTrail />
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="UserPlus" size={24} color="white" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-text-primary">
                Create Your RockGuard AI Account
              </h1>
            </div>
            <p className="text-lg font-body text-text-secondary max-w-2xl mx-auto">
              Join the leading geological monitoring platform and protect your operations with AI-powered rockfall prediction and real-time alerts.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {steps?.map((step, index) => (
                <div key={step?.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200 ${
                      currentStep >= step?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-text-secondary'
                    }`}>
                      {currentStep > step?.id ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        step?.id
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <p className={`text-sm font-body font-medium ${
                        currentStep >= step?.id ? 'text-text-primary' : 'text-text-secondary'
                      }`}>
                        {step?.title}
                      </p>
                      <p className="text-xs font-caption text-text-secondary hidden sm:block">
                        {step?.description}
                      </p>
                    </div>
                  </div>
                  {index < steps?.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 transition-colors duration-200 ${
                      currentStep > step?.id ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-lg shadow-card p-6 lg:p-8">
              {renderStepContent()}
              
              {errors?.submit && (
                <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={16} color="var(--color-destructive)" />
                    <p className="text-sm font-body text-destructive">{errors?.submit}</p>
                  </div>
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <div className="flex items-center space-x-4">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      iconName="ChevronLeft"
                      iconPosition="left"
                    >
                      Previous
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/login')}
                  >
                    Already have an account? Sign In
                  </Button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-caption text-text-secondary">
                    Step {currentStep} of {steps?.length}
                  </span>
                  
                  {currentStep < steps?.length ? (
                    <Button
                      variant="default"
                      onClick={handleNext}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      onClick={handleSubmit}
                      loading={isSubmitting}
                      iconName="UserPlus"
                      iconPosition="left"
                    >
                      Create Account
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-success/10 border border-success/20 rounded-md p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Shield" size={20} color="var(--color-success)" className="mt-0.5" />
                <div>
                  <p className="text-sm font-body font-medium text-success mb-1">
                    Secure Registration Process
                  </p>
                  <p className="text-xs font-caption text-text-secondary">
                    Your information is protected with enterprise-grade encryption. Account verification typically takes 24-48 hours for organizational accounts. You'll receive email confirmation once your account is approved and ready for use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;