import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const DataVisualizationPanel = () => {
  const [selectedChart, setSelectedChart] = useState('seismic');
  const [timeRange, setTimeRange] = useState('24h');
  const [showPredictions, setShowPredictions] = useState(true);

  const chartOptions = [
    { value: 'seismic', label: 'Seismic Activity' },
    { value: 'ground', label: 'Ground Movement' },
    { value: 'weather', label: 'Weather Patterns' },
    { value: 'combined', label: 'Combined Analysis' }
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const seismicData = [
    { time: '00:00', magnitude: 2.1, prediction: 2.3, confidence: 0.85 },
    { time: '04:00', magnitude: 2.4, prediction: 2.5, confidence: 0.82 },
    { time: '08:00', magnitude: 3.2, prediction: 3.1, confidence: 0.88 },
    { time: '12:00', magnitude: 2.8, prediction: 2.9, confidence: 0.86 },
    { time: '16:00', magnitude: 3.5, prediction: 3.4, confidence: 0.91 },
    { time: '20:00', magnitude: 2.9, prediction: 3.0, confidence: 0.84 },
    { time: '24:00', magnitude: 2.6, prediction: 2.7, confidence: 0.87 }
  ];

  const groundMovementData = [
    { time: '00:00', displacement: 0.5, velocity: 0.02, acceleration: 0.001 },
    { time: '04:00', displacement: 0.7, velocity: 0.03, acceleration: 0.002 },
    { time: '08:00', displacement: 1.2, velocity: 0.05, acceleration: 0.004 },
    { time: '12:00', displacement: 0.9, velocity: 0.04, acceleration: 0.003 },
    { time: '16:00', displacement: 1.5, velocity: 0.06, acceleration: 0.005 },
    { time: '20:00', displacement: 1.1, velocity: 0.04, acceleration: 0.003 },
    { time: '24:00', displacement: 0.8, velocity: 0.03, acceleration: 0.002 }
  ];

  const weatherData = [
    { time: '00:00', temperature: 15, humidity: 65, precipitation: 0, windSpeed: 12 },
    { time: '04:00', temperature: 13, humidity: 72, precipitation: 2, windSpeed: 15 },
    { time: '08:00', temperature: 18, humidity: 58, precipitation: 0, windSpeed: 8 },
    { time: '12:00', temperature: 22, humidity: 45, precipitation: 0, windSpeed: 10 },
    { time: '16:00', temperature: 25, humidity: 40, precipitation: 0, windSpeed: 6 },
    { time: '20:00', temperature: 20, humidity: 55, precipitation: 1, windSpeed: 9 },
    { time: '24:00', temperature: 16, humidity: 68, precipitation: 3, windSpeed: 14 }
  ];

  const renderChart = () => {
    switch (selectedChart) {
      case 'seismic':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={seismicData}>
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
              <Line 
                type="monotone" 
                dataKey="magnitude" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                name="Actual Magnitude"
              />
              {showPredictions && (
                <Line 
                  type="monotone" 
                  dataKey="prediction" 
                  stroke="var(--color-accent)" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="AI Prediction"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'ground':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={groundMovementData}>
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
              <Area 
                type="monotone" 
                dataKey="displacement" 
                stackId="1"
                stroke="var(--color-secondary)" 
                fill="var(--color-secondary)"
                fillOpacity={0.6}
                name="Displacement (mm)"
              />
              <Area 
                type="monotone" 
                dataKey="velocity" 
                stackId="2"
                stroke="var(--color-success)" 
                fill="var(--color-success)"
                fillOpacity={0.6}
                name="Velocity (mm/s)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'weather':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={weatherData}>
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
              <Bar dataKey="temperature" fill="var(--color-accent)" name="Temperature (°C)" />
              <Bar dataKey="precipitation" fill="var(--color-primary)" name="Precipitation (mm)" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={seismicData}>
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
              <Line 
                type="monotone" 
                dataKey="magnitude" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                name="Combined Risk Score"
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-text-primary mb-2">
            Data Visualization
          </h2>
          <p className="text-sm font-body text-text-secondary">
            Interactive analysis of geological sensor data and AI predictions
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <Select
            options={chartOptions}
            value={selectedChart}
            onChange={setSelectedChart}
            placeholder="Select chart type"
            className="w-full sm:w-48"
          />
          
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            placeholder="Select time range"
            className="w-full sm:w-40"
          />
          
          <Button
            variant={showPredictions ? "default" : "outline"}
            onClick={() => setShowPredictions(!showPredictions)}
            iconName="TrendingUp"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            AI Predictions
          </Button>
        </div>
      </div>

      <div className="bg-background rounded-lg p-4 mb-4">
        {renderChart()}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-success/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} color="var(--color-success)" />
            <span className="text-sm font-body font-medium text-success">Prediction Accuracy</span>
          </div>
          <p className="text-2xl font-heading font-bold text-success">94.2%</p>
          <p className="text-xs font-caption text-success/80">Last 30 days</p>
        </div>

        <div className="bg-warning/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
            <span className="text-sm font-body font-medium text-warning">False Positives</span>
          </div>
          <p className="text-2xl font-heading font-bold text-warning">2.1%</p>
          <p className="text-xs font-caption text-warning/80">Within threshold</p>
        </div>

        <div className="bg-primary/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size={16} color="var(--color-primary)" />
            <span className="text-sm font-body font-medium text-primary">Data Points</span>
          </div>
          <p className="text-2xl font-heading font-bold text-primary">15.7K</p>
          <p className="text-xs font-caption text-primary/80">Last 24 hours</p>
        </div>
      </div>
    </div>
  );
};

export default DataVisualizationPanel;