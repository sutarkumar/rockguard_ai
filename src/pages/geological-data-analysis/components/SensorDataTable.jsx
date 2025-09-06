import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SensorDataTable = () => {
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedRows, setSelectedRows] = useState([]);

  const sortOptions = [
    { value: 'timestamp', label: 'Timestamp' },
    { value: 'sensor', label: 'Sensor ID' },
    { value: 'location', label: 'Location' },
    { value: 'value', label: 'Reading Value' },
    { value: 'status', label: 'Status' }
  ];

  const sensorData = [
    {
      id: 'SEN-001',
      sensor: 'Seismic-Alpha-01',
      location: 'North Ridge Sector A',
      type: 'Seismic',
      value: 3.2,
      unit: 'magnitude',
      status: 'active',
      timestamp: '2025-01-06 06:45:23',
      quality: 'excellent',
      battery: 87
    },
    {
      id: 'SEN-002',
      sensor: 'Ground-Beta-02',
      location: 'East Slope Sector B',
      type: 'Ground Movement',
      value: 1.5,
      unit: 'mm',
      status: 'active',
      timestamp: '2025-01-06 06:44:18',
      quality: 'good',
      battery: 92
    },
    {
      id: 'SEN-003',
      sensor: 'Weather-Gamma-03',
      location: 'South Valley Sector C',
      type: 'Weather',
      value: 18.5,
      unit: '°C',
      status: 'active',
      timestamp: '2025-01-06 06:43:45',
      quality: 'excellent',
      battery: 78
    },
    {
      id: 'SEN-004',
      sensor: 'Tilt-Delta-04',
      location: 'West Canyon Sector D',
      type: 'Tilt Meter',
      value: 0.8,
      unit: 'degrees',
      status: 'warning',
      timestamp: '2025-01-06 06:42:12',
      quality: 'fair',
      battery: 45
    },
    {
      id: 'SEN-005',
      sensor: 'Strain-Echo-05',
      location: 'Highway 1 Corridor',
      type: 'Strain Gauge',
      value: 2.1,
      unit: 'microstrain',
      status: 'active',
      timestamp: '2025-01-06 06:41:33',
      quality: 'good',
      battery: 89
    },
    {
      id: 'SEN-006',
      sensor: 'Seismic-Foxtrot-06',
      location: 'Mining Zone Alpha',
      type: 'Seismic',
      value: 4.1,
      unit: 'magnitude',
      status: 'critical',
      timestamp: '2025-01-06 06:40:55',
      quality: 'excellent',
      battery: 91
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-destructive';
      case 'offline': return 'text-text-secondary';
      default: return 'text-text-primary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'AlertCircle';
      case 'offline': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'fair': return 'text-warning';
      case 'poor': return 'text-destructive';
      default: return 'text-text-secondary';
    }
  };

  const getBatteryColor = (battery) => {
    if (battery > 70) return 'text-success';
    if (battery > 30) return 'text-warning';
    return 'text-destructive';
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows(prev => 
      prev?.includes(id) 
        ? prev?.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows?.length === sensorData?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sensorData?.map(row => row?.id));
    }
  };

  const exportData = () => {
    const dataToExport = selectedRows?.length > 0 
      ? sensorData?.filter(row => selectedRows?.includes(row?.id))
      : sensorData;
    
    console.log('Exporting data:', dataToExport);
    // Mock export functionality
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-1">
            Sensor Data Readings
          </h3>
          <p className="text-sm font-body text-text-secondary">
            Detailed sensor readings with export capabilities
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
            className="w-full sm:w-40"
          />
          
          <Button
            variant="outline"
            onClick={exportData}
            iconName="Download"
            iconPosition="left"
            disabled={selectedRows?.length === 0}
            className="w-full sm:w-auto"
          >
            Export ({selectedRows?.length || sensorData?.length})
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2">
                <input
                  type="checkbox"
                  checked={selectedRows?.length === sensorData?.length}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th 
                className="text-left py-3 px-4 font-body font-semibold text-text-primary cursor-pointer hover:text-primary"
                onClick={() => handleSort('sensor')}
              >
                <div className="flex items-center space-x-1">
                  <span>Sensor</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-body font-semibold text-text-primary cursor-pointer hover:text-primary"
                onClick={() => handleSort('location')}
              >
                <div className="flex items-center space-x-1">
                  <span>Location</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left py-3 px-4 font-body font-semibold text-text-primary">
                Type
              </th>
              <th 
                className="text-left py-3 px-4 font-body font-semibold text-text-primary cursor-pointer hover:text-primary"
                onClick={() => handleSort('value')}
              >
                <div className="flex items-center space-x-1">
                  <span>Reading</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-body font-semibold text-text-primary cursor-pointer hover:text-primary"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left py-3 px-4 font-body font-semibold text-text-primary">
                Quality
              </th>
              <th className="text-left py-3 px-4 font-body font-semibold text-text-primary">
                Battery
              </th>
              <th 
                className="text-left py-3 px-4 font-body font-semibold text-text-primary cursor-pointer hover:text-primary"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center space-x-1">
                  <span>Last Update</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sensorData?.map((row) => (
              <tr 
                key={row?.id} 
                className={`border-b border-border hover:bg-muted/50 transition-colors ${
                  selectedRows?.includes(row?.id) ? 'bg-primary/5' : ''
                }`}
              >
                <td className="py-3 px-2">
                  <input
                    type="checkbox"
                    checked={selectedRows?.includes(row?.id)}
                    onChange={() => handleRowSelect(row?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="font-data text-sm text-text-primary font-medium">
                    {row?.sensor}
                  </div>
                  <div className="text-xs font-caption text-text-secondary">
                    {row?.id}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm font-body text-text-primary">
                    {row?.location}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-caption bg-muted text-text-secondary">
                    {row?.type}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="font-data text-sm text-text-primary font-medium">
                    {row?.value} {row?.unit}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className={`flex items-center space-x-1 ${getStatusColor(row?.status)}`}>
                    <Icon name={getStatusIcon(row?.status)} size={14} />
                    <span className="text-sm font-caption capitalize">{row?.status}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-sm font-caption capitalize ${getQualityColor(row?.quality)}`}>
                    {row?.quality}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className={`flex items-center space-x-1 ${getBatteryColor(row?.battery)}`}>
                    <Icon name="Battery" size={14} />
                    <span className="text-sm font-caption">{row?.battery}%</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm font-caption text-text-secondary">
                    {row?.timestamp}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="text-sm font-caption text-text-secondary">
          Showing {sensorData?.length} sensors • {selectedRows?.length} selected
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="ChevronLeft">
            Previous
          </Button>
          <span className="text-sm font-caption text-text-secondary px-3">
            Page 1 of 1
          </span>
          <Button variant="outline" size="sm" iconName="ChevronRight">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SensorDataTable;