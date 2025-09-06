import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OrganizationVerificationForm = ({ formData, handleInputChange, handleSelectChange, errors }) => {
  const organizationTypeOptions = [
    { value: 'transportation', label: 'Transportation Company' },
    { value: 'government', label: 'Government Agency' },
    { value: 'geological', label: 'Geological Institution' },
    { value: 'emergency', label: 'Emergency Services' },
    { value: 'mining', label: 'Mining Company' },
    { value: 'highway', label: 'Highway Maintenance' },
    { value: 'insurance', label: 'Insurance Company' },
    { value: 'research', label: 'Research Institution' },
    { value: 'consulting', label: 'Consulting Firm' },
    { value: 'other', label: 'Other' }
  ];

  const companySizeOptions = [
    { value: 'startup', label: '1-10 employees' },
    { value: 'small', label: '11-50 employees' },
    { value: 'medium', label: '51-200 employees' },
    { value: 'large', label: '201-1000 employees' },
    { value: 'enterprise', label: '1000+ employees' }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          Organization Verification
        </h3>
        <p className="text-sm font-body text-text-secondary">
          Provide organization details for account verification and system integration
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Select
            label="Organization Type"
            name="organizationType"
            options={organizationTypeOptions}
            value={formData?.organizationType}
            onChange={(value) => handleSelectChange('organizationType', value)}
            error={errors?.organizationType}
            placeholder="Select organization type"
            searchable
            required
          />

          <Input
            label="Company Registration Number"
            type="text"
            name="registrationNumber"
            placeholder="Enter registration number"
            value={formData?.registrationNumber}
            onChange={handleInputChange}
            error={errors?.registrationNumber}
            description="Business license or registration ID"
          />

          <Select
            label="Company Size"
            name="companySize"
            options={companySizeOptions}
            value={formData?.companySize}
            onChange={(value) => handleSelectChange('companySize', value)}
            error={errors?.companySize}
            placeholder="Select company size"
          />

          <Input
            label="Website URL"
            type="url"
            name="website"
            placeholder="https://www.company.com"
            value={formData?.website}
            onChange={handleInputChange}
            error={errors?.website}
            description="Official company website"
          />
        </div>

        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <h4 className="text-base font-heading font-medium text-text-primary mb-1">
              Emergency Contact Information
            </h4>
            <p className="text-sm font-caption text-text-secondary">
              Primary contact for critical alerts
            </p>
          </div>

          <Input
            label="Emergency Contact Name"
            type="text"
            name="emergencyContactName"
            placeholder="Enter contact name"
            value={formData?.emergencyContactName}
            onChange={handleInputChange}
            error={errors?.emergencyContactName}
            required
          />

          <Input
            label="Emergency Contact Phone"
            type="tel"
            name="emergencyContactPhone"
            placeholder="+1 (555) 123-4567"
            value={formData?.emergencyContactPhone}
            onChange={handleInputChange}
            error={errors?.emergencyContactPhone}
            description="24/7 reachable number"
            required
          />

          <Input
            label="Emergency Contact Email"
            type="email"
            name="emergencyContactEmail"
            placeholder="emergency@company.com"
            value={formData?.emergencyContactEmail}
            onChange={handleInputChange}
            error={errors?.emergencyContactEmail}
            description="Monitored emergency email"
            required
          />

          <Input
            label="Department/Division"
            type="text"
            name="department"
            placeholder="Safety Department"
            value={formData?.department}
            onChange={handleInputChange}
            error={errors?.department}
            description="Responsible department"
          />
        </div>
      </div>
      <div className="bg-warning/10 border border-warning/20 rounded-md p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-warning rounded-full flex items-center justify-center mt-0.5">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div>
            <p className="text-sm font-body font-medium text-warning mb-1">
              Verification Process
            </p>
            <p className="text-xs font-caption text-text-secondary">
              Organization details will be verified within 24-48 hours. You'll receive email confirmation once verification is complete. Emergency contacts may be contacted during the verification process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationVerificationForm;