import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationChannels = () => {
  const [channels, setChannels] = useState({
    email: true,
    sms: true,
    messenger: false,
    vehicleSystem: true,
    pushNotification: true
  });

  const [deliveryPreferences, setDeliveryPreferences] = useState({
    priority: 'immediate',
    retryAttempts: '3',
    escalationDelay: '5'
  });

  const priorityOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'high', label: 'High Priority (1 min delay)' },
    { value: 'normal', label: 'Normal (5 min delay)' },
    { value: 'low', label: 'Low Priority (15 min delay)' }
  ];

  const retryOptions = [
    { value: '1', label: '1 attempt' },
    { value: '3', label: '3 attempts' },
    { value: '5', label: '5 attempts' },
    { value: '10', label: '10 attempts' }
  ];

  const escalationOptions = [
    { value: '5', label: '5 minutes' },
    { value: '10', label: '10 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' }
  ];

  const handleChannelToggle = (channel) => {
    setChannels(prev => ({
      ...prev,
      [channel]: !prev?.[channel]
    }));
  };

  const channelConfigs = [
    {
      key: 'email',
      label: 'Email Notifications',
      description: 'Receive alerts via email with detailed geological data',
      icon: 'Mail',
      status: channels?.email ? 'active' : 'inactive'
    },
    {
      key: 'sms',
      label: 'SMS Alerts',
      description: 'Critical alerts sent to mobile phone',
      icon: 'MessageSquare',
      status: channels?.sms ? 'active' : 'inactive'
    },
    {
      key: 'messenger',
      label: 'Messenger Integration',
      description: 'Alerts through messaging platforms',
      icon: 'MessageCircle',
      status: channels?.messenger ? 'active' : 'inactive'
    },
    {
      key: 'vehicleSystem',
      label: 'Vehicle Alert System',
      description: 'Direct integration with fleet management systems',
      icon: 'Truck',
      status: channels?.vehicleSystem ? 'active' : 'inactive'
    },
    {
      key: 'pushNotification',
      label: 'Push Notifications',
      description: 'Browser and mobile app notifications',
      icon: 'Bell',
      status: channels?.pushNotification ? 'active' : 'inactive'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-text-primary">Notification Channels</h2>
          <p className="text-sm font-body text-text-secondary mt-1">
            Configure how you receive geological alerts across different platforms
          </p>
        </div>
        <Button variant="outline" iconName="Settings" iconPosition="left">
          Advanced Settings
        </Button>
      </div>
      {/* Channel Configuration */}
      <div className="space-y-4 mb-8">
        {channelConfigs?.map((channel) => (
          <div key={channel?.key} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                channels?.[channel?.key] ? 'bg-primary text-primary-foreground' : 'bg-muted text-text-secondary'
              }`}>
                <Icon name={channel?.icon} size={20} />
              </div>
              <div>
                <h3 className="font-body font-semibold text-text-primary">{channel?.label}</h3>
                <p className="text-sm font-body text-text-secondary">{channel?.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded-md text-xs font-caption font-medium ${
                channel?.status === 'active' ?'bg-success/10 text-success' :'bg-muted text-text-secondary'
              }`}>
                {channel?.status}
              </span>
              <Checkbox
                checked={channels?.[channel?.key]}
                onChange={() => handleChannelToggle(channel?.key)}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Delivery Preferences */}
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Delivery Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Select
            label="Alert Priority"
            description="How quickly alerts are delivered"
            options={priorityOptions}
            value={deliveryPreferences?.priority}
            onChange={(value) => setDeliveryPreferences(prev => ({ ...prev, priority: value }))}
          />
          
          <Select
            label="Retry Attempts"
            description="Number of delivery attempts for failed alerts"
            options={retryOptions}
            value={deliveryPreferences?.retryAttempts}
            onChange={(value) => setDeliveryPreferences(prev => ({ ...prev, retryAttempts: value }))}
          />
          
          <Select
            label="Escalation Delay"
            description="Time before escalating to backup contacts"
            options={escalationOptions}
            value={deliveryPreferences?.escalationDelay}
            onChange={(value) => setDeliveryPreferences(prev => ({ ...prev, escalationDelay: value }))}
          />
        </div>
      </div>
      {/* Test Notifications */}
      <div className="border-t border-border pt-6 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">Test Notifications</h3>
            <p className="text-sm font-body text-text-secondary mt-1">
              Send test alerts to verify your notification channels are working
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" iconName="Send" iconPosition="left">
              Send Test Alert
            </Button>
            <Button variant="secondary" iconName="Play" iconPosition="left">
              Test All Channels
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationChannels;