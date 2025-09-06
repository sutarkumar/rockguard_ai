import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertStatusCards = ({ onAlertClick, onEmergencyAction }) => {
  const [selectedAlert, setSelectedAlert] = useState(null);

  const recentPredictions = [
    {
      id: 'PRED001',
      type: 'rockfall',
      severity: 'high',
      location: 'Rocky Mountain Station Alpha',
      confidence: 92,
      timeToImpact: '2.5 hours',
      affectedVehicles: 3,
      timestamp: new Date(Date.now() - 300000),
      status: 'active',
      description: 'High probability rockfall event detected based on seismic activity and ground movement patterns.'
    },
    {
      id: 'PRED002',
      type: 'landslide',
      severity: 'medium',
      location: 'Canyon Ridge Monitor Beta',
      confidence: 78,
      timeToImpact: '6.2 hours',
      affectedVehicles: 1,
      timestamp: new Date(Date.now() - 180000),
      status: 'monitoring',
      description: 'Moderate landslide risk identified due to increased rainfall and soil saturation levels.'
    },
    {
      id: 'PRED003',
      type: 'debris_flow',
      severity: 'low',
      location: 'Valley View Sensor Gamma',
      confidence: 45,
      timeToImpact: '12+ hours',
      affectedVehicles: 0,
      timestamp: new Date(Date.now() - 120000),
      status: 'watch',
      description: 'Low-level debris flow potential observed, continuing to monitor weather conditions.'
    }
  ];

  const activeWarnings = [
    {
      id: 'WARN001',
      type: 'weather',
      title: 'Heavy Rainfall Alert',
      location: 'Regional Area',
      severity: 'medium',
      duration: '6 hours',
      impact: 'Increased rockfall risk',
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: 'WARN002',
      type: 'maintenance',
      title: 'Sensor Maintenance Required',
      location: 'Highland Peak Delta',
      severity: 'low',
      duration: 'Ongoing',
      impact: 'Reduced monitoring coverage',
      timestamp: new Date(Date.now() - 3600000)
    }
  ];

  const systemHealth = {
    overall: 'operational',
    sensors: { active: 12, total: 15, percentage: 80 },
    predictions: { processed: 1247, accuracy: 94.2 },
    alerts: { sent: 23, delivered: 22, failed: 1 },
    uptime: '99.7%',
    lastUpdate: new Date(Date.now() - 30000)
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'var(--color-error)';
      case 'medium': return 'var(--color-warning)';
      case 'low': return 'var(--color-success)';
      default: return 'var(--color-text-secondary)';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error/10';
      case 'medium': return 'bg-warning/10';
      case 'low': return 'bg-success/10';
      default: return 'bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'rockfall': return 'Mountain';
      case 'landslide': return 'Layers';
      case 'debris_flow': return 'Waves';
      case 'weather': return 'Cloud';
      case 'maintenance': return 'Wrench';
      default: return 'AlertTriangle';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'AlertTriangle';
      case 'monitoring': return 'Eye';
      case 'watch': return 'Clock';
      default: return 'Info';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const minutes = Math.floor((Date.now() - timestamp?.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="space-y-6">
      {/* Recent Predictions */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Brain" size={20} color="var(--color-primary)" />
              <h3 className="font-heading font-semibold text-lg text-text-primary">
                AI Predictions
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-caption text-text-secondary">
                {recentPredictions?.length} active
              </span>
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={() => window.location?.reload()}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {recentPredictions?.map((prediction) => (
            <div
              key={prediction?.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedAlert === prediction?.id ? 'border-primary bg-primary/5' : 'border-border'
              }`}
              onClick={() => {
                setSelectedAlert(selectedAlert === prediction?.id ? null : prediction?.id);
                onAlertClick?.(prediction);
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-md ${getSeverityBg(prediction?.severity)}`}>
                    <Icon
                      name={getTypeIcon(prediction?.type)}
                      size={16}
                      color={getSeverityColor(prediction?.severity)}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-body font-semibold text-text-primary capitalize">
                        {prediction?.type?.replace('_', ' ')} Prediction
                      </h4>
                      <div className="flex items-center space-x-1">
                        <Icon
                          name={getStatusIcon(prediction?.status)}
                          size={12}
                          color={getSeverityColor(prediction?.severity)}
                        />
                        <span
                          className="text-xs font-caption font-medium capitalize px-2 py-1 rounded-md"
                          style={{
                            backgroundColor: `${getSeverityColor(prediction?.severity)}20`,
                            color: getSeverityColor(prediction?.severity)
                          }}
                        >
                          {prediction?.severity}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm font-body text-text-secondary mb-2">
                      {prediction?.location}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-caption">
                      <div>
                        <span className="text-text-secondary">Confidence:</span>
                        <div className="font-medium text-text-primary">{prediction?.confidence}%</div>
                      </div>
                      <div>
                        <span className="text-text-secondary">Time to Impact:</span>
                        <div className="font-medium text-text-primary">{prediction?.timeToImpact}</div>
                      </div>
                      <div>
                        <span className="text-text-secondary">Vehicles:</span>
                        <div className="font-medium text-text-primary">{prediction?.affectedVehicles}</div>
                      </div>
                      <div>
                        <span className="text-text-secondary">Updated:</span>
                        <div className="font-medium text-text-primary">{formatTimeAgo(prediction?.timestamp)}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Icon
                  name={selectedAlert === prediction?.id ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  color="var(--color-text-secondary)"
                />
              </div>
              
              {selectedAlert === prediction?.id && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm font-body text-text-primary mb-3">
                    {prediction?.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Send"
                      iconPosition="left"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onEmergencyAction?.('broadcast', prediction);
                      }}
                    >
                      Broadcast Alert
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Phone"
                      iconPosition="left"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onEmergencyAction?.('contact', prediction);
                      }}
                    >
                      Emergency Contact
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MapPin"
                      iconPosition="left"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onEmergencyAction?.('locate', prediction);
                      }}
                    >
                      View Location
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Active Warnings */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
            <h3 className="font-heading font-semibold text-lg text-text-primary">
              Active Warnings
            </h3>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {activeWarnings?.map((warning) => (
            <div
              key={warning?.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-md ${getSeverityBg(warning?.severity)}`}>
                  <Icon
                    name={getTypeIcon(warning?.type)}
                    size={16}
                    color={getSeverityColor(warning?.severity)}
                  />
                </div>
                
                <div>
                  <h4 className="font-body font-semibold text-text-primary">
                    {warning?.title}
                  </h4>
                  <p className="text-sm font-body text-text-secondary">
                    {warning?.location} • {warning?.impact}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-body font-medium text-text-primary">
                  {warning?.duration}
                </div>
                <div className="text-xs font-caption text-text-secondary">
                  {formatTimeAgo(warning?.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* System Health */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} color="var(--color-success)" />
            <h3 className="font-heading font-semibold text-lg text-text-primary">
              System Health
            </h3>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-success mb-1">
                {systemHealth?.sensors?.percentage}%
              </div>
              <div className="text-sm font-body text-text-secondary">
                Sensors Active
              </div>
              <div className="text-xs font-caption text-text-secondary">
                {systemHealth?.sensors?.active}/{systemHealth?.sensors?.total}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-primary mb-1">
                {systemHealth?.predictions?.accuracy}%
              </div>
              <div className="text-sm font-body text-text-secondary">
                Accuracy
              </div>
              <div className="text-xs font-caption text-text-secondary">
                {systemHealth?.predictions?.processed} processed
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-success mb-1">
                {systemHealth?.uptime}
              </div>
              <div className="text-sm font-body text-text-secondary">
                Uptime
              </div>
              <div className="text-xs font-caption text-text-secondary">
                Last 30 days
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-text-primary mb-1">
                {systemHealth?.alerts?.delivered}/{systemHealth?.alerts?.sent}
              </div>
              <div className="text-sm font-body text-text-secondary">
                Alerts Delivered
              </div>
              <div className="text-xs font-caption text-text-secondary">
                {systemHealth?.alerts?.failed} failed
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-body text-text-secondary">
                Last system update:
              </span>
              <span className="text-sm font-body font-medium text-text-primary">
                {formatTimeAgo(systemHealth?.lastUpdate)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertStatusCards;