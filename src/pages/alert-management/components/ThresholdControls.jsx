import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ThresholdControls = () => {
  const [thresholds, setThresholds] = useState({
    rockfallRisk: 75,
    seismicActivity: 60,
    weatherConditions: 80,
    soilMoisture: 65,
    temperatureVariation: 70
  });

  const [alertTypes, setAlertTypes] = useState({
    critical: 'immediate',
    high: 'within_5min',
    medium: 'within_15min',
    low: 'within_1hour'
  });

  const alertTypeOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'within_5min', label: 'Within 5 minutes' },
    { value: 'within_15min', label: 'Within 15 minutes' },
    { value: 'within_1hour', label: 'Within 1 hour' },
    { value: 'daily_summary', label: 'Daily summary only' }
  ];

  const handleThresholdChange = (type, value) => {
    setThresholds(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleAlertTypeChange = (level, value) => {
    setAlertTypes(prev => ({
      ...prev,
      [level]: value
    }));
  };

  const thresholdConfigs = [
    {
      key: 'rockfallRisk',
      label: 'Rockfall Risk Level',
      description: 'AI-predicted probability of rockfall occurrence',
      icon: 'Mountain',
      unit: '%',
      min: 0,
      max: 100,
      color: 'text-destructive'
    },
    {
      key: 'seismicActivity',
      label: 'Seismic Activity',
      description: 'Ground movement and vibration detection',
      icon: 'Activity',
      unit: '%',
      min: 0,
      max: 100,
      color: 'text-warning'
    },
    {
      key: 'weatherConditions',
      label: 'Weather Impact',
      description: 'Weather-related geological stress factors',
      icon: 'Cloud',
      unit: '%',
      min: 0,
      max: 100,
      color: 'text-accent'
    },
    {
      key: 'soilMoisture',
      label: 'Soil Moisture',
      description: 'Ground saturation levels affecting stability',
      icon: 'Droplets',
      unit: '%',
      min: 0,
      max: 100,
      color: 'text-primary'
    },
    {
      key: 'temperatureVariation',
      label: 'Temperature Variation',
      description: 'Thermal expansion/contraction effects',
      icon: 'Thermometer',
      unit: '%',
      min: 0,
      max: 100,
      color: 'text-secondary'
    }
  ];

  const alertLevels = [
    {
      level: 'critical',
      label: 'Critical Alerts',
      description: 'Immediate danger - requires instant action',
      color: 'bg-destructive/10 text-destructive border-destructive/20',
      icon: 'AlertTriangle'
    },
    {
      level: 'high',
      label: 'High Priority',
      description: 'Elevated risk - monitor closely',
      color: 'bg-warning/10 text-warning border-warning/20',
      icon: 'AlertCircle'
    },
    {
      level: 'medium',
      label: 'Medium Priority',
      description: 'Moderate risk - routine monitoring',
      color: 'bg-accent/10 text-accent border-accent/20',
      icon: 'Info'
    },
    {
      level: 'low',
      label: 'Low Priority',
      description: 'Minimal risk - informational only',
      color: 'bg-success/10 text-success border-success/20',
      icon: 'CheckCircle'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-text-primary">Risk Thresholds</h2>
          <p className="text-sm font-body text-text-secondary mt-1">
            Set custom risk levels for different geological monitoring parameters
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" iconName="RotateCcw" iconPosition="left">
            Reset to Defaults
          </Button>
          <Button variant="secondary" iconName="Save" iconPosition="left">
            Save Configuration
          </Button>
        </div>
      </div>
      {/* Threshold Sliders */}
      <div className="space-y-6 mb-8">
        {thresholdConfigs?.map((config) => (
          <div key={config?.key} className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${config?.color}`}>
                  <Icon name={config?.icon} size={16} />
                </div>
                <div>
                  <h3 className="font-body font-semibold text-text-primary">{config?.label}</h3>
                  <p className="text-sm font-body text-text-secondary">{config?.description}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-heading font-bold text-text-primary">
                  {thresholds?.[config?.key]}
                </span>
                <span className="text-sm font-body text-text-secondary ml-1">{config?.unit}</span>
              </div>
            </div>
            
            <div className="relative">
              <input
                type="range"
                min={config?.min}
                max={config?.max}
                value={thresholds?.[config?.key]}
                onChange={(e) => handleThresholdChange(config?.key, parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${thresholds?.[config?.key]}%, var(--color-muted) ${thresholds?.[config?.key]}%, var(--color-muted) 100%)`
                }}
              />
              <div className="flex justify-between text-xs font-caption text-text-secondary mt-2">
                <span>Low Risk</span>
                <span>Medium Risk</span>
                <span>High Risk</span>
                <span>Critical</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Alert Type Configuration */}
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Alert Response Times</h3>
        <p className="text-sm font-body text-text-secondary mb-6">
          Configure how quickly different alert levels are delivered to your notification channels
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alertLevels?.map((level) => (
            <div key={level?.level} className={`p-4 border rounded-lg ${level?.color}`}>
              <div className="flex items-center space-x-3 mb-3">
                <Icon name={level?.icon} size={20} />
                <div>
                  <h4 className="font-body font-semibold">{level?.label}</h4>
                  <p className="text-sm opacity-80">{level?.description}</p>
                </div>
              </div>
              
              <Select
                options={alertTypeOptions}
                value={alertTypes?.[level?.level]}
                onChange={(value) => handleAlertTypeChange(level?.level, value)}
                className="mt-3"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="border-t border-border pt-6 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">Quick Actions</h3>
            <p className="text-sm font-body text-text-secondary mt-1">
              Apply predefined threshold configurations for different scenarios
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" iconName="Shield" iconPosition="left">
              Conservative Mode
            </Button>
            <Button variant="outline" iconName="Zap" iconPosition="left">
              Aggressive Mode
            </Button>
            <Button variant="outline" iconName="Target" iconPosition="left">
              Balanced Mode
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThresholdControls;