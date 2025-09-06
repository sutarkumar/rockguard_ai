import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import UserManagementPanel from './components/UserManagementPanel';
import SystemHealthMonitor from './components/SystemHealthMonitor';
import ConfigurationPanel from './components/ConfigurationPanel';
import ActivityLogsPanel from './components/ActivityLogsPanel';
import IntegrationManagement from './components/IntegrationManagement';
import EmergencyControls from './components/EmergencyControls';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SystemAdministration = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const navigationSections = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'health', label: 'System Health', icon: 'Activity' },
    { id: 'config', label: 'Configuration', icon: 'Settings' },
    { id: 'integrations', label: 'Integrations', icon: 'Plug' },
    { id: 'emergency', label: 'Emergency Controls', icon: 'Shield' },
    { id: 'logs', label: 'Activity Logs', icon: 'FileText' }
  ];

  const systemStats = [
    {
      metric: 'Total Users',
      value: '247',
      change: '+12',
      trend: 'up',
      icon: 'Users',
      description: 'Active user accounts'
    },
    {
      metric: 'System Uptime',
      value: '99.94%',
      change: '+0.1%',
      trend: 'up',
      icon: 'Server',
      description: 'Last 30 days'
    },
    {
      metric: 'Active Integrations',
      value: '4/6',
      change: '-1',
      trend: 'down',
      icon: 'Plug',
      description: 'Connected services'
    },
    {
      metric: 'Alerts Today',
      value: '156',
      change: '+23',
      trend: 'up',
      icon: 'Bell',
      description: 'System notifications'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'User Login',
      user: 'Dr. Sarah Chen',
      timestamp: new Date('2025-09-06T07:01:45'),
      level: 'info'
    },
    {
      id: 2,
      action: 'Alert Threshold Modified',
      user: 'Michael Rodriguez',
      timestamp: new Date('2025-09-06T06:58:23'),
      level: 'warning'
    },
    {
      id: 3,
      action: 'Emergency Override Activated',
      user: 'Emma Thompson',
      timestamp: new Date('2025-09-06T06:00:18'),
      level: 'critical'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats?.map((stat) => (
          <div key={stat?.metric} className="bg-card rounded-lg border border-border shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                  <Icon name={stat?.icon} size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="text-xs font-caption text-text-secondary">{stat?.metric}</p>
                  <p className="text-xl font-heading font-bold text-text-primary">{stat?.value}</p>
                  <p className="text-xs font-caption text-text-secondary">{stat?.description}</p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 text-xs font-medium ${
                stat?.trend === 'up' ? 'text-success' : 'text-destructive'
              }`}>
                <Icon name={stat?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} />
                <span>{stat?.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            iconName="UserPlus"
            iconPosition="left"
            onClick={() => setActiveSection('users')}
            fullWidth
          >
            Add New User
          </Button>
          <Button
            variant="outline"
            iconName="Shield"
            iconPosition="left"
            onClick={() => setActiveSection('emergency')}
            fullWidth
          >
            Emergency Controls
          </Button>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            fullWidth
          >
            Export System Report
          </Button>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-semibold text-text-primary">Recent Activity</h3>
            <Button
              variant="ghost"
              size="sm"
              iconName="ExternalLink"
              onClick={() => setActiveSection('logs')}
            >
              View All Logs
            </Button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {recentActivities?.map((activity) => (
              <div key={activity?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-md">
                <div className={`w-2 h-2 rounded-full ${
                  activity?.level === 'critical' ? 'bg-destructive' :
                  activity?.level === 'warning' ? 'bg-warning' : 'bg-primary'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-body font-medium text-text-primary">{activity?.action}</p>
                  <p className="text-xs font-caption text-text-secondary">
                    by {activity?.user} • {activity?.timestamp?.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'users':
        return <UserManagementPanel />;
      case 'health':
        return <SystemHealthMonitor />;
      case 'config':
        return <ConfigurationPanel />;
      case 'integrations':
        return <IntegrationManagement />;
      case 'emergency':
        return <EmergencyControls />;
      case 'logs':
        return <ActivityLogsPanel />;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreadcrumbTrail />
      <div className="pt-20">
        <div className="flex">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-card border-r border-border shadow-sm min-h-screen">
            <div className="p-6">
              <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
                System Administration
              </h2>
              <nav className="space-y-1">
                {navigationSections?.map((section) => (
                  <button
                    key={section?.id}
                    onClick={() => setActiveSection(section?.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors duration-200 ${
                      activeSection === section?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                    }`}
                  >
                    <Icon name={section?.icon} size={16} />
                    <span className="font-body font-medium">{section?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {renderSectionContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAdministration;