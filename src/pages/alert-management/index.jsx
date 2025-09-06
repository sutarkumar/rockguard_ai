import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import NotificationChannels from './components/NotificationChannels';
import ThresholdControls from './components/ThresholdControls';
import GeographicZones from './components/GeographicZones';
import AlertHistory from './components/AlertHistory';
import EmergencyContacts from './components/EmergencyContacts';
import ScheduleSettings from './components/ScheduleSettings';

const AlertManagement = () => {
  const [activeTab, setActiveTab] = useState('channels');

  const tabs = [
    {
      id: 'channels',
      label: 'Notification Channels',
      icon: 'Bell',
      description: 'Configure delivery methods and preferences'
    },
    {
      id: 'thresholds',
      label: 'Risk Thresholds',
      icon: 'Sliders',
      description: 'Set custom alert triggers and sensitivity'
    },
    {
      id: 'zones',
      label: 'Geographic Zones',
      icon: 'Map',
      description: 'Manage monitoring areas and zone settings'
    },
    {
      id: 'history',
      label: 'Alert History',
      icon: 'History',
      description: 'Review past notifications and performance'
    },
    {
      id: 'contacts',
      label: 'Emergency Contacts',
      icon: 'Users',
      description: 'Manage contact lists and escalation rules'
    },
    {
      id: 'schedule',
      label: 'Schedule Settings',
      icon: 'Clock',
      description: 'Configure time-based alert preferences'
    }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'channels':
        return <NotificationChannels />;
      case 'thresholds':
        return <ThresholdControls />;
      case 'zones':
        return <GeographicZones />;
      case 'history':
        return <AlertHistory />;
      case 'contacts':
        return <EmergencyContacts />;
      case 'schedule':
        return <ScheduleSettings />;
      default:
        return <NotificationChannels />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreadcrumbTrail />
      <main className="pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary">Alert Management</h1>
                <p className="text-lg font-body text-text-secondary mt-2">
                  Configure notification preferences, review alert history, and manage emergency contacts
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {/* System Status Indicator */}
                <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 text-success rounded-lg border border-success/20">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-body font-medium">Alert System Online</span>
                </div>
                <Button variant="outline" iconName="Settings" iconPosition="left">
                  Global Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-body text-text-secondary">Active Alerts</p>
                  <p className="text-2xl font-heading font-bold text-destructive">4</p>
                </div>
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} color="var(--color-destructive)" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-body text-text-secondary">Delivery Rate (24h)</p>
                  <p className="text-2xl font-heading font-bold text-success">98.2%</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} color="var(--color-success)" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-body text-text-secondary">Response Time</p>
                  <p className="text-2xl font-heading font-bold text-primary">12s</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={24} color="var(--color-primary)" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-body text-text-secondary">Active Contacts</p>
                  <p className="text-2xl font-heading font-bold text-accent">15</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={24} color="var(--color-accent)" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-card rounded-lg border border-border mb-8">
            <div className="border-b border-border">
              <nav className="flex overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-3 px-6 py-4 border-b-2 transition-colors duration-200 whitespace-nowrap ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary bg-primary/5' :'border-transparent text-text-secondary hover:text-text-primary hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={tab?.icon} size={20} />
                    <div className="text-left">
                      <div className="text-sm font-body font-medium">{tab?.label}</div>
                      <div className="text-xs opacity-80">{tab?.description}</div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Active Tab Content */}
          <div className="space-y-8">
            {renderActiveComponent()}
          </div>

          {/* Emergency Actions */}
          <div className="mt-8 bg-destructive/5 border border-destructive/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} color="var(--color-destructive)" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-destructive">Emergency Actions</h3>
                  <p className="text-sm font-body text-text-secondary">
                    Quick access to critical alert management functions
                  </p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="destructive" iconName="AlertTriangle" iconPosition="left">
                  Broadcast Emergency Alert
                </Button>
                <Button variant="outline" iconName="Pause" iconPosition="left">
                  Pause All Alerts
                </Button>
                <Button variant="outline" iconName="Phone" iconPosition="left">
                  Emergency Hotline
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlertManagement;