import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import MapView from './components/MapView';
import LiveDataPanel from './components/LiveDataPanel';
import AlertStatusCards from './components/AlertStatusCards';
import QuickActions from './components/QuickActions';
import FilterControls from './components/FilterControls';

const RealTimeDashboard = () => {
  const navigate = useNavigate();
  const [selectedStation, setSelectedStation] = useState(null);
  const [alertLevel, setAlertLevel] = useState('normal');
  const [filters, setFilters] = useState({});
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isConnected, setIsConnected] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate connection status changes
      setIsConnected(Math.random() > 0.1); // 90% uptime simulation
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    if (station?.riskLevel === 'high') {
      setAlertLevel('high');
    }
  };

  const handleAlertClick = (alert) => {
    console.log('Alert clicked:', alert);
    // Navigate to detailed alert view
    navigate('/alert-management', { state: { selectedAlert: alert } });
  };

  const handleEmergencyAction = (actionType, data) => {
    console.log('Emergency action:', actionType, data);
    
    switch (actionType) {
      case 'broadcast':
        // Simulate alert broadcast
        alert(`Broadcasting emergency alert for ${data?.location}`);
        break;
      case 'contact':
        // Simulate emergency contact
        alert(`Contacting emergency services for ${data?.location}`);
        break;
      case 'locate':
        // Focus map on location
        setSelectedStation(data);
        break;
      default:
        console.log('Unknown action type:', actionType);
    }
  };

  const handleActionExecute = (action) => {
    console.log('Action executed:', action);
    
    switch (action?.id) {
      case 'broadcast': alert('Emergency alert broadcasted to all users and vehicles');
        break;
      case 'emergency_contact': alert('Emergency services have been contacted');
        break;
      case 'vehicle_override': alert('Vehicle override commands sent successfully');
        break;
      case 'export_data':
        // Simulate data export
        const dataUrl = 'data:text/json;charset=utf-8,' + encodeURIComponent(
          JSON.stringify({
            timestamp: new Date()?.toISOString(),
            stations: ['ST001', 'ST002', 'ST003'],
            predictions: ['PRED001', 'PRED002', 'PRED003']
          })
        );
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `geological-data-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
        link?.click();
        break;
      default:
        alert(`${action?.name} executed successfully`);
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const getConnectionStatus = () => {
    if (!isConnected) {
      return {
        status: 'disconnected',
        color: 'var(--color-error)',
        text: 'Connection Lost'
      };
    }
    
    switch (alertLevel) {
      case 'high':
        return {
          status: 'alert',
          color: 'var(--color-error)',
          text: 'High Alert'
        };
      case 'medium':
        return {
          status: 'warning',
          color: 'var(--color-warning)',
          text: 'Medium Alert'
        };
      default:
        return {
          status: 'normal',
          color: 'var(--color-success)',
          text: 'All Systems Normal'
        };
    }
  };

  const connectionStatus = getConnectionStatus();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreadcrumbTrail />
      <main className="pt-4 pb-8">
        <div className="px-4 lg:px-6">
          {/* Dashboard Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Real-Time Dashboard
              </h1>
              <p className="text-lg font-body text-text-secondary">
                AI-powered geological monitoring and rockfall prediction system
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              {/* Connection Status */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-card border border-border rounded-lg">
                <div
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: connectionStatus?.color }}
                />
                <span className="text-sm font-body font-medium text-text-primary">
                  {connectionStatus?.text}
                </span>
              </div>
              
              {/* Last Update */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-card border border-border rounded-lg">
                <Icon name="RefreshCw" size={14} color="var(--color-text-secondary)" />
                <span className="text-sm font-body text-text-secondary">
                  Updated: {lastUpdate?.toLocaleTimeString()}
                </span>
              </div>
              
              {/* Quick Navigation */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="AlertTriangle"
                  iconPosition="left"
                  onClick={() => navigate('/alert-management')}
                >
                  Alerts
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="BarChart3"
                  iconPosition="left"
                  onClick={() => navigate('/geological-data-analysis')}
                >
                  Analysis
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="mb-6">
            <FilterControls
              onFiltersChange={handleFiltersChange}
              activeFilters={filters}
            />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Map and Data */}
            <div className="xl:col-span-2 space-y-6">
              {/* Interactive Map */}
              <div className="h-[500px]">
                <MapView
                  selectedStation={selectedStation}
                  onStationSelect={handleStationSelect}
                  alertLevel={alertLevel}
                />
              </div>
              
              {/* Live Data Panel */}
              <div className="h-[400px]">
                <LiveDataPanel />
              </div>
            </div>

            {/* Right Column - Alerts and Actions */}
            <div className="space-y-6">
              {/* Alert Status Cards */}
              <AlertStatusCards
                onAlertClick={handleAlertClick}
                onEmergencyAction={handleEmergencyAction}
              />
              
              {/* Quick Actions */}
              <QuickActions
                onActionExecute={handleActionExecute}
              />
            </div>
          </div>

          {/* System Status Footer */}
          <div className="mt-8 p-4 bg-card border border-border rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="flex items-center space-x-2">
                  <Icon name="Database" size={16} color="var(--color-success)" />
                  <span className="text-sm font-body text-text-secondary">
                    Data Stream: Active
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Wifi" size={16} color="var(--color-success)" />
                  <span className="text-sm font-body text-text-secondary">
                    WebSocket: Connected
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Brain" size={16} color="var(--color-primary)" />
                  <span className="text-sm font-body text-text-secondary">
                    AI Engine: Processing
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm font-body text-text-secondary">
                <Icon name="Clock" size={14} />
                <span>System Time: {new Date()?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RealTimeDashboard;