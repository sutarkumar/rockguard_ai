import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const GeographicZones = () => {
  const [selectedZone, setSelectedZone] = useState('zone_1');
  const [zoneSettings, setZoneSettings] = useState({
    zone_1: {
      name: 'Highway 101 Corridor',
      priority: 'critical',
      monitoring: true,
      escalation: true
    },
    zone_2: {
      name: 'Mountain Pass Route',
      priority: 'high',
      monitoring: true,
      escalation: false
    },
    zone_3: {
      name: 'Coastal Access Road',
      priority: 'medium',
      monitoring: false,
      escalation: false
    }
  });

  const zones = [
    {
      id: 'zone_1',
      name: 'Highway 101 Corridor',
      coordinates: '37.7749, -122.4194',
      riskLevel: 'Critical',
      activeAlerts: 3,
      lastUpdate: '2 minutes ago',
      status: 'active',
      color: 'text-destructive'
    },
    {
      id: 'zone_2',
      name: 'Mountain Pass Route',
      coordinates: '37.8044, -122.2711',
      riskLevel: 'High',
      activeAlerts: 1,
      lastUpdate: '15 minutes ago',
      status: 'active',
      color: 'text-warning'
    },
    {
      id: 'zone_3',
      name: 'Coastal Access Road',
      coordinates: '37.6879, -122.4702',
      riskLevel: 'Medium',
      activeAlerts: 0,
      lastUpdate: '1 hour ago',
      status: 'monitoring',
      color: 'text-accent'
    },
    {
      id: 'zone_4',
      name: 'Valley Transit Route',
      coordinates: '37.7849, -122.4094',
      riskLevel: 'Low',
      activeAlerts: 0,
      lastUpdate: '3 hours ago',
      status: 'inactive',
      color: 'text-success'
    }
  ];

  const priorityOptions = [
    { value: 'critical', label: 'Critical Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const handleZoneSettingChange = (zoneId, setting, value) => {
    setZoneSettings(prev => ({
      ...prev,
      [zoneId]: {
        ...prev?.[zoneId],
        [setting]: value
      }
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-text-primary">Geographic Monitoring Zones</h2>
          <p className="text-sm font-body text-text-secondary mt-1">
            Configure monitoring areas and zone-specific alert preferences
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" iconName="Plus" iconPosition="left">
            Add Zone
          </Button>
          <Button variant="secondary" iconName="Map" iconPosition="left">
            View Full Map
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Interface */}
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4 h-80 flex items-center justify-center border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Geological Monitoring Zones"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=37.7749,-122.4194&z=10&output=embed"
              className="rounded-lg"
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} color="var(--color-primary)" />
              <span className="text-sm font-body font-medium text-text-primary">4 Active Zones</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <span className="text-xs font-caption text-text-secondary">Critical</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-xs font-caption text-text-secondary">High</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-xs font-caption text-text-secondary">Medium</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-xs font-caption text-text-secondary">Low</span>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">Zone Settings</h3>
          
          {zones?.map((zone) => (
            <div key={zone?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    zone?.riskLevel === 'Critical' ? 'bg-destructive' :
                    zone?.riskLevel === 'High' ? 'bg-warning' :
                    zone?.riskLevel === 'Medium' ? 'bg-accent' : 'bg-success'
                  }`}></div>
                  <div>
                    <h4 className="font-body font-semibold text-text-primary">{zone?.name}</h4>
                    <p className="text-xs font-caption text-text-secondary">{zone?.coordinates}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-body font-medium ${zone?.color}`}>
                    {zone?.riskLevel}
                  </span>
                  <p className="text-xs font-caption text-text-secondary">{zone?.lastUpdate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-text-secondary">Active Alerts</span>
                  <span className="text-sm font-body font-medium text-text-primary">{zone?.activeAlerts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-text-secondary">Status</span>
                  <span className={`text-sm font-body font-medium capitalize ${
                    zone?.status === 'active' ? 'text-success' :
                    zone?.status === 'monitoring' ? 'text-warning' : 'text-text-secondary'
                  }`}>
                    {zone?.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-border">
                <Select
                  label="Priority Level"
                  options={priorityOptions}
                  value={zoneSettings?.[zone?.id]?.priority || 'medium'}
                  onChange={(value) => handleZoneSettingChange(zone?.id, 'priority', value)}
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={zoneSettings?.[zone?.id]?.monitoring || false}
                      onChange={(e) => handleZoneSettingChange(zone?.id, 'monitoring', e?.target?.checked)}
                    />
                    <span className="text-sm font-body text-text-primary">Active Monitoring</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={zoneSettings?.[zone?.id]?.escalation || false}
                      onChange={(e) => handleZoneSettingChange(zone?.id, 'escalation', e?.target?.checked)}
                    />
                    <span className="text-sm font-body text-text-primary">Auto Escalation</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
                  Configure
                </Button>
                <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                  View Details
                </Button>
                <Button variant="outline" size="sm" iconName="AlertTriangle" iconPosition="left">
                  Test Alert
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Zone Statistics */}
      <div className="border-t border-border pt-6 mt-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Zone Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <div className="text-2xl font-heading font-bold text-destructive">1</div>
            <div className="text-sm font-body text-text-secondary">Critical Zones</div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <div className="text-2xl font-heading font-bold text-warning">1</div>
            <div className="text-sm font-body text-text-secondary">High Risk Zones</div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <div className="text-2xl font-heading font-bold text-accent">1</div>
            <div className="text-sm font-body text-text-secondary">Medium Risk Zones</div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <div className="text-2xl font-heading font-bold text-success">1</div>
            <div className="text-sm font-body text-text-secondary">Low Risk Zones</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicZones;