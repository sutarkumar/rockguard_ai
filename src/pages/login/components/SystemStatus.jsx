import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemHealth, setSystemHealth] = useState({
    status: 'operational',
    uptime: '99.9%',
    lastUpdate: new Date(Date.now() - 300000) // 5 minutes ago
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'var(--color-success)';
      case 'maintenance':
        return 'var(--color-warning)';
      case 'degraded':
        return 'var(--color-error)';
      default:
        return 'var(--color-text-secondary)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return 'CheckCircle';
      case 'maintenance':
        return 'AlertTriangle';
      case 'degraded':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  return (
    <div className="mt-6 p-4 bg-muted rounded-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-body font-medium text-text-primary">
          System Status
        </h3>
        <div className="flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full animate-pulse`} 
               style={{ backgroundColor: getStatusColor(systemHealth?.status) }}>
          </div>
          <span className="text-xs font-caption text-text-secondary">
            Live
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getStatusIcon(systemHealth?.status)} 
              size={14} 
              color={getStatusColor(systemHealth?.status)} 
            />
            <span className="text-xs font-body text-text-primary capitalize">
              {systemHealth?.status}
            </span>
          </div>
          <span className="text-xs font-caption text-text-secondary">
            Uptime: {systemHealth?.uptime}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs font-caption text-text-secondary">
          <span>Last updated: {systemHealth?.lastUpdate?.toLocaleTimeString()}</span>
          <span>{currentTime?.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;