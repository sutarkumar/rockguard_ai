import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ConfigurationPanel = () => {
  const [activeTab, setActiveTab] = useState('alerts');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Alert Configuration State
  const [alertConfig, setAlertConfig] = useState({
    criticalThreshold: '8.5',
    warningThreshold: '6.0',
    minConfidence: '85',
    alertCooldown: '300',
    enableEmailAlerts: true,
    enableSMSAlerts: true,
    enableVehicleAlerts: true,
    enableWebhooks: false
  });

  // System Configuration State
  const [systemConfig, setSystemConfig] = useState({
    dataRetentionDays: '365',
    backupFrequency: 'daily',
    logLevel: 'info',
    maintenanceWindow: '02:00',
    maxConcurrentUsers: '500',
    sessionTimeout: '480',
    enableAuditLogging: true,
    enablePerformanceMonitoring: true
  });

  // Integration Configuration State
  const [integrationConfig, setIntegrationConfig] = useState({
    emailProvider: 'sendgrid',
    smsProvider: 'twilio',
    webhookTimeout: '30',
    retryAttempts: '3',
    enableRateLimiting: true,
    apiRateLimit: '1000'
  });

  const tabs = [
    { id: 'alerts', label: 'Alert Settings', icon: 'Bell' },
    { id: 'system', label: 'System Settings', icon: 'Settings' },
    { id: 'integrations', label: 'Integrations', icon: 'Plug' },
    { id: 'security', label: 'Security', icon: 'Shield' }
  ];

  const backupFrequencyOptions = [
    { value: 'hourly', label: 'Hourly' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const logLevelOptions = [
    { value: 'debug', label: 'Debug' },
    { value: 'info', label: 'Info' },
    { value: 'warn', label: 'Warning' },
    { value: 'error', label: 'Error' }
  ];

  const emailProviderOptions = [
    { value: 'sendgrid', label: 'SendGrid' },
    { value: 'mailgun', label: 'Mailgun' },
    { value: 'ses', label: 'Amazon SES' },
    { value: 'smtp', label: 'Custom SMTP' }
  ];

  const smsProviderOptions = [
    { value: 'twilio', label: 'Twilio' },
    { value: 'nexmo', label: 'Vonage (Nexmo)' },
    { value: 'aws-sns', label: 'AWS SNS' }
  ];

  const handleConfigChange = (section, field, value) => {
    setHasUnsavedChanges(true);
    if (section === 'alerts') {
      setAlertConfig(prev => ({ ...prev, [field]: value }));
    } else if (section === 'system') {
      setSystemConfig(prev => ({ ...prev, [field]: value }));
    } else if (section === 'integrations') {
      setIntegrationConfig(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSaveChanges = () => {
    console.log('Saving configuration changes...');
    // Implementation would save configuration
    setHasUnsavedChanges(false);
  };

  const handleResetToDefaults = () => {
    console.log('Resetting to default configuration...');
    // Implementation would reset to defaults
    setHasUnsavedChanges(false);
  };

  const renderAlertSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-sm font-body font-semibold text-text-primary">Threshold Settings</h4>
          <Input
            label="Critical Alert Threshold"
            type="number"
            value={alertConfig?.criticalThreshold}
            onChange={(e) => handleConfigChange('alerts', 'criticalThreshold', e?.target?.value)}
            description="Magnitude threshold for critical alerts"
            step="0.1"
            min="0"
            max="10"
          />
          <Input
            label="Warning Alert Threshold"
            type="number"
            value={alertConfig?.warningThreshold}
            onChange={(e) => handleConfigChange('alerts', 'warningThreshold', e?.target?.value)}
            description="Magnitude threshold for warning alerts"
            step="0.1"
            min="0"
            max="10"
          />
          <Input
            label="Minimum Confidence Level (%)"
            type="number"
            value={alertConfig?.minConfidence}
            onChange={(e) => handleConfigChange('alerts', 'minConfidence', e?.target?.value)}
            description="Minimum AI confidence for alert generation"
            min="0"
            max="100"
          />
          <Input
            label="Alert Cooldown (seconds)"
            type="number"
            value={alertConfig?.alertCooldown}
            onChange={(e) => handleConfigChange('alerts', 'alertCooldown', e?.target?.value)}
            description="Minimum time between alerts for same location"
            min="0"
          />
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-body font-semibold text-text-primary">Notification Channels</h4>
          <Checkbox
            label="Enable Email Alerts"
            checked={alertConfig?.enableEmailAlerts}
            onChange={(e) => handleConfigChange('alerts', 'enableEmailAlerts', e?.target?.checked)}
            description="Send alerts via email notifications"
          />
          <Checkbox
            label="Enable SMS Alerts"
            checked={alertConfig?.enableSMSAlerts}
            onChange={(e) => handleConfigChange('alerts', 'enableSMSAlerts', e?.target?.checked)}
            description="Send alerts via SMS messages"
          />
          <Checkbox
            label="Enable Vehicle Alerts"
            checked={alertConfig?.enableVehicleAlerts}
            onChange={(e) => handleConfigChange('alerts', 'enableVehicleAlerts', e?.target?.checked)}
            description="Send alerts to vehicle systems"
          />
          <Checkbox
            label="Enable Webhook Notifications"
            checked={alertConfig?.enableWebhooks}
            onChange={(e) => handleConfigChange('alerts', 'enableWebhooks', e?.target?.checked)}
            description="Send alerts via webhook endpoints"
          />
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-sm font-body font-semibold text-text-primary">Data Management</h4>
          <Input
            label="Data Retention (days)"
            type="number"
            value={systemConfig?.dataRetentionDays}
            onChange={(e) => handleConfigChange('system', 'dataRetentionDays', e?.target?.value)}
            description="How long to keep historical data"
            min="1"
          />
          <Select
            label="Backup Frequency"
            options={backupFrequencyOptions}
            value={systemConfig?.backupFrequency}
            onChange={(value) => handleConfigChange('system', 'backupFrequency', value)}
            description="Automated backup schedule"
          />
          <Select
            label="Log Level"
            options={logLevelOptions}
            value={systemConfig?.logLevel}
            onChange={(value) => handleConfigChange('system', 'logLevel', value)}
            description="System logging verbosity level"
          />
          <Input
            label="Maintenance Window"
            type="time"
            value={systemConfig?.maintenanceWindow}
            onChange={(e) => handleConfigChange('system', 'maintenanceWindow', e?.target?.value)}
            description="Daily maintenance window start time"
          />
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-body font-semibold text-text-primary">Performance Settings</h4>
          <Input
            label="Max Concurrent Users"
            type="number"
            value={systemConfig?.maxConcurrentUsers}
            onChange={(e) => handleConfigChange('system', 'maxConcurrentUsers', e?.target?.value)}
            description="Maximum simultaneous user sessions"
            min="1"
          />
          <Input
            label="Session Timeout (minutes)"
            type="number"
            value={systemConfig?.sessionTimeout}
            onChange={(e) => handleConfigChange('system', 'sessionTimeout', e?.target?.value)}
            description="User session timeout duration"
            min="1"
          />
          <Checkbox
            label="Enable Audit Logging"
            checked={systemConfig?.enableAuditLogging}
            onChange={(e) => handleConfigChange('system', 'enableAuditLogging', e?.target?.checked)}
            description="Log all user actions for compliance"
          />
          <Checkbox
            label="Enable Performance Monitoring"
            checked={systemConfig?.enablePerformanceMonitoring}
            onChange={(e) => handleConfigChange('system', 'enablePerformanceMonitoring', e?.target?.checked)}
            description="Monitor system performance metrics"
          />
        </div>
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-sm font-body font-semibold text-text-primary">Communication Providers</h4>
          <Select
            label="Email Provider"
            options={emailProviderOptions}
            value={integrationConfig?.emailProvider}
            onChange={(value) => handleConfigChange('integrations', 'emailProvider', value)}
            description="Email service provider for notifications"
          />
          <Select
            label="SMS Provider"
            options={smsProviderOptions}
            value={integrationConfig?.smsProvider}
            onChange={(value) => handleConfigChange('integrations', 'smsProvider', value)}
            description="SMS service provider for alerts"
          />
          <Input
            label="Webhook Timeout (seconds)"
            type="number"
            value={integrationConfig?.webhookTimeout}
            onChange={(e) => handleConfigChange('integrations', 'webhookTimeout', e?.target?.value)}
            description="Timeout for webhook requests"
            min="1"
            max="300"
          />
          <Input
            label="Retry Attempts"
            type="number"
            value={integrationConfig?.retryAttempts}
            onChange={(e) => handleConfigChange('integrations', 'retryAttempts', e?.target?.value)}
            description="Number of retry attempts for failed requests"
            min="0"
            max="10"
          />
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-body font-semibold text-text-primary">API Configuration</h4>
          <Checkbox
            label="Enable Rate Limiting"
            checked={integrationConfig?.enableRateLimiting}
            onChange={(e) => handleConfigChange('integrations', 'enableRateLimiting', e?.target?.checked)}
            description="Limit API request rates to prevent abuse"
          />
          <Input
            label="API Rate Limit (requests/hour)"
            type="number"
            value={integrationConfig?.apiRateLimit}
            onChange={(e) => handleConfigChange('integrations', 'apiRateLimit', e?.target?.value)}
            description="Maximum API requests per hour per user"
            min="1"
            disabled={!integrationConfig?.enableRateLimiting}
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Shield" size={20} color="var(--color-warning)" />
          <h4 className="text-sm font-body font-semibold text-warning">Security Configuration</h4>
        </div>
        <p className="text-sm font-body text-text-secondary">
          Security settings require elevated privileges. Contact your system administrator to modify these settings.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50">
        <div className="space-y-4">
          <h4 className="text-sm font-body font-semibold text-text-primary">Authentication</h4>
          <Input
            label="Password Minimum Length"
            type="number"
            value="8"
            disabled
            description="Minimum password length requirement"
          />
          <Input
            label="Session Timeout (minutes)"
            type="number"
            value="30"
            disabled
            description="Automatic logout after inactivity"
          />
          <Checkbox
            label="Require Two-Factor Authentication"
            checked
            disabled
            description="Mandatory 2FA for all users"
          />
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-body font-semibold text-text-primary">Access Control</h4>
          <Input
            label="Max Login Attempts"
            type="number"
            value="5"
            disabled
            description="Account lockout after failed attempts"
          />
          <Input
            label="Lockout Duration (minutes)"
            type="number"
            value="15"
            disabled
            description="Account lockout duration"
          />
          <Checkbox
            label="Enable IP Whitelisting"
           
            disabled
            description="Restrict access to specific IP addresses"
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'alerts':
        return renderAlertSettings();
      case 'system':
        return renderSystemSettings();
      case 'integrations':
        return renderIntegrationSettings();
      case 'security':
        return renderSecuritySettings();
      default:
        return renderAlertSettings();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-bold text-text-primary">System Configuration</h2>
            <p className="text-sm font-body text-text-secondary mt-1">
              Configure global system settings and preferences
            </p>
          </div>
          {hasUnsavedChanges && (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-body text-warning">Unsaved changes</span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleResetToDefaults}>
                  Reset
                </Button>
                <Button variant="default" size="sm" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6" aria-label="Configuration tabs">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-body font-medium text-sm transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ConfigurationPanel;