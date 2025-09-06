import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const DataSourceIntegration = () => {
  const [selectedSource, setSelectedSource] = useState('all');

  const sourceOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'usgs', label: 'USGS Earthquake Hazards' },
    { value: 'noaa', label: 'NOAA Weather Service' },
    { value: 'local', label: 'Local Sensor Network' },
    { value: 'satellite', label: 'Satellite Imagery' },
    { value: 'third-party', label: 'Third-party APIs' }
  ];

  const dataSources = [
    {
      id: 'usgs-001',
      name: 'USGS Earthquake Hazards Program',
      type: 'Seismic Data',
      status: 'connected',
      lastSync: '2025-01-06 06:58:45',
      dataPoints: 15247,
      freshness: 'real-time',
      reliability: 99.8,
      apiEndpoint: 'https://earthquake.usgs.gov/fdsnws/event/1/',
      description: 'Real-time earthquake data and hazard information from the United States Geological Survey'
    },
    {
      id: 'noaa-002',
      name: 'NOAA Weather Service API',
      type: 'Weather Data',
      status: 'connected',
      lastSync: '2025-01-06 06:57:12',
      dataPoints: 8934,
      freshness: 'hourly',
      reliability: 98.5,
      apiEndpoint: 'https://api.weather.gov/points/',
      description: 'Weather conditions, forecasts, and severe weather alerts from National Weather Service'
    },
    {
      id: 'local-003',
      name: 'RockGuard Sensor Network',
      type: 'Multi-sensor',
      status: 'connected',
      lastSync: '2025-01-06 06:59:23',
      dataPoints: 45678,
      freshness: 'real-time',
      reliability: 97.2,
      apiEndpoint: 'Internal Network',
      description: 'Proprietary sensor network including seismic, ground movement, and environmental sensors'
    },
    {
      id: 'satellite-004',
      name: 'Sentinel-1 SAR Imagery',
      type: 'Satellite Data',
      status: 'warning',
      lastSync: '2025-01-06 04:15:33',
      dataPoints: 2156,
      freshness: 'daily',
      reliability: 94.1,
      apiEndpoint: 'https://scihub.copernicus.eu/dhus/',
      description: 'Synthetic Aperture Radar imagery for ground deformation monitoring'
    },
    {
      id: 'mining-005',
      name: 'Mining Operations Database',
      type: 'Industrial Data',
      status: 'connected',
      lastSync: '2025-01-06 06:45:18',
      dataPoints: 12890,
      freshness: 'real-time',
      reliability: 96.7,
      apiEndpoint: 'https://mining-api.example.com/v1/',
      description: 'Blasting schedules, equipment vibrations, and operational data from mining facilities'
    },
    {
      id: 'traffic-006',
      name: 'Highway Traffic Monitoring',
      type: 'Transportation',
      status: 'error',
      lastSync: '2025-01-05 18:22:41',
      dataPoints: 0,
      freshness: 'offline',
      reliability: 0,
      apiEndpoint: 'https://traffic.state.gov/api/v2/',
      description: 'Vehicle counts, speeds, and road conditions from highway monitoring systems'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-destructive';
      case 'offline': return 'text-text-secondary';
      default: return 'text-text-primary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      case 'offline': return 'Circle';
      default: return 'Circle';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'connected': return 'bg-success/10';
      case 'warning': return 'bg-warning/10';
      case 'error': return 'bg-destructive/10';
      case 'offline': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const getFreshnessColor = (freshness) => {
    switch (freshness) {
      case 'real-time': return 'text-success';
      case 'hourly': return 'text-primary';
      case 'daily': return 'text-warning';
      case 'offline': return 'text-destructive';
      default: return 'text-text-secondary';
    }
  };

  const getReliabilityColor = (reliability) => {
    if (reliability >= 98) return 'text-success';
    if (reliability >= 95) return 'text-primary';
    if (reliability >= 90) return 'text-warning';
    return 'text-destructive';
  };

  const filteredSources = selectedSource === 'all' 
    ? dataSources 
    : dataSources?.filter(source => source?.id?.startsWith(selectedSource));

  const testConnection = (sourceId) => {
    console.log('Testing connection for:', sourceId);
    // Mock connection test
  };

  const refreshData = (sourceId) => {
    console.log('Refreshing data for:', sourceId);
    // Mock data refresh
  };

  const configureSource = (sourceId) => {
    console.log('Configuring source:', sourceId);
    // Mock configuration
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-1">
            Data Source Integration
          </h3>
          <p className="text-sm font-body text-text-secondary">
            Monitor and manage external data source connections
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <Select
            options={sourceOptions}
            value={selectedSource}
            onChange={setSelectedSource}
            placeholder="Filter sources"
            className="w-full sm:w-48"
          />
          
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Refresh All
          </Button>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-success/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" />
            <span className="text-sm font-body font-medium text-success">Connected</span>
          </div>
          <p className="text-2xl font-heading font-bold text-success">
            {dataSources?.filter(s => s?.status === 'connected')?.length}
          </p>
        </div>

        <div className="bg-warning/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
            <span className="text-sm font-body font-medium text-warning">Warning</span>
          </div>
          <p className="text-2xl font-heading font-bold text-warning">
            {dataSources?.filter(s => s?.status === 'warning')?.length}
          </p>
        </div>

        <div className="bg-destructive/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="XCircle" size={16} color="var(--color-destructive)" />
            <span className="text-sm font-body font-medium text-destructive">Error</span>
          </div>
          <p className="text-2xl font-heading font-bold text-destructive">
            {dataSources?.filter(s => s?.status === 'error')?.length}
          </p>
        </div>

        <div className="bg-primary/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Database" size={16} color="var(--color-primary)" />
            <span className="text-sm font-body font-medium text-primary">Total Data Points</span>
          </div>
          <p className="text-2xl font-heading font-bold text-primary">
            {dataSources?.reduce((sum, s) => sum + s?.dataPoints, 0)?.toLocaleString()}
          </p>
        </div>
      </div>
      {/* Data Sources List */}
      <div className="space-y-4">
        {filteredSources?.map((source) => (
          <div key={source?.id} className={`rounded-lg border p-4 ${getStatusBg(source?.status)}`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`flex items-center space-x-2 ${getStatusColor(source?.status)}`}>
                    <Icon name={getStatusIcon(source?.status)} size={18} />
                    <span className="text-sm font-caption font-medium capitalize">
                      {source?.status}
                    </span>
                  </div>
                  
                  <div className="h-4 w-px bg-border" />
                  
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-caption bg-muted text-text-secondary">
                    {source?.type}
                  </span>
                </div>
                
                <h4 className="text-lg font-heading font-semibold text-text-primary mb-1">
                  {source?.name}
                </h4>
                
                <p className="text-sm font-body text-text-secondary mb-3">
                  {source?.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-caption text-text-secondary">Last Sync:</span>
                    <p className="font-data text-text-primary">{source?.lastSync}</p>
                  </div>
                  
                  <div>
                    <span className="font-caption text-text-secondary">Data Points:</span>
                    <p className="font-data text-text-primary">{source?.dataPoints?.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <span className="font-caption text-text-secondary">Freshness:</span>
                    <p className={`font-data capitalize ${getFreshnessColor(source?.freshness)}`}>
                      {source?.freshness}
                    </p>
                  </div>
                  
                  <div>
                    <span className="font-caption text-text-secondary">Reliability:</span>
                    <p className={`font-data ${getReliabilityColor(source?.reliability)}`}>
                      {source?.reliability}%
                    </p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <span className="font-caption text-text-secondary">API Endpoint:</span>
                  <p className="font-data text-xs text-text-primary break-all">
                    {source?.apiEndpoint}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0 lg:ml-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => testConnection(source?.id)}
                  iconName="Zap"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Test
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refreshData(source?.id)}
                  iconName="RefreshCw"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Refresh
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => configureSource(source?.id)}
                  iconName="Settings"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Configure
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-border">
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Add Data Source
        </Button>
        
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Export Configuration
        </Button>
        
        <Button
          variant="outline"
          iconName="FileText"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Integration Guide
        </Button>
      </div>
    </div>
  );
};

export default DataSourceIntegration;