import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AlertHistory = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'acknowledged', label: 'Acknowledged' },
    { value: 'failed', label: 'Failed' },
    { value: 'pending', label: 'Pending' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const sortOptions = [
    { value: 'timestamp', label: 'Most Recent' },
    { value: 'priority', label: 'Priority Level' },
    { value: 'status', label: 'Status' },
    { value: 'response_time', label: 'Response Time' }
  ];

  const alertHistory = [
    {
      id: 'ALT-2025-001',
      timestamp: new Date('2025-01-06T06:45:00'),
      type: 'Rockfall Risk',
      priority: 'critical',
      zone: 'Highway 101 Corridor',
      message: 'Critical rockfall risk detected - immediate evacuation recommended for vehicles in sector 7A',
      status: 'acknowledged',
      deliveryChannels: ['email', 'sms', 'vehicle_system'],
      responseTime: '45 seconds',
      acknowledgedBy: 'Emergency Response Team',
      acknowledgedAt: new Date('2025-01-06T06:45:45')
    },
    {
      id: 'ALT-2025-002',
      timestamp: new Date('2025-01-06T05:30:00'),
      type: 'Seismic Activity',
      priority: 'high',
      zone: 'Mountain Pass Route',
      message: 'Elevated seismic activity detected - monitor geological conditions closely',
      status: 'delivered',
      deliveryChannels: ['email', 'push_notification'],
      responseTime: '12 seconds',
      acknowledgedBy: null,
      acknowledgedAt: null
    },
    {
      id: 'ALT-2025-003',
      timestamp: new Date('2025-01-06T04:15:00'),
      type: 'Weather Impact',
      priority: 'medium',
      zone: 'Coastal Access Road',
      message: 'Heavy rainfall increasing soil saturation - potential stability concerns',
      status: 'delivered',
      deliveryChannels: ['email'],
      responseTime: '8 seconds',
      acknowledgedBy: null,
      acknowledgedAt: null
    },
    {
      id: 'ALT-2025-004',
      timestamp: new Date('2025-01-06T02:00:00'),
      type: 'System Alert',
      priority: 'low',
      zone: 'Valley Transit Route',
      message: 'Routine sensor calibration completed - all systems operational',
      status: 'delivered',
      deliveryChannels: ['email'],
      responseTime: '5 seconds',
      acknowledgedBy: null,
      acknowledgedAt: null
    },
    {
      id: 'ALT-2025-005',
      timestamp: new Date('2025-01-05T23:45:00'),
      type: 'Rockfall Risk',
      priority: 'high',
      zone: 'Highway 101 Corridor',
      message: 'Moderate rockfall risk - increased monitoring activated',
      status: 'failed',
      deliveryChannels: ['sms'],
      responseTime: 'Failed',
      acknowledgedBy: null,
      acknowledgedAt: null
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-accent bg-accent/10 border-accent/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-success bg-success/10';
      case 'acknowledged': return 'text-primary bg-primary/10';
      case 'failed': return 'text-destructive bg-destructive/10';
      case 'pending': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return 'CheckCircle';
      case 'acknowledged': return 'UserCheck';
      case 'failed': return 'XCircle';
      case 'pending': return 'Clock';
      default: return 'Circle';
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-text-primary">Alert History</h2>
          <p className="text-sm font-body text-text-secondary mt-1">
            Review recent notifications with status tracking and response analysis
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export History
          </Button>
          <Button variant="secondary" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select
          label="Filter by Status"
          options={statusOptions}
          value={filterStatus}
          onChange={setFilterStatus}
        />
        
        <Select
          label="Filter by Priority"
          options={priorityOptions}
          value={filterPriority}
          onChange={setFilterPriority}
        />
        
        <Select
          label="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
        />
      </div>
      {/* Alert History Table */}
      <div className="overflow-x-auto">
        <div className="space-y-4">
          {alertHistory?.map((alert) => (
            <div key={alert?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getPriorityColor(alert?.priority)} border`}>
                    <Icon name="AlertTriangle" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-body font-semibold text-text-primary">{alert?.type}</h3>
                      <span className={`px-2 py-1 rounded-md text-xs font-caption font-medium border ${getPriorityColor(alert?.priority)}`}>
                        {alert?.priority?.toUpperCase()}
                      </span>
                      <span className="text-xs font-caption text-text-secondary">#{alert?.id}</span>
                    </div>
                    <p className="text-sm font-body text-text-secondary mb-2">{alert?.message}</p>
                    <div className="flex items-center space-x-4 text-xs font-caption text-text-secondary">
                      <span className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{alert?.zone}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{formatTimestamp(alert?.timestamp)}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-md ${getStatusColor(alert?.status)}`}>
                    <Icon name={getStatusIcon(alert?.status)} size={14} />
                    <span className="text-xs font-caption font-medium capitalize">{alert?.status}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-border">
                <div>
                  <span className="text-xs font-caption text-text-secondary">Delivery Channels</span>
                  <div className="flex items-center space-x-2 mt-1">
                    {alert?.deliveryChannels?.map((channel) => (
                      <div key={channel} className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-md">
                        <Icon 
                          name={
                            channel === 'email' ? 'Mail' :
                            channel === 'sms' ? 'MessageSquare' :
                            channel === 'vehicle_system' ? 'Truck' :
                            channel === 'push_notification' ? 'Bell' : 'Circle'
                          } 
                          size={12} 
                        />
                        <span className="text-xs font-caption text-text-primary capitalize">
                          {channel?.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-xs font-caption text-text-secondary">Response Time</span>
                  <div className="text-sm font-body font-medium text-text-primary mt-1">
                    {alert?.responseTime}
                  </div>
                </div>
                
                <div>
                  <span className="text-xs font-caption text-text-secondary">Acknowledged By</span>
                  <div className="text-sm font-body font-medium text-text-primary mt-1">
                    {alert?.acknowledgedBy || 'Not acknowledged'}
                  </div>
                  {alert?.acknowledgedAt && (
                    <div className="text-xs font-caption text-text-secondary">
                      {formatTimestamp(alert?.acknowledgedAt)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                  View Details
                </Button>
                <Button variant="outline" size="sm" iconName="RotateCcw" iconPosition="left">
                  Resend Alert
                </Button>
                {alert?.status === 'delivered' && (
                  <Button variant="outline" size="sm" iconName="UserCheck" iconPosition="left">
                    Acknowledge
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Performance Summary */}
      <div className="border-t border-border pt-6 mt-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Performance Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-success/10 rounded-lg text-center">
            <div className="text-2xl font-heading font-bold text-success">98.2%</div>
            <div className="text-sm font-body text-text-secondary">Delivery Rate</div>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg text-center">
            <div className="text-2xl font-heading font-bold text-primary">12s</div>
            <div className="text-sm font-body text-text-secondary">Avg Response Time</div>
          </div>
          <div className="p-4 bg-warning/10 rounded-lg text-center">
            <div className="text-2xl font-heading font-bold text-warning">85%</div>
            <div className="text-sm font-body text-text-secondary">Acknowledgment Rate</div>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg text-center">
            <div className="text-2xl font-heading font-bold text-accent">247</div>
            <div className="text-sm font-body text-text-secondary">Total Alerts (30d)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertHistory;