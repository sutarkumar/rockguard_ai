import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const TermsAndAgreements = ({ formData, handleCheckboxChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          Terms & Agreements
        </h3>
        <p className="text-sm font-body text-text-secondary">
          Please review and accept the following terms to complete your registration
        </p>
      </div>
      <div className="space-y-6">
        <div className="bg-muted p-4 rounded-md max-h-48 overflow-y-auto">
          <h4 className="text-sm font-body font-semibold text-text-primary mb-3">
            Terms of Service Summary
          </h4>
          <div className="text-xs font-caption text-text-secondary space-y-2">
            <p>
              • RockGuard AI provides geological monitoring and alert services for professional use
            </p>
            <p>
              • Users are responsible for maintaining accurate contact information for emergency notifications
            </p>
            <p>
              • The service is intended as a supplementary safety tool and should not replace standard safety protocols
            </p>
            <p>
              • Alert accuracy depends on geological data quality and environmental conditions
            </p>
            <p>
              • Users must comply with local regulations regarding geological monitoring systems
            </p>
            <p>
              • Account suspension may occur for misuse or violation of safety protocols
            </p>
          </div>
        </div>

        <Checkbox
          label="I agree to the Terms of Service"
          description="I have read and accept the complete terms of service"
          checked={formData?.acceptTerms}
          onChange={(e) => handleCheckboxChange('agreements', 'acceptTerms', e?.target?.checked)}
          error={errors?.acceptTerms}
          required
        />

        <div className="bg-muted p-4 rounded-md max-h-48 overflow-y-auto">
          <h4 className="text-sm font-body font-semibold text-text-primary mb-3">
            Privacy Policy Summary
          </h4>
          <div className="text-xs font-caption text-text-secondary space-y-2">
            <p>
              • Personal and organizational data is encrypted and stored securely
            </p>
            <p>
              • Location data is used solely for geological risk assessment and alert delivery
            </p>
            <p>
              • Emergency contact information may be shared with relevant authorities during critical alerts
            </p>
            <p>
              • Usage analytics help improve system accuracy and performance
            </p>
            <p>
              • Data is not sold to third parties or used for marketing purposes
            </p>
            <p>
              • Users can request data deletion upon account closure
            </p>
          </div>
        </div>

        <Checkbox
          label="I agree to the Privacy Policy"
          description="I understand how my data will be collected and used"
          checked={formData?.acceptPrivacy}
          onChange={(e) => handleCheckboxChange('agreements', 'acceptPrivacy', e?.target?.checked)}
          error={errors?.acceptPrivacy}
          required
        />

        <Checkbox
          label="Emergency Contact Authorization"
          description="I authorize RockGuard AI to contact emergency contacts during critical alerts"
          checked={formData?.emergencyAuthorization}
          onChange={(e) => handleCheckboxChange('agreements', 'emergencyAuthorization', e?.target?.checked)}
          error={errors?.emergencyAuthorization}
          required
        />

        <Checkbox
          label="Data Processing Consent"
          description="I consent to processing of geological and location data for risk assessment"
          checked={formData?.dataProcessingConsent}
          onChange={(e) => handleCheckboxChange('agreements', 'dataProcessingConsent', e?.target?.checked)}
          error={errors?.dataProcessingConsent}
          required
        />

        <div className="border-t border-border pt-4">
          <Checkbox
            label="Marketing Communications (Optional)"
            description="Receive updates about new features and geological safety insights"
            checked={formData?.marketingConsent}
            onChange={(e) => handleCheckboxChange('agreements', 'marketingConsent', e?.target?.checked)}
          />
        </div>
      </div>
      <div className="bg-success/10 border border-success/20 rounded-md p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} color="var(--color-success)" className="mt-0.5" />
          <div>
            <p className="text-sm font-body font-medium text-success mb-1">
              Your Data is Protected
            </p>
            <p className="text-xs font-caption text-text-secondary">
              RockGuard AI uses industry-standard encryption and security measures to protect your information. Our systems are regularly audited for compliance with data protection regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndAgreements;