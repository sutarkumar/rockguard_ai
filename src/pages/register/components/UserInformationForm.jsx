import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserInformationForm = ({ formData, handleInputChange, errors }) => {
  const roleOptions = [
    { value: 'fleet-manager', label: 'Fleet Manager' },
    { value: 'transportation-company', label: 'Transportation Company' },
    { value: 'government-agency', label: 'Government Agency' },
    { value: 'geological-institution', label: 'Geological Institution' },
    { value: 'emergency-services', label: 'Emergency Services' },
    { value: 'mining-company', label: 'Mining Company' },
    { value: 'highway-maintenance', label: 'Highway Maintenance' },
    { value: 'insurance-company', label: 'Insurance Company' },
    { value: 'local-community', label: 'Local Community' },
    { value: 'research-institution', label: 'Research Institution' }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          Personal Information
        </h3>
        <p className="text-sm font-body text-text-secondary">
          Please provide your basic information for account creation
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={handleInputChange}
          error={errors?.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          description="This will be your login username"
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          placeholder="+1 (555) 123-4567"
          value={formData?.phoneNumber}
          onChange={handleInputChange}
          error={errors?.phoneNumber}
          description="For emergency notifications"
          required
        />

        <Select
          label="Professional Role"
          name="role"
          options={roleOptions}
          value={formData?.role}
          onChange={(value) => handleInputChange({ target: { name: 'role', value } })}
          error={errors?.role}
          placeholder="Select your role"
          searchable
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Organization Name"
          type="text"
          name="organization"
          placeholder="Enter your organization"
          value={formData?.organization}
          onChange={handleInputChange}
          error={errors?.organization}
          required
        />

        <Input
          label="Job Title"
          type="text"
          name="jobTitle"
          placeholder="Enter your job title"
          value={formData?.jobTitle}
          onChange={handleInputChange}
          error={errors?.jobTitle}
        />
      </div>
    </div>
  );
};

export default UserInformationForm;