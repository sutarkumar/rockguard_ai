import React from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';

const AlertPreferencesForm = ({ formData, handleCheckboxChange, errors }) => {
  const notificationChannels = [
    { id: 'email', label: 'Email Notifications', description: 'Receive alerts via email' },
    { id: 'sms', label: 'SMS/Text Messages', description: 'Receive alerts via text messages' },
    { id: 'messenger', label: 'Messenger Platforms', description: 'Slack, Teams, WhatsApp integration' },
    { id: 'vehicle', label: 'Vehicle System Integration', description: 'Direct alerts to vehicle systems' },
    { id: 'mobile', label: 'Mobile Push Notifications', description: 'Real-time mobile app alerts' }
  ];

  const alertTypes = [
    { id: 'critical', label: 'Critical Risk Alerts', description: 'Immediate danger notifications' },
    { id: 'moderate', label: 'Moderate Risk Alerts', description: 'Elevated risk notifications' },
    { id: 'low', label: 'Low Risk Alerts', description: 'Precautionary notifications' },
    { id: 'maintenance', label: 'System Maintenance', description: 'Scheduled maintenance updates' },
    { id: 'weather', label: 'Weather-Related Alerts', description: 'Weather impact notifications' }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          Alert Preferences
        </h3>
        <p className="text-sm font-body text-text-secondary">
          Configure how you want to receive geological monitoring alerts
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <CheckboxGroup 
            label="Notification Channels" 
            error={errors?.notificationChannels}
          >
            <div className="space-y-4">
              {notificationChannels?.map((channel) => (
                <Checkbox
                  key={channel?.id}
                  label={channel?.label}
                  description={channel?.description}
                  checked={formData?.notificationChannels?.includes(channel?.id)}
                  onChange={(e) => handleCheckboxChange('notificationChannels', channel?.id, e?.target?.checked)}
                />
              ))}
            </div>
          </CheckboxGroup>
        </div>

        <div>
          <CheckboxGroup 
            label="Alert Types" 
            error={errors?.alertTypes}
          >
            <div className="space-y-4">
              {alertTypes?.map((type) => (
                <Checkbox
                  key={type?.id}
                  label={type?.label}
                  description={type?.description}
                  checked={formData?.alertTypes?.includes(type?.id)}
                  onChange={(e) => handleCheckboxChange('alertTypes', type?.id, e?.target?.checked)}
                />
              ))}
            </div>
          </CheckboxGroup>
        </div>
      </div>
      <div className="bg-muted p-4 rounded-md">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mt-0.5">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div>
            <p className="text-sm font-body font-medium text-text-primary mb-1">
              Emergency Contact Integration
            </p>
            <p className="text-xs font-caption text-text-secondary">
              Your selected preferences will be used for emergency notifications. You can modify these settings anytime from your dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertPreferencesForm;