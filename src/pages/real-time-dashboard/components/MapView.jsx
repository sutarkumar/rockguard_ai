import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MapView = ({ selectedStation, onStationSelect, alertLevel }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [zoomLevel, setZoomLevel] = useState(10);

  const monitoringStations = [
    {
      id: 'ST001',
      name: 'Rocky Mountain Station Alpha',
      lat: 40.7580,
      lng: -73.9855,
      status: 'active',
      riskLevel: 'high',
      confidence: 92,
      timeToImpact: '2.5 hours',
      lastUpdate: new Date(Date.now() - 300000)
    },
    {
      id: 'ST002',
      name: 'Canyon Ridge Monitor Beta',
      lat: 40.7282,
      lng: -74.0776,
      status: 'active',
      riskLevel: 'medium',
      confidence: 78,
      timeToImpact: '6.2 hours',
      lastUpdate: new Date(Date.now() - 180000)
    },
    {
      id: 'ST003',
      name: 'Valley View Sensor Gamma',
      lat: 40.7489,
      lng: -73.9680,
      status: 'active',
      riskLevel: 'low',
      confidence: 45,
      timeToImpact: '12+ hours',
      lastUpdate: new Date(Date.now() - 120000)
    },
    {
      id: 'ST004',
      name: 'Highland Peak Delta',
      lat: 40.7614,
      lng: -73.9776,
      status: 'maintenance',
      riskLevel: 'unknown',
      confidence: 0,
      timeToImpact: 'N/A',
      lastUpdate: new Date(Date.now() - 3600000)
    }
  ];

  const vehicles = [
    {
      id: 'VH001',
      name: 'Transport Unit Alpha',
      lat: 40.7505,
      lng: -73.9934,
      status: 'moving',
      speed: 45,
      route: 'Highway 101 North'
    },
    {
      id: 'VH002',
      name: 'Emergency Response Beta',
      lat: 40.7359,
      lng: -74.0014,
      status: 'stationary',
      speed: 0,
      route: 'Station Checkpoint'
    }
  ];

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return '#E53E3E';
      case 'medium': return '#D69E2E';
      case 'low': return '#38A169';
      default: return '#4A5568';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Activity';
      case 'maintenance': return 'Wrench';
      default: return 'AlertCircle';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Map" size={20} color="var(--color-primary)" />
            <h3 className="font-heading font-semibold text-lg text-text-primary">
              Geological Monitoring Map
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 px-2 py-1 bg-success/10 rounded-md">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs font-caption text-success font-medium">Live</span>
            </div>
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 1, 15))}
              className="p-1 hover:bg-muted rounded-md transition-colors duration-200"
            >
              <Icon name="ZoomIn" size={16} color="var(--color-text-secondary)" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 1, 5))}
              className="p-1 hover:bg-muted rounded-md transition-colors duration-200"
            >
              <Icon name="ZoomOut" size={16} color="var(--color-text-secondary)" />
            </button>
          </div>
        </div>
      </div>
      <div className="relative h-96 bg-muted">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Geological Monitoring Stations"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${zoomLevel}&output=embed`}
          className="rounded-b-lg"
        />

        {/* Station Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {monitoringStations?.map((station, index) => (
            <div
              key={station?.id}
              className="absolute pointer-events-auto"
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index * 10)}%`
              }}
            >
              <button
                onClick={() => onStationSelect(station)}
                className={`relative p-2 rounded-full border-2 transition-all duration-200 ${
                  selectedStation?.id === station?.id
                    ? 'bg-primary border-primary-foreground scale-110'
                    : 'bg-card border-border hover:scale-105'
                } shadow-lg`}
                style={{
                  borderColor: station?.status === 'active' ? getRiskColor(station?.riskLevel) : '#4A5568'
                }}
              >
                <Icon
                  name={getStatusIcon(station?.status)}
                  size={16}
                  color={selectedStation?.id === station?.id ? 'white' : getRiskColor(station?.riskLevel)}
                />
                
                {/* Risk Level Indicator */}
                {station?.status === 'active' && (
                  <div
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-card"
                    style={{ backgroundColor: getRiskColor(station?.riskLevel) }}
                  />
                )}
              </button>

              {/* Station Info Tooltip */}
              {selectedStation?.id === station?.id && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-popover border border-border rounded-lg shadow-modal p-3 z-10">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-body font-semibold text-sm text-text-primary">
                        {station?.name}
                      </h4>
                      <span className="text-xs font-caption text-text-secondary">
                        {station?.id}
                      </span>
                    </div>
                    
                    {station?.status === 'active' && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-caption text-text-secondary">Risk Level:</span>
                          <span
                            className="text-xs font-caption font-medium capitalize px-2 py-1 rounded-md"
                            style={{
                              backgroundColor: `${getRiskColor(station?.riskLevel)}20`,
                              color: getRiskColor(station?.riskLevel)
                            }}
                          >
                            {station?.riskLevel}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-caption text-text-secondary">Confidence:</span>
                          <span className="text-xs font-caption font-medium text-text-primary">
                            {station?.confidence}%
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-caption text-text-secondary">Time to Impact:</span>
                          <span className="text-xs font-caption font-medium text-text-primary">
                            {station?.timeToImpact}
                          </span>
                        </div>
                      </>
                    )}
                    
                    <div className="flex items-center justify-between pt-1 border-t border-border">
                      <span className="text-xs font-caption text-text-secondary">Last Update:</span>
                      <span className="text-xs font-caption text-text-primary">
                        {station?.lastUpdate?.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Vehicle Overlays */}
          {vehicles?.map((vehicle, index) => (
            <div
              key={vehicle?.id}
              className="absolute"
              style={{
                left: `${40 + (index * 20)}%`,
                top: `${60 + (index * 5)}%`
              }}
            >
              <div className="relative p-1 bg-accent rounded-full border-2 border-accent-foreground shadow-lg">
                <Icon
                  name={vehicle?.status === 'moving' ? 'Truck' : 'Square'}
                  size={12}
                  color="white"
                />
                
                {/* Movement Indicator */}
                {vehicle?.status === 'moving' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Map Legend */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-xs font-caption text-text-secondary">High Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-xs font-caption text-text-secondary">Medium Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-xs font-caption text-text-secondary">Low Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-xs font-caption text-text-secondary">Vehicles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;