import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemHealthMonitor = () => {
  const [refreshTime, setRefreshTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime(new Date());
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const systemComponents = [
    {
      id: 'api-server',
      name: 'API Server',
      status: 'healthy',
      uptime: '99.98%',
      responseTime: '45ms',
      lastCheck: new Date(Date.now() - 30000),
      description: 'Main application server handling API requests'
    },
    {
      id: 'database',
      name: 'Database Cluster',
      status: 'healthy',
      uptime: '99.95%',
      responseTime: '12ms',
      lastCheck: new Date(Date.now() - 15000),
      description: 'Primary PostgreSQL database cluster'
    },
    {
      id: 'ai-engine',
      name: 'AI Prediction Engine',
      status: 'healthy',
      uptime: '99.87%',
      responseTime: '234ms',
      lastCheck: new Date(Date.now() - 45000),
      description: 'Machine learning models for rockfall prediction'
    },
    {
      id: 'alert-system',
      name: 'Alert Delivery System',
      status: 'warning',
      uptime: '98.76%',
      responseTime: '156ms',
      lastCheck: new Date(Date.now() - 60000),
      description: 'Multi-channel notification delivery service'
    },
    {
      id: 'data-ingestion',
      name: 'Data Ingestion Pipeline',
      status: 'healthy',
      uptime: '99.92%',
      responseTime: '89ms',
      lastCheck: new Date(Date.now() - 20000),
      description: 'Real-time geological data processing pipeline'
    },
    {
      id: 'vehicle-integration',
      name: 'Vehicle Alert Integration',
      status: 'error',
      uptime: '95.43%',
      responseTime: 'Timeout',
      lastCheck: new Date(Date.now() - 120000),
      description: 'Integration with vehicle alert systems'
    }
  ];

  const dataSourceConnections = [
    {
      id: 'usgs',
      name: 'USGS Earthquake Data',
      status: 'connected',
      lastSync: new Date(Date.now() - 300000),
      dataPoints: '1,247,892',
      latency: '23ms'
    },
    {
      id: 'weather',
      name: 'Weather Service API',
      status: 'connected',
      lastSync: new Date(Date.now() - 180000),
      dataPoints: '89,456',
      latency: '67ms'
    },
    {
      id: 'seismic',
      name: 'Seismic Monitoring Network',
      status: 'connected',
      lastSync: new Date(Date.now() - 90000),
      dataPoints: '2,345,678',
      latency: '34ms'
    },
    {
      id: 'satellite',
      name: 'Satellite Imagery Feed',
      status: 'degraded',
      lastSync: new Date(Date.now() - 900000),
      dataPoints: '45,123',
      latency: '234ms'
    }
  ];

  const performanceMetrics = [
    {
      metric: 'Total Predictions Today',
      value: '2,847',
      change: '+12.3%',
      trend: 'up',
      icon: 'TrendingUp'
    },
    {
      metric: 'Alerts Delivered',
      value: '156',
      change: '+5.7%',
      trend: 'up',
      icon: 'Bell'
    },
    {
      metric: 'Average Response Time',
      value: '89ms',
      change: '-8.2%',
      trend: 'down',
      icon: 'Zap'
    },
    {
      metric: 'System Availability',
      value: '99.94%',
      change: '+0.1%',
      trend: 'up',
      icon: 'Shield'
    }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      'healthy': { bg: 'bg-success/10', text: 'text-success', icon: 'CheckCircle', label: 'Healthy' },
      'warning': { bg: 'bg-warning/10', text: 'text-warning', icon: 'AlertTriangle', label: 'Warning' },
      'error': { bg: 'bg-destructive/10', text: 'text-destructive', icon: 'XCircle', label: 'Error' },
      'connected': { bg: 'bg-success/10', text: 'text-success', icon: 'Wifi', label: 'Connected' },
      'degraded': { bg: 'bg-warning/10', text: 'text-warning', icon: 'WifiOff', label: 'Degraded' },
      'disconnected': { bg: 'bg-destructive/10', text: 'text-destructive', icon: 'WifiOff', label: 'Disconnected' }
    };
    return configs?.[status] || configs?.['error'];
  };

  const handleRefresh = () => {
    setRefreshTime(new Date());
    // Implementation would refresh system status
  };

  const handleTestConnection = (componentId) => {
    console.log(`Testing connection for ${componentId}`);
    // Implementation would test specific component
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-bold text-text-primary">System Health Monitor</h2>
            <p className="text-sm font-body text-text-secondary mt-1">
              Real-time monitoring of system components and performance
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs font-caption text-text-secondary">
              Last updated: {refreshTime?.toLocaleTimeString()}
            </span>
            <Button variant="outline" size="sm" iconName="RefreshCw" onClick={handleRefresh}>
              Refresh
            </Button>
          </div>
        </div>
      </div>
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics?.map((metric) => (
          <div key={metric?.metric} className="bg-card rounded-lg border border-border shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                  <Icon name={metric?.icon} size={16} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="text-xs font-caption text-text-secondary">{metric?.metric}</p>
                  <p className="text-lg font-heading font-bold text-text-primary">{metric?.value}</p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 text-xs font-medium ${
                metric?.trend === 'up' ? 'text-success' : 'text-destructive'
              }`}>
                <Icon name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} />
                <span>{metric?.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* System Components */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-heading font-semibold text-text-primary">System Components</h3>
          <p className="text-sm font-body text-text-secondary mt-1">
            Status and performance of core system components
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {systemComponents?.map((component) => {
              const statusConfig = getStatusConfig(component?.status);
              return (
                <div key={component?.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        component?.status === 'healthy' ? 'bg-success animate-pulse' :
                        component?.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                      }`}></div>
                      <div>
                        <h4 className="text-sm font-body font-semibold text-text-primary">
                          {component?.name}
                        </h4>
                        <p className="text-xs font-caption text-text-secondary">
                          {component?.description}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${statusConfig?.bg} ${statusConfig?.text}`}>
                      <Icon name={statusConfig?.icon} size={12} />
                      <span>{statusConfig?.label}</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="font-caption text-text-secondary">Uptime</p>
                      <p className="font-body font-medium text-text-primary">{component?.uptime}</p>
                    </div>
                    <div>
                      <p className="font-caption text-text-secondary">Response</p>
                      <p className="font-body font-medium text-text-primary">{component?.responseTime}</p>
                    </div>
                    <div>
                      <p className="font-caption text-text-secondary">Last Check</p>
                      <p className="font-body font-medium text-text-primary">
                        {component?.lastCheck?.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      iconName="TestTube" 
                      onClick={() => handleTestConnection(component?.id)}
                    >
                      Test Connection
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Data Source Connections */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-heading font-semibold text-text-primary">Data Source Connections</h3>
          <p className="text-sm font-body text-text-secondary mt-1">
            External data sources and integration status
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Data Source</th>
                <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Status</th>
                <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Last Sync</th>
                <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Data Points</th>
                <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Latency</th>
                <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataSourceConnections?.map((source) => {
                const statusConfig = getStatusConfig(source?.status);
                return (
                  <tr key={source?.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4">
                      <p className="text-sm font-body font-medium text-text-primary">{source?.name}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${statusConfig?.bg} ${statusConfig?.text}`}>
                        <Icon name={statusConfig?.icon} size={12} />
                        <span>{statusConfig?.label}</span>
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-body text-text-primary">
                        {source?.lastSync?.toLocaleString()}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-body text-text-primary">{source?.dataPoints}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-body text-text-primary">{source?.latency}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" iconName="RefreshCw" />
                        <Button variant="ghost" size="sm" iconName="Settings" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;