import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const IntegrationManagement = () => {
  const [testingConnection, setTestingConnection] = useState(null);

  const integrations = [
    {
      id: 'vehicle-alerts',
      name: 'Vehicle Alert System',
      description: 'Integration with fleet management systems for real-time vehicle alerts',
      status: 'connected',
      lastSync: new Date('2025-09-06T06:45:00'),
      endpoint: 'https://api.fleetmanager.com/v2/alerts',
      method: 'POST',
      connectedVehicles: 1247,
      alertsSent: 89,
      responseTime: '145ms',
      icon: 'Truck'
    },
    {
      id: 'email-service',
      name: 'Email Notification Service',
      description: 'SendGrid integration for email alert delivery',
      status: 'connected',
      lastSync: new Date('2025-09-06T07:00:00'),
      endpoint: 'https://api.sendgrid.com/v3/mail/send',
      method: 'POST',
      connectedVehicles: null,
      alertsSent: 342,
      responseTime: '67ms',
      icon: 'Mail'
    },
    {
      id: 'sms-service',
      name: 'SMS Alert Service',
      description: 'Twilio integration for SMS notifications',
      status: 'connected',
      lastSync: new Date('2025-09-06T06:58:00'),
      endpoint: 'https://api.twilio.com/2010-04-01/Messages.json',
      method: 'POST',
      connectedVehicles: null,
      alertsSent: 156,
      responseTime: '234ms',
      icon: 'MessageSquare'
    },
    {
      id: 'geological-data',
      name: 'USGS Geological Data',
      description: 'Real-time geological and seismic data from USGS',
      status: 'connected',
      lastSync: new Date('2025-09-06T07:01:00'),
      endpoint: 'https://earthquake.usgs.gov/fdsnws/event/1/query',
      method: 'GET',
      connectedVehicles: null,
      alertsSent: null,
      responseTime: '89ms',
      icon: 'Mountain'
    },
    {
      id: 'weather-service',
      name: 'Weather Data Service',
      description: 'National Weather Service API for weather conditions',
      status: 'degraded',
      lastSync: new Date('2025-09-06T06:30:00'),
      endpoint: 'https://api.weather.gov/points/lat,lon',
      method: 'GET',
      connectedVehicles: null,
      alertsSent: null,
      responseTime: '456ms',
      icon: 'Cloud'
    },
    {
      id: 'emergency-services',
      name: 'Emergency Services API',
      description: 'Integration with local emergency response systems',
      status: 'disconnected',
      lastSync: new Date('2025-09-05T14:22:00'),
      endpoint: 'https://emergency.local.gov/api/v1/alerts',
      method: 'POST',
      connectedVehicles: null,
      alertsSent: 0,
      responseTime: 'Timeout',
      icon: 'Siren'
    }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      'connected': { 
        bg: 'bg-success/10', 
        text: 'text-success', 
        icon: 'CheckCircle', 
        label: 'Connected',
        indicator: 'bg-success animate-pulse'
      },
      'degraded': { 
        bg: 'bg-warning/10', 
        text: 'text-warning', 
        icon: 'AlertTriangle', 
        label: 'Degraded',
        indicator: 'bg-warning'
      },
      'disconnected': { 
        bg: 'bg-destructive/10', 
        text: 'text-destructive', 
        icon: 'XCircle', 
        label: 'Disconnected',
        indicator: 'bg-destructive'
      }
    };
    return configs?.[status] || configs?.['disconnected'];
  };

  const handleTestConnection = async (integrationId) => {
    setTestingConnection(integrationId);
    
    // Simulate API test
    setTimeout(() => {
      console.log(`Testing connection for ${integrationId}`);
      setTestingConnection(null);
    }, 2000);
  };

  const handleConfigureIntegration = (integrationId) => {
    console.log(`Configuring integration: ${integrationId}`);
    // Implementation would open configuration modal
  };

  const handleToggleIntegration = (integrationId, currentStatus) => {
    console.log(`Toggling integration ${integrationId} from ${currentStatus}`);
    // Implementation would enable/disable integration
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-bold text-text-primary">Integration Management</h2>
            <p className="text-sm font-body text-text-secondary mt-1">
              Manage third-party service connections and API integrations
            </p>
          </div>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Add Integration
          </Button>
        </div>
      </div>
      {/* Integration Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {integrations?.map((integration) => {
            const statusConfig = getStatusConfig(integration?.status);
            
            return (
              <div key={integration?.id} className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={integration?.icon} size={20} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-text-primary">
                        {integration?.name}
                      </h3>
                      <p className="text-sm font-body text-text-secondary">
                        {integration?.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${statusConfig?.indicator}`}></div>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${statusConfig?.bg} ${statusConfig?.text}`}>
                      <Icon name={statusConfig?.icon} size={12} />
                      <span>{statusConfig?.label}</span>
                    </span>
                  </div>
                </div>
                {/* Connection Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-body text-text-secondary">Endpoint:</span>
                    <span className="font-data text-text-primary text-xs bg-muted px-2 py-1 rounded">
                      {integration?.method} {integration?.endpoint}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-body text-text-secondary">Last Sync:</span>
                    <span className="font-body text-text-primary">
                      {integration?.lastSync?.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-body text-text-secondary">Response Time:</span>
                    <span className={`font-body ${
                      integration?.responseTime === 'Timeout' ? 'text-destructive' : 'text-text-primary'
                    }`}>
                      {integration?.responseTime}
                    </span>
                  </div>
                </div>
                {/* Metrics */}
                {(integration?.connectedVehicles || integration?.alertsSent) && (
                  <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted/30 rounded-md">
                    {integration?.connectedVehicles && (
                      <div className="text-center">
                        <p className="text-lg font-heading font-bold text-text-primary">
                          {integration?.connectedVehicles?.toLocaleString()}
                        </p>
                        <p className="text-xs font-caption text-text-secondary">Connected Vehicles</p>
                      </div>
                    )}
                    {integration?.alertsSent !== null && (
                      <div className="text-center">
                        <p className="text-lg font-heading font-bold text-text-primary">
                          {integration?.alertsSent}
                        </p>
                        <p className="text-xs font-caption text-text-secondary">Alerts Sent Today</p>
                      </div>
                    )}
                  </div>
                )}
                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="TestTube"
                      loading={testingConnection === integration?.id}
                      onClick={() => handleTestConnection(integration?.id)}
                    >
                      Test
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Settings"
                      onClick={() => handleConfigureIntegration(integration?.id)}
                    >
                      Configure
                    </Button>
                  </div>
                  
                  <Button
                    variant={integration?.status === 'connected' ? 'destructive' : 'default'}
                    size="sm"
                    iconName={integration?.status === 'connected' ? 'Power' : 'Play'}
                    onClick={() => handleToggleIntegration(integration?.id, integration?.status)}
                  >
                    {integration?.status === 'connected' ? 'Disable' : 'Enable'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Integration Statistics */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-success">
              {integrations?.filter(i => i?.status === 'connected')?.length}
            </p>
            <p className="text-sm font-body text-text-secondary">Connected</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-warning">
              {integrations?.filter(i => i?.status === 'degraded')?.length}
            </p>
            <p className="text-sm font-body text-text-secondary">Degraded</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-destructive">
              {integrations?.filter(i => i?.status === 'disconnected')?.length}
            </p>
            <p className="text-sm font-body text-text-secondary">Disconnected</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-text-primary">
              {integrations?.reduce((sum, i) => sum + (i?.alertsSent || 0), 0)}
            </p>
            <p className="text-sm font-body text-text-secondary">Total Alerts Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationManagement;