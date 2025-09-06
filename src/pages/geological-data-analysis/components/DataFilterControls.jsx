import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const DataFilterControls = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    sensorType: 'all',
    location: 'all',
    dateRange: 'custom',
    startDate: '2025-01-01',
    endDate: '2025-01-06',
    threshold: 'medium'
  });

  const sensorTypeOptions = [
    { value: 'all', label: 'All Sensors' },
    { value: 'seismic', label: 'Seismic Sensors' },
    { value: 'ground', label: 'Ground Movement' },
    { value: 'weather', label: 'Weather Stations' },
    { value: 'tilt', label: 'Tilt Meters' },
    { value: 'strain', label: 'Strain Gauges' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'sector-a', label: 'Sector A - North Ridge' },
    { value: 'sector-b', label: 'Sector B - East Slope' },
    { value: 'sector-c', label: 'Sector C - South Valley' },
    { value: 'sector-d', label: 'Sector D - West Canyon' },
    { value: 'highway-1', label: 'Highway 1 Corridor' },
    { value: 'mining-zone', label: 'Mining Zone Alpha' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const thresholdOptions = [
    { value: 'low', label: 'Low Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'high', label: 'High Risk' },
    { value: 'critical', label: 'Critical Risk' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      sensorType: 'all',
      location: 'all',
      dateRange: 'last-7-days',
      startDate: '',
      endDate: '',
      threshold: 'medium'
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const applyFilters = () => {
    onFiltersChange?.(filters);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-1">
            Data Filters
          </h3>
          <p className="text-sm font-body text-text-secondary">
            Customize your data analysis parameters
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={resetFilters}
          iconName="RotateCcw"
          iconPosition="left"
          size="sm"
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Select
          label="Sensor Type"
          options={sensorTypeOptions}
          value={filters?.sensorType}
          onChange={(value) => handleFilterChange('sensorType', value)}
          className="w-full"
        />

        <Select
          label="Location"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => handleFilterChange('location', value)}
          className="w-full"
        />

        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
          className="w-full"
        />
      </div>
      {filters?.dateRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            label="Start Date"
            type="date"
            value={filters?.startDate}
            onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
          />
          
          <Input
            label="End Date"
            type="date"
            value={filters?.endDate}
            onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Select
          label="Risk Threshold"
          options={thresholdOptions}
          value={filters?.threshold}
          onChange={(value) => handleFilterChange('threshold', value)}
          className="w-full"
        />

        <div className="flex items-end">
          <Button
            variant="default"
            onClick={applyFilters}
            iconName="Filter"
            iconPosition="left"
            className="w-full"
          >
            Apply Filters
          </Button>
        </div>
      </div>
      <div className="border-t border-border pt-4">
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
            <Icon name="Layers" size={14} color="var(--color-primary)" />
            <span className="text-sm font-caption text-primary">
              {sensorTypeOptions?.find(opt => opt?.value === filters?.sensorType)?.label}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 bg-secondary/10 px-3 py-1 rounded-full">
            <Icon name="MapPin" size={14} color="var(--color-secondary)" />
            <span className="text-sm font-caption text-secondary">
              {locationOptions?.find(opt => opt?.value === filters?.location)?.label}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 bg-accent/10 px-3 py-1 rounded-full">
            <Icon name="Calendar" size={14} color="var(--color-accent)" />
            <span className="text-sm font-caption text-accent">
              {dateRangeOptions?.find(opt => opt?.value === filters?.dateRange)?.label}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 bg-warning/10 px-3 py-1 rounded-full">
            <Icon name="AlertTriangle" size={14} color="var(--color-warning)" />
            <span className="text-sm font-caption text-warning">
              {thresholdOptions?.find(opt => opt?.value === filters?.threshold)?.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFilterControls;