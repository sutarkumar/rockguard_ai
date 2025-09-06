import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LiveDataPanel = () => {
  const [selectedMetric, setSelectedMetric] = useState('seismic');
  const [dataPoints, setDataPoints] = useState([]);

  const metrics = [
    {
      id: 'seismic',
      name: 'Seismic Activity',
      icon: 'Activity',
      unit: 'Richter',
      current: 2.3,
      threshold: 4.0,
      status: 'normal',
      trend: 'stable'
    },
    {
      id: 'weather',
      name: 'Weather Conditions',
      icon: 'Cloud',
      unit: 'mm/h',
      current: 12.5,
      threshold: 25.0,
      status: 'normal',
      trend: 'increasing'
    },
    {
      id: 'ground',
      name: 'Ground Movement',
      icon: 'Move',
      unit: 'mm/day',
      current: 0.8,
      threshold: 2.0,
      status: 'normal',
      trend: 'stable'
    },
    {
      id: 'temperature',
      name: 'Rock Temperature',
      icon: 'Thermometer',
      unit: '°C',
      current: 18.2,
      threshold: 35.0,
      status: 'normal',
      trend: 'decreasing'
    }
  ];

  const sensorReadings = [
    {
      id: 'SENS001',
      name: 'Accelerometer Alpha',
      value: '0.02 g',
      status: 'active',
      lastReading: new Date(Date.now() - 30000)
    },
    {
      id: 'SENS002',
      name: 'Strain Gauge Beta',
      value: '145 µε',
      status: 'active',
      lastReading: new Date(Date.now() - 45000)
    },
    {
      id: 'SENS003',
      name: 'Tiltmeter Gamma',
      value: '0.001°',
      status: 'active',
      lastReading: new Date(Date.now() - 60000)
    },
    {
      id: 'SENS004',
      name: 'Weather Station Delta',
      value: '12.5 mm/h',
      status: 'warning',
      lastReading: new Date(Date.now() - 90000)
    }
  ];

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      const newDataPoint = {
        timestamp: new Date(),
        value: Math.random() * 5 + (selectedMetric === 'seismic' ? 1 : 10)
      };
      
      setDataPoints(prev => {
        const updated = [...prev, newDataPoint];
        return updated?.slice(-20); // Keep last 20 points
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedMetric]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'var(--color-success)';
      case 'warning': return 'var(--color-warning)';
      case 'critical': return 'var(--color-error)';
      default: return 'var(--color-text-secondary)';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return 'TrendingUp';
      case 'decreasing': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const selectedMetricData = metrics?.find(m => m?.id === selectedMetric);

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={20} color="var(--color-primary)" />
            <h3 className="font-heading font-semibold text-lg text-text-primary">
              Live Data Streams
            </h3>
          </div>
          <div className="flex items-center space-x-1 px-2 py-1 bg-success/10 rounded-md">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs font-caption text-success font-medium">Streaming</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {/* Metric Selection Tabs */}
        <div className="flex flex-wrap gap-2">
          {metrics?.map((metric) => (
            <button
              key={metric?.id}
              onClick={() => setSelectedMetric(metric?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body font-medium transition-colors duration-200 ${
                selectedMetric === metric?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-muted/80'
              }`}
            >
              <Icon name={metric?.icon} size={14} />
              <span>{metric?.name}</span>
            </button>
          ))}
        </div>

        {/* Current Metric Display */}
        {selectedMetricData && (
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name={selectedMetricData?.icon} size={18} color="var(--color-primary)" />
                <h4 className="font-body font-semibold text-text-primary">
                  {selectedMetricData?.name}
                </h4>
              </div>
              <div className="flex items-center space-x-1">
                <Icon
                  name={getTrendIcon(selectedMetricData?.trend)}
                  size={14}
                  color={getStatusColor(selectedMetricData?.status)}
                />
                <span
                  className="text-xs font-caption font-medium capitalize"
                  style={{ color: getStatusColor(selectedMetricData?.status) }}
                >
                  {selectedMetricData?.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="text-xs font-caption text-text-secondary">Current</span>
                <div className="text-lg font-heading font-bold text-text-primary">
                  {selectedMetricData?.current} {selectedMetricData?.unit}
                </div>
              </div>
              <div>
                <span className="text-xs font-caption text-text-secondary">Threshold</span>
                <div className="text-lg font-heading font-bold text-text-primary">
                  {selectedMetricData?.threshold} {selectedMetricData?.unit}
                </div>
              </div>
              <div>
                <span className="text-xs font-caption text-text-secondary">Progress</span>
                <div className="mt-1">
                  <div className="w-full bg-background rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((selectedMetricData?.current / selectedMetricData?.threshold) * 100, 100)}%`,
                        backgroundColor: getStatusColor(selectedMetricData?.status)
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mini Chart Visualization */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-body font-medium text-text-primary">Trend Graph</h5>
            <span className="text-xs font-caption text-text-secondary">Last 20 readings</span>
          </div>
          
          <div className="h-24 bg-background rounded-md p-2 relative overflow-hidden">
            {dataPoints?.length > 0 && (
              <svg className="w-full h-full">
                <polyline
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  points={dataPoints?.map((point, index) => {
                    const x = (index / (dataPoints?.length - 1)) * 100;
                    const y = 100 - ((point?.value / (selectedMetricData?.threshold || 10)) * 80);
                    return `${x},${y}`;
                  })?.join(' ')}
                />
                
                {/* Data points */}
                {dataPoints?.map((point, index) => {
                  const x = (index / (dataPoints?.length - 1)) * 100;
                  const y = 100 - ((point?.value / (selectedMetricData?.threshold || 10)) * 80);
                  return (
                    <circle
                      key={index}
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="2"
                      fill="var(--color-primary)"
                    />
                  );
                })}
              </svg>
            )}
            
            {dataPoints?.length === 0 && (
              <div className="flex items-center justify-center h-full text-text-secondary">
                <span className="text-sm font-caption">Waiting for data...</span>
              </div>
            )}
          </div>
        </div>

        {/* Sensor Readings */}
        <div>
          <h5 className="font-body font-medium text-text-primary mb-3">Sensor Readings</h5>
          <div className="space-y-2">
            {sensorReadings?.map((sensor) => (
              <div
                key={sensor?.id}
                className="flex items-center justify-between p-3 bg-muted rounded-md"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getStatusColor(sensor?.status) }}
                  />
                  <div>
                    <div className="text-sm font-body font-medium text-text-primary">
                      {sensor?.name}
                    </div>
                    <div className="text-xs font-caption text-text-secondary">
                      {sensor?.id}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-body font-medium text-text-primary">
                    {sensor?.value}
                  </div>
                  <div className="text-xs font-caption text-text-secondary">
                    {Math.floor((Date.now() - sensor?.lastReading?.getTime()) / 1000)}s ago
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDataPanel;