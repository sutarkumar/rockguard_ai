import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ComparisonTools = () => {
  const [comparisonType, setComparisonType] = useState('correlation');
  const [selectedMetrics, setSelectedMetrics] = useState(['seismic', 'ground']);
  const [viewMode, setViewMode] = useState('overlay');

  const comparisonOptions = [
    { value: 'correlation', label: 'Correlation Analysis' },
    { value: 'trend', label: 'Trend Comparison' },
    { value: 'threshold', label: 'Threshold Analysis' },
    { value: 'prediction', label: 'Prediction vs Actual' }
  ];

  const metricOptions = [
    { value: 'seismic', label: 'Seismic Activity' },
    { value: 'ground', label: 'Ground Movement' },
    { value: 'weather', label: 'Weather Patterns' },
    { value: 'tilt', label: 'Tilt Measurements' },
    { value: 'strain', label: 'Strain Readings' }
  ];

  const viewModeOptions = [
    { value: 'overlay', label: 'Overlay View' },
    { value: 'split', label: 'Split View' },
    { value: 'scatter', label: 'Scatter Plot' }
  ];

  const correlationData = [
    { time: '00:00', seismic: 2.1, ground: 0.5, weather: 15, tilt: 0.2, strain: 1.8 },
    { time: '04:00', seismic: 2.4, ground: 0.7, weather: 13, tilt: 0.3, strain: 2.1 },
    { time: '08:00', seismic: 3.2, ground: 1.2, weather: 18, tilt: 0.5, strain: 2.8 },
    { time: '12:00', seismic: 2.8, ground: 0.9, weather: 22, tilt: 0.4, strain: 2.4 },
    { time: '16:00', seismic: 3.5, ground: 1.5, weather: 25, tilt: 0.6, strain: 3.1 },
    { time: '20:00', seismic: 2.9, ground: 1.1, weather: 20, tilt: 0.4, strain: 2.6 },
    { time: '24:00', seismic: 2.6, ground: 0.8, weather: 16, tilt: 0.3, strain: 2.2 }
  ];

  const scatterData = correlationData?.map(item => ({
    x: item?.seismic,
    y: item?.ground,
    time: item?.time
  }));

  const getMetricColor = (metric) => {
    const colors = {
      seismic: 'var(--color-primary)',
      ground: 'var(--color-secondary)',
      weather: 'var(--color-accent)',
      tilt: 'var(--color-success)',
      strain: 'var(--color-warning)'
    };
    return colors?.[metric] || 'var(--color-text-primary)';
  };

  const calculateCorrelation = (metric1, metric2) => {
    // Mock correlation calculation
    const correlations = {
      'seismic-ground': 0.87,
      'seismic-weather': -0.23,
      'seismic-tilt': 0.92,
      'seismic-strain': 0.78,
      'ground-weather': -0.15,
      'ground-tilt': 0.89,
      'ground-strain': 0.82
    };
    
    const key = `${metric1}-${metric2}`;
    return correlations?.[key] || correlations?.[`${metric2}-${metric1}`] || 0.45;
  };

  const renderChart = () => {
    if (viewMode === 'scatter' && selectedMetrics?.length >= 2) {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart data={scatterData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="x" 
              stroke="var(--color-text-secondary)"
              name={metricOptions?.find(m => m?.value === selectedMetrics?.[0])?.label}
            />
            <YAxis 
              dataKey="y" 
              stroke="var(--color-text-secondary)"
              name={metricOptions?.find(m => m?.value === selectedMetrics?.[1])?.label}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-card)', 
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
              formatter={(value, name) => [value, name]}
            />
            <Scatter 
              dataKey="y" 
              fill="var(--color-primary)"
              name="Correlation Points"
            />
          </ScatterChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={correlationData}>
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
          {selectedMetrics?.map((metric) => (
            <Line
              key={metric}
              type="monotone"
              dataKey={metric}
              stroke={getMetricColor(metric)}
              strokeWidth={2}
              name={metricOptions?.find(m => m?.value === metric)?.label}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderCorrelationMatrix = () => {
    if (selectedMetrics?.length < 2) return null;

    return (
      <div className="mt-6">
        <h4 className="text-md font-heading font-semibold text-text-primary mb-4">
          Correlation Matrix
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedMetrics?.map((metric1, i) => 
            selectedMetrics?.slice(i + 1)?.map((metric2) => {
              const correlation = calculateCorrelation(metric1, metric2);
              const isStrong = Math.abs(correlation) > 0.7;
              const isPositive = correlation > 0;
              
              return (
                <div 
                  key={`${metric1}-${metric2}`}
                  className={`p-4 rounded-lg border ${
                    isStrong 
                      ? isPositive 
                        ? 'bg-success/10 border-success/20' :'bg-destructive/10 border-destructive/20' :'bg-muted border-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={isPositive ? "TrendingUp" : "TrendingDown"} 
                        size={16} 
                        color={isStrong ? (isPositive ? 'var(--color-success)' : 'var(--color-destructive)') : 'var(--color-text-secondary)'}
                      />
                      <span className="text-sm font-body font-medium text-text-primary">
                        {metricOptions?.find(m => m?.value === metric1)?.label} × {metricOptions?.find(m => m?.value === metric2)?.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-lg font-heading font-bold ${
                      isStrong 
                        ? isPositive ? 'text-success' : 'text-destructive' :'text-text-secondary'
                    }`}>
                      {correlation?.toFixed(3)}
                    </span>
                    <span className="text-xs font-caption text-text-secondary">
                      {isStrong ? 'Strong' : Math.abs(correlation) > 0.3 ? 'Moderate' : 'Weak'}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-1">
            Comparison & Correlation Tools
          </h3>
          <p className="text-sm font-body text-text-secondary">
            Analyze relationships between different geological parameters
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <Select
            options={comparisonOptions}
            value={comparisonType}
            onChange={setComparisonType}
            placeholder="Analysis type"
            className="w-full sm:w-48"
          />
          
          <Select
            options={viewModeOptions}
            value={viewMode}
            onChange={setViewMode}
            placeholder="View mode"
            className="w-full sm:w-40"
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-body font-medium text-text-primary mb-3">
          Select Metrics to Compare
        </label>
        <div className="flex flex-wrap gap-2">
          {metricOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => {
                if (selectedMetrics?.includes(option?.value)) {
                  setSelectedMetrics(prev => prev?.filter(m => m !== option?.value));
                } else {
                  setSelectedMetrics(prev => [...prev, option?.value]);
                }
              }}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                selectedMetrics?.includes(option?.value)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-text-secondary border-border hover:border-primary/50'
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getMetricColor(option?.value) }}
              />
              <span className="text-sm font-body">{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-background rounded-lg p-4 mb-4">
        {renderChart()}
      </div>
      {renderCorrelationMatrix()}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Export Analysis
        </Button>
        
        <Button
          variant="outline"
          iconName="Share"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Share Results
        </Button>
        
        <Button
          variant="outline"
          iconName="FileText"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default ComparisonTools;