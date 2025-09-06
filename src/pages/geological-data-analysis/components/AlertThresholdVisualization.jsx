import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const AlertThresholdVisualization = () => {
  const [selectedParameter, setSelectedParameter] = useState('seismic');
  const [thresholds, setThresholds] = useState({
    seismic: { low: 2.0, medium: 3.0, high: 4.0, critical: 5.0 },
    ground: { low: 0.5, medium: 1.0, high: 2.0, critical: 3.0 },
    weather: { low: 10, medium: 20, high: 30, critical: 40 },
    tilt: { low: 0.2, medium: 0.5, high: 1.0, critical: 1.5 }
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const parameterOptions = [
    { value: 'seismic', label: 'Seismic Activity (Magnitude)' },
    { value: 'ground', label: 'Ground Movement (mm)' },
    { value: 'weather', label: 'Weather Impact Score' },
    { value: 'tilt', label: 'Tilt Angle (degrees)' }
  ];

  const historicalData = [
    { time: '00:00', seismic: 2.1, ground: 0.5, weather: 15, tilt: 0.2 },
    { time: '02:00', seismic: 2.3, ground: 0.6, weather: 12, tilt: 0.25 },
    { time: '04:00', seismic: 2.8, ground: 0.9, weather: 18, tilt: 0.4 },
    { time: '06:00', seismic: 3.1, ground: 1.2, weather: 22, tilt: 0.5 },
    { time: '08:00', seismic: 3.5, ground: 1.5, weather: 25, tilt: 0.6 },
    { time: '10:00', seismic: 4.2, ground: 2.1, weather: 28, tilt: 0.8 },
    { time: '12:00', seismic: 3.8, ground: 1.8, weather: 24, tilt: 0.7 },
    { time: '14:00', seismic: 3.2, ground: 1.3, weather: 20, tilt: 0.5 },
    { time: '16:00', seismic: 2.9, ground: 1.0, weather: 16, tilt: 0.4 },
    { time: '18:00', seismic: 2.6, ground: 0.8, weather: 14, tilt: 0.3 },
    { time: '20:00', seismic: 2.4, ground: 0.7, weather: 12, tilt: 0.25 },
    { time: '22:00', seismic: 2.2, ground: 0.6, weather: 10, tilt: 0.2 }
  ];

  const getThresholdColor = (level) => {
    const colors = {
      low: 'var(--color-success)',
      medium: 'var(--color-warning)',
      high: 'var(--color-accent)',
      critical: 'var(--color-destructive)'
    };
    return colors?.[level];
  };

  const getParameterUnit = (param) => {
    const units = {
      seismic: 'magnitude',
      ground: 'mm',
      weather: 'score',
      tilt: 'degrees'
    };
    return units?.[param] || '';
  };

  const handleThresholdChange = (level, value) => {
    setThresholds(prev => ({
      ...prev,
      [selectedParameter]: {
        ...prev?.[selectedParameter],
        [level]: parseFloat(value) || 0
      }
    }));
  };

  const saveThresholds = () => {
    setIsEditMode(false);
    // Mock save functionality
    console.log('Saving thresholds:', thresholds);
  };

  const resetThresholds = () => {
    const defaultThresholds = {
      seismic: { low: 2.0, medium: 3.0, high: 4.0, critical: 5.0 },
      ground: { low: 0.5, medium: 1.0, high: 2.0, critical: 3.0 },
      weather: { low: 10, medium: 20, high: 30, critical: 40 },
      tilt: { low: 0.2, medium: 0.5, high: 1.0, critical: 1.5 }
    };
    setThresholds(defaultThresholds);
  };

  const currentThresholds = thresholds?.[selectedParameter];

  const getAlertCount = (level) => {
    // Mock alert count calculation
    const counts = {
      seismic: { low: 12, medium: 8, high: 3, critical: 1 },
      ground: { low: 15, medium: 6, high: 2, critical: 0 },
      weather: { low: 18, medium: 4, high: 1, critical: 0 },
      tilt: { low: 10, medium: 7, high: 4, critical: 2 }
    };
    return counts?.[selectedParameter]?.[level] || 0;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-1">
            Alert Threshold Visualization
          </h3>
          <p className="text-sm font-body text-text-secondary">
            Configure and visualize alert thresholds for geological parameters
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <Select
            options={parameterOptions}
            value={selectedParameter}
            onChange={setSelectedParameter}
            placeholder="Select parameter"
            className="w-full sm:w-64"
          />
          
          <Button
            variant={isEditMode ? "default" : "outline"}
            onClick={() => setIsEditMode(!isEditMode)}
            iconName="Settings"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            {isEditMode ? 'View Mode' : 'Edit Thresholds'}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <div className="bg-background rounded-lg p-4">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="time" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                
                {/* Threshold Lines */}
                <ReferenceLine 
                  y={currentThresholds?.low} 
                  stroke={getThresholdColor('low')} 
                  strokeDasharray="5 5"
                  label={{ value: "Low", position: "insideTopRight" }}
                />
                <ReferenceLine 
                  y={currentThresholds?.medium} 
                  stroke={getThresholdColor('medium')} 
                  strokeDasharray="5 5"
                  label={{ value: "Medium", position: "insideTopRight" }}
                />
                <ReferenceLine 
                  y={currentThresholds?.high} 
                  stroke={getThresholdColor('high')} 
                  strokeDasharray="5 5"
                  label={{ value: "High", position: "insideTopRight" }}
                />
                <ReferenceLine 
                  y={currentThresholds?.critical} 
                  stroke={getThresholdColor('critical')} 
                  strokeDasharray="5 5"
                  label={{ value: "Critical", position: "insideTopRight" }}
                />
                
                {/* Data Line */}
                <Line 
                  type="monotone" 
                  dataKey={selectedParameter} 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  name={`${parameterOptions?.find(p => p?.value === selectedParameter)?.label}`}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threshold Configuration */}
        <div className="space-y-4">
          <div className="bg-background rounded-lg p-4">
            <h4 className="text-md font-heading font-semibold text-text-primary mb-4">
              Threshold Settings
            </h4>
            
            {Object.entries(currentThresholds)?.map(([level, value]) => (
              <div key={level} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: getThresholdColor(level) }}
                    />
                    <span className="text-sm font-body font-medium text-text-primary capitalize">
                      {level} Alert
                    </span>
                  </div>
                  <span className="text-xs font-caption text-text-secondary">
                    {getAlertCount(level)} alerts
                  </span>
                </div>
                
                {isEditMode ? (
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) => handleThresholdChange(level, e?.target?.value)}
                    placeholder={`${level} threshold`}
                    step="0.1"
                    className="w-full"
                  />
                ) : (
                  <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <span className="font-data text-sm text-text-primary">
                      {value} {getParameterUnit(selectedParameter)}
                    </span>
                  </div>
                )}
              </div>
            ))}
            
            {isEditMode && (
              <div className="flex flex-col gap-2 mt-6">
                <Button
                  variant="default"
                  onClick={saveThresholds}
                  iconName="Save"
                  iconPosition="left"
                  className="w-full"
                >
                  Save Changes
                </Button>
                
                <Button
                  variant="outline"
                  onClick={resetThresholds}
                  iconName="RotateCcw"
                  iconPosition="left"
                  className="w-full"
                >
                  Reset to Default
                </Button>
              </div>
            )}
          </div>

          {/* Alert Statistics */}
          <div className="bg-background rounded-lg p-4">
            <h4 className="text-md font-heading font-semibold text-text-primary mb-4">
              Alert Statistics (24h)
            </h4>
            
            <div className="space-y-3">
              {Object.entries(currentThresholds)?.map(([level, value]) => {
                const count = getAlertCount(level);
                return (
                  <div key={level} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: getThresholdColor(level) }}
                      />
                      <span className="text-sm font-body text-text-secondary capitalize">
                        {level}
                      </span>
                    </div>
                    <span className="text-sm font-data font-medium text-text-primary">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-body font-medium text-text-primary">
                  Total Alerts
                </span>
                <span className="text-lg font-heading font-bold text-primary">
                  {Object.values(currentThresholds)?.reduce((sum, level) => sum + getAlertCount(level), 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertThresholdVisualization;