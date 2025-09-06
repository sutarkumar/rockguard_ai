import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const StatisticalSummary = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('accuracy');

  const periodOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const metricOptions = [
    { value: 'accuracy', label: 'Prediction Accuracy' },
    { value: 'performance', label: 'System Performance' },
    { value: 'alerts', label: 'Alert Distribution' },
    { value: 'sensors', label: 'Sensor Health' }
  ];

  const accuracyData = [
    { name: 'Seismic Predictions', accuracy: 94.2, total: 1247, correct: 1175 },
    { name: 'Ground Movement', accuracy: 91.8, total: 892, correct: 819 },
    { name: 'Weather Impact', accuracy: 87.3, total: 1563, correct: 1364 },
    { name: 'Combined Analysis', accuracy: 96.1, total: 2341, correct: 2250 }
  ];

  const performanceData = [
    { name: 'Response Time', value: 1.2, unit: 'seconds', status: 'excellent' },
    { name: 'Data Processing', value: 99.7, unit: '%', status: 'excellent' },
    { name: 'System Uptime', value: 99.9, unit: '%', status: 'excellent' },
    { name: 'Alert Delivery', value: 98.4, unit: '%', status: 'good' }
  ];

  const alertDistribution = [
    { name: 'Low Risk', value: 156, color: 'var(--color-success)' },
    { name: 'Medium Risk', value: 89, color: 'var(--color-warning)' },
    { name: 'High Risk', value: 34, color: 'var(--color-accent)' },
    { name: 'Critical Risk', value: 12, color: 'var(--color-destructive)' }
  ];

  const sensorHealthData = [
    { name: 'Active', value: 87, color: 'var(--color-success)' },
    { name: 'Warning', value: 8, color: 'var(--color-warning)' },
    { name: 'Critical', value: 3, color: 'var(--color-destructive)' },
    { name: 'Offline', value: 2, color: 'var(--color-text-secondary)' }
  ];

  const keyMetrics = [
    {
      title: 'Overall Accuracy',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: 'Target',
      color: 'success'
    },
    {
      title: 'False Positive Rate',
      value: '2.1%',
      change: '-0.8%',
      trend: 'down',
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      title: 'Response Time',
      value: '1.2s',
      change: '-0.3s',
      trend: 'down',
      icon: 'Clock',
      color: 'primary'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: 'Activity',
      color: 'success'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'fair': return 'text-warning';
      case 'poor': return 'text-destructive';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return 'CheckCircle2';
      case 'good': return 'CheckCircle';
      case 'fair': return 'AlertCircle';
      case 'poor': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-destructive';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const renderChart = () => {
    switch (selectedMetric) {
      case 'accuracy':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
              <YAxis stroke="var(--color-text-secondary)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [`${value}%`, 'Accuracy']}
              />
              <Bar dataKey="accuracy" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'alerts':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={alertDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {alertDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'sensors':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sensorHealthData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {sensorHealthData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <div className="flex items-center justify-center h-64 text-text-secondary">
            <div className="text-center">
              <Icon name="BarChart3" size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-sm font-body">Select a metric to view detailed statistics</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-1">
            Statistical Summary
          </h3>
          <p className="text-sm font-body text-text-secondary">
            Key performance metrics and system statistics
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <Select
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            placeholder="Select period"
            className="w-full sm:w-40"
          />
          
          <Select
            options={metricOptions}
            value={selectedMetric}
            onChange={setSelectedMetric}
            placeholder="Select metric"
            className="w-full sm:w-48"
          />
        </div>
      </div>
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {keyMetrics?.map((metric, index) => (
          <div key={index} className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <Icon name={metric?.icon} size={20} color={`var(--color-${metric?.color})`} />
              <div className={`flex items-center space-x-1 ${getTrendColor(metric?.trend)}`}>
                <Icon name={getTrendIcon(metric?.trend)} size={14} />
                <span className="text-xs font-caption">{metric?.change}</span>
              </div>
            </div>
            <div className="mb-1">
              <span className="text-2xl font-heading font-bold text-text-primary">
                {metric?.value}
              </span>
            </div>
            <p className="text-sm font-body text-text-secondary">
              {metric?.title}
            </p>
          </div>
        ))}
      </div>
      {/* Chart Section */}
      <div className="bg-background rounded-lg p-4 mb-6">
        {renderChart()}
      </div>
      {/* Performance Details */}
      {selectedMetric === 'performance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {performanceData?.map((item, index) => (
            <div key={index} className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-body font-medium text-text-primary">
                  {item?.name}
                </span>
                <div className={`flex items-center space-x-1 ${getStatusColor(item?.status)}`}>
                  <Icon name={getStatusIcon(item?.status)} size={16} />
                  <span className="text-xs font-caption capitalize">{item?.status}</span>
                </div>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-xl font-heading font-bold text-text-primary">
                  {item?.value}
                </span>
                <span className="text-sm font-caption text-text-secondary">
                  {item?.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Accuracy Details */}
      {selectedMetric === 'accuracy' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-body font-semibold text-text-primary">
                  Prediction Type
                </th>
                <th className="text-left py-3 px-4 font-body font-semibold text-text-primary">
                  Accuracy
                </th>
                <th className="text-left py-3 px-4 font-body font-semibold text-text-primary">
                  Total Predictions
                </th>
                <th className="text-left py-3 px-4 font-body font-semibold text-text-primary">
                  Correct Predictions
                </th>
              </tr>
            </thead>
            <tbody>
              {accuracyData?.map((row, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 text-sm font-body text-text-primary">
                    {row?.name}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-data font-medium text-success">
                      {row?.accuracy}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-data text-text-primary">
                    {row?.total?.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm font-data text-text-primary">
                    {row?.correct?.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Export Report
        </Button>
        
        <Button
          variant="outline"
          iconName="RefreshCw"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Refresh Data
        </Button>
        
        <Button
          variant="outline"
          iconName="Settings"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Configure Metrics
        </Button>
      </div>
    </div>
  );
};

export default StatisticalSummary;