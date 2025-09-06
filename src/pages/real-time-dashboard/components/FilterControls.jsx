import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterControls = ({ onFiltersChange, activeFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    region: activeFilters?.region || 'all',
    alertType: activeFilters?.alertType || 'all',
    severity: activeFilters?.severity || 'all',
    timeRange: activeFilters?.timeRange || '24h',
    status: activeFilters?.status || 'all',
    confidence: activeFilters?.confidence || 'all'
  });

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'rocky_mountain', label: 'Rocky Mountain Area' },
    { value: 'canyon_ridge', label: 'Canyon Ridge Zone' },
    { value: 'valley_view', label: 'Valley View Sector' },
    { value: 'highland_peak', label: 'Highland Peak Region' }
  ];

  const alertTypeOptions = [
    { value: 'all', label: 'All Alert Types' },
    { value: 'rockfall', label: 'Rockfall' },
    { value: 'landslide', label: 'Landslide' },
    { value: 'debris_flow', label: 'Debris Flow' },
    { value: 'weather', label: 'Weather Alert' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'high', label: 'High Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'low', label: 'Low Risk' }
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'monitoring', label: 'Monitoring' },
    { value: 'watch', label: 'Watch' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const confidenceOptions = [
    { value: 'all', label: 'All Confidence Levels' },
    { value: 'high', label: 'High (80%+)' },
    { value: 'medium', label: 'Medium (50-79%)' },
    { value: 'low', label: 'Low (<50%)' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      region: 'all',
      alertType: 'all',
      severity: 'all',
      timeRange: '24h',
      status: 'all',
      confidence: 'all'
    };
    setLocalFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(localFilters)?.filter(value => value !== 'all')?.length;
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'var(--color-error)';
      case 'medium': return 'var(--color-warning)';
      case 'low': return 'var(--color-success)';
      default: return 'var(--color-text-secondary)';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} color="var(--color-primary)" />
            <h3 className="font-heading font-semibold text-lg text-text-primary">
              Filter Controls
            </h3>
            {getActiveFilterCount() > 0 && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-caption font-medium rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={resetFilters}
              disabled={getActiveFilterCount() === 0}
            >
              Reset
            </Button>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-muted rounded-md transition-colors duration-200"
            >
              <Icon
                name={isExpanded ? "ChevronUp" : "ChevronDown"}
                size={16}
                color="var(--color-text-secondary)"
              />
            </button>
          </div>
        </div>
      </div>
      {/* Quick Filter Buttons */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilterChange('severity', 'high')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body font-medium transition-colors duration-200 ${
              localFilters?.severity === 'high' ?'bg-error text-error-foreground' :'bg-error/10 text-error hover:bg-error/20'
            }`}
          >
            <Icon name="AlertTriangle" size={14} />
            <span>High Risk</span>
          </button>
          
          <button
            onClick={() => handleFilterChange('alertType', 'rockfall')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body font-medium transition-colors duration-200 ${
              localFilters?.alertType === 'rockfall' ?'bg-primary text-primary-foreground' :'bg-muted text-text-secondary hover:text-text-primary hover:bg-muted/80'
            }`}
          >
            <Icon name="Mountain" size={14} />
            <span>Rockfall</span>
          </button>
          
          <button
            onClick={() => handleFilterChange('status', 'active')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body font-medium transition-colors duration-200 ${
              localFilters?.status === 'active' ?'bg-success text-success-foreground' :'bg-success/10 text-success hover:bg-success/20'
            }`}
          >
            <Icon name="Activity" size={14} />
            <span>Active</span>
          </button>
          
          <button
            onClick={() => handleFilterChange('timeRange', '1h')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body font-medium transition-colors duration-200 ${
              localFilters?.timeRange === '1h' ?'bg-accent text-accent-foreground' :'bg-muted text-text-secondary hover:text-text-primary hover:bg-muted/80'
            }`}
          >
            <Icon name="Clock" size={14} />
            <span>Last Hour</span>
          </button>
        </div>
      </div>
      {/* Detailed Filters */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Geographic Region"
              options={regionOptions}
              value={localFilters?.region}
              onChange={(value) => handleFilterChange('region', value)}
              className="w-full"
            />
            
            <Select
              label="Alert Type"
              options={alertTypeOptions}
              value={localFilters?.alertType}
              onChange={(value) => handleFilterChange('alertType', value)}
              className="w-full"
            />
            
            <Select
              label="Severity Level"
              options={severityOptions}
              value={localFilters?.severity}
              onChange={(value) => handleFilterChange('severity', value)}
              className="w-full"
            />
            
            <Select
              label="Time Range"
              options={timeRangeOptions}
              value={localFilters?.timeRange}
              onChange={(value) => handleFilterChange('timeRange', value)}
              className="w-full"
            />
            
            <Select
              label="Status"
              options={statusOptions}
              value={localFilters?.status}
              onChange={(value) => handleFilterChange('status', value)}
              className="w-full"
            />
            
            <Select
              label="Confidence Level"
              options={confidenceOptions}
              value={localFilters?.confidence}
              onChange={(value) => handleFilterChange('confidence', value)}
              className="w-full"
            />
          </div>

          {/* Custom Time Range */}
          {localFilters?.timeRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          )}

          {/* Filter Summary */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Info" size={16} color="var(--color-text-secondary)" />
                <span className="text-sm font-body text-text-secondary">
                  {getActiveFilterCount() === 0 
                    ? 'No filters applied - showing all data'
                    : `${getActiveFilterCount()} filter${getActiveFilterCount() > 1 ? 's' : ''} applied`
                  }
                </span>
              </div>
              
              <div className="flex items-center space-x-1 px-2 py-1 bg-success/10 rounded-md">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs font-caption text-success font-medium">Auto-refresh</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;