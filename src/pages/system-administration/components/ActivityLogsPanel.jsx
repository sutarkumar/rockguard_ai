import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ActivityLogsPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  const activityLogs = [
    {
      id: 1,
      timestamp: new Date('2025-09-06T07:01:45'),
      level: 'info',
      action: 'User Login',
      user: 'Dr. Sarah Chen',
      details: 'Successful login from IP 192.168.1.45',
      category: 'authentication',
      ipAddress: '192.168.1.45',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 2,
      timestamp: new Date('2025-09-06T06:58:23'),
      level: 'warning',
      action: 'Alert Threshold Modified',
      user: 'Michael Rodriguez',
      details: 'Critical alert threshold changed from 8.0 to 8.5',
      category: 'configuration',
      ipAddress: '192.168.1.67',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
    },
    {
      id: 3,
      timestamp: new Date('2025-09-06T06:45:12'),
      level: 'info',
      action: 'Alert Acknowledged',
      user: 'Emma Thompson',
      details: 'Acknowledged critical alert #ALT-2025-0906-001 for Highway 101',
      category: 'alert_management',
      ipAddress: '192.168.1.89',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)'
    },
    {
      id: 4,
      timestamp: new Date('2025-09-06T06:30:45'),
      level: 'error',
      action: 'Data Source Connection Failed',
      user: 'System',
      details: 'Failed to connect to USGS Earthquake API - Connection timeout',
      category: 'system',
      ipAddress: 'N/A',
      userAgent: 'System Process'
    },
    {
      id: 5,
      timestamp: new Date('2025-09-06T06:15:33'),
      level: 'info',
      action: 'User Permission Updated',
      user: 'Dr. Sarah Chen',
      details: 'Updated access level for James Wilson from Standard User to Emergency Response',
      category: 'user_management',
      ipAddress: '192.168.1.45',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 6,
      timestamp: new Date('2025-09-06T06:00:18'),
      level: 'critical',
      action: 'Emergency Override Activated',
      user: 'Emma Thompson',
      details: 'Emergency broadcast activated for Zone 7 - Immediate evacuation alert sent',
      category: 'emergency',
      ipAddress: '192.168.1.89',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)'
    },
    {
      id: 7,
      timestamp: new Date('2025-09-06T05:45:27'),
      level: 'info',
      action: 'Data Export Completed',
      user: 'Lisa Park',
      details: 'Exported geological data for August 2025 (2.3GB)',
      category: 'data_management',
      ipAddress: '192.168.1.123',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
    },
    {
      id: 8,
      timestamp: new Date('2025-09-06T05:30:12'),
      level: 'warning',
      action: 'High System Load Detected',
      user: 'System',
      details: 'CPU usage exceeded 85% threshold for 5 minutes',
      category: 'performance',
      ipAddress: 'N/A',
      userAgent: 'System Monitor'
    }
  ];

  const levelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'info', label: 'Info' },
    { value: 'warning', label: 'Warning' },
    { value: 'error', label: 'Error' },
    { value: 'critical', label: 'Critical' }
  ];

  const userOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'Dr. Sarah Chen', label: 'Dr. Sarah Chen' },
    { value: 'Michael Rodriguez', label: 'Michael Rodriguez' },
    { value: 'Emma Thompson', label: 'Emma Thompson' },
    { value: 'James Wilson', label: 'James Wilson' },
    { value: 'Lisa Park', label: 'Lisa Park' },
    { value: 'System', label: 'System' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'Last 7 days' },
    { value: 'month', label: 'Last 30 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  const filteredLogs = activityLogs?.filter(log => {
    const matchesSearch = log?.action?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.details?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.user?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesLevel = filterLevel === 'all' || log?.level === filterLevel;
    const matchesUser = filterUser === 'all' || log?.user === filterUser;
    return matchesSearch && matchesLevel && matchesUser;
  });

  const getLevelConfig = (level) => {
    const configs = {
      'info': { bg: 'bg-primary/10', text: 'text-primary', icon: 'Info' },
      'warning': { bg: 'bg-warning/10', text: 'text-warning', icon: 'AlertTriangle' },
      'error': { bg: 'bg-destructive/10', text: 'text-destructive', icon: 'XCircle' },
      'critical': { bg: 'bg-destructive/20', text: 'text-destructive', icon: 'AlertOctagon' }
    };
    return configs?.[level] || configs?.['info'];
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'authentication': 'LogIn',
      'configuration': 'Settings',
      'alert_management': 'Bell',
      'system': 'Server',
      'user_management': 'Users',
      'emergency': 'Siren',
      'data_management': 'Database',
      'performance': 'Activity'
    };
    return icons?.[category] || 'FileText';
  };

  const handleExportLogs = () => {
    console.log('Exporting activity logs...');
    // Implementation would export logs
  };

  const handleClearLogs = () => {
    console.log('Clearing old logs...');
    // Implementation would clear old logs
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-bold text-text-primary">Activity Logs</h2>
            <p className="text-sm font-body text-text-secondary mt-1">
              System activity and user action audit trail
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download" onClick={handleExportLogs}>
              Export
            </Button>
            <Button variant="outline" size="sm" iconName="Trash2" onClick={handleClearLogs}>
              Clear Old
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
          <Select
            placeholder="Filter by level"
            options={levelOptions}
            value={filterLevel}
            onChange={setFilterLevel}
          />
          <Select
            placeholder="Filter by user"
            options={userOptions}
            value={filterUser}
            onChange={setFilterUser}
          />
          <Select
            placeholder="Date range"
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
      </div>
      {/* Logs List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredLogs?.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredLogs?.map((log) => {
              const levelConfig = getLevelConfig(log?.level);
              const categoryIcon = getCategoryIcon(log?.category);
              
              return (
                <div key={log?.id} className="p-4 hover:bg-muted/50 transition-colors duration-200">
                  <div className="flex items-start space-x-4">
                    {/* Level Indicator */}
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${levelConfig?.bg}`}>
                      <Icon name={levelConfig?.icon} size={16} color={`var(--color-${log?.level === 'info' ? 'primary' : log?.level === 'warning' ? 'warning' : 'destructive'})`} />
                    </div>

                    {/* Log Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <Icon name={categoryIcon} size={14} color="var(--color-text-secondary)" />
                          <h4 className="text-sm font-body font-semibold text-text-primary">
                            {log?.action}
                          </h4>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${levelConfig?.bg} ${levelConfig?.text}`}>
                            {log?.level?.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-xs font-caption text-text-secondary">
                          {log?.timestamp?.toLocaleString()}
                        </span>
                      </div>
                      
                      <p className="text-sm font-body text-text-secondary mb-2">
                        {log?.details}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs font-caption text-text-secondary">
                        <span className="flex items-center space-x-1">
                          <Icon name="User" size={12} />
                          <span>{log?.user}</span>
                        </span>
                        {log?.ipAddress !== 'N/A' && (
                          <span className="flex items-center space-x-1">
                            <Icon name="Globe" size={12} />
                            <span>{log?.ipAddress}</span>
                          </span>
                        )}
                        <span className="flex items-center space-x-1">
                          <Icon name="Tag" size={12} />
                          <span>{log?.category?.replace('_', ' ')}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon name="FileText" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
            <p className="text-text-secondary font-body">No activity logs found matching your criteria</p>
          </div>
        )}
      </div>
      {/* Summary Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm font-body text-text-secondary">
          <span>Showing {filteredLogs?.length} of {activityLogs?.length} log entries</span>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Info: {activityLogs?.filter(log => log?.level === 'info')?.length}</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span>Warning: {activityLogs?.filter(log => log?.level === 'warning')?.length}</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-destructive rounded-full"></div>
              <span>Error/Critical: {activityLogs?.filter(log => log?.level === 'error' || log?.level === 'critical')?.length}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogsPanel;