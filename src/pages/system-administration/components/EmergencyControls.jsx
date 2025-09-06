import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const EmergencyControls = () => {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [selectedZones, setSelectedZones] = useState([]);
  const [alertLevel, setAlertLevel] = useState('critical');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const monitoringZones = [
    { id: 'zone-1', name: 'Highway 101 North', status: 'active', vehicles: 45, lastAlert: '2 hours ago' },
    { id: 'zone-2', name: 'Mountain Pass Route 7', status: 'active', vehicles: 23, lastAlert: '30 minutes ago' },
    { id: 'zone-3', name: 'Coastal Highway 1', status: 'maintenance', vehicles: 0, lastAlert: '1 day ago' },
    { id: 'zone-4', name: 'Interstate 5 Canyon', status: 'active', vehicles: 67, lastAlert: '4 hours ago' },
    { id: 'zone-5', name: 'State Route 99', status: 'active', vehicles: 34, lastAlert: '1 hour ago' },
    { id: 'zone-6', name: 'Forest Service Road 12', status: 'disabled', vehicles: 0, lastAlert: '3 days ago' }
  ];

  const alertLevelOptions = [
    { value: 'critical', label: 'Critical - Immediate Action Required' },
    { value: 'high', label: 'High - Urgent Attention Needed' },
    { value: 'medium', label: 'Medium - Caution Advised' },
    { value: 'info', label: 'Information - General Notice' }
  ];

  const emergencyTemplates = [
    {
      id: 'rockfall-imminent',
      title: 'Imminent Rockfall Danger',
      message: 'EMERGENCY: Imminent rockfall detected in your area. Evacuate immediately and avoid the designated zone until further notice.'
    },
    {
      id: 'road-closure',
      title: 'Emergency Road Closure',
      message: 'ALERT: Road closure in effect due to geological hazard. Seek alternate routes immediately. Emergency services are responding.'
    },
    {
      id: 'system-maintenance',
      title: 'System Maintenance Mode',
      message: 'NOTICE: Geological monitoring system entering maintenance mode. Manual monitoring protocols are now in effect.'
    }
  ];

  const handleZoneSelection = (zoneId, checked) => {
    if (checked) {
      setSelectedZones([...selectedZones, zoneId]);
    } else {
      setSelectedZones(selectedZones?.filter(id => id !== zoneId));
    }
  };

  const handleSelectAllZones = (checked) => {
    if (checked) {
      setSelectedZones(monitoringZones?.filter(zone => zone?.status === 'active')?.map(zone => zone?.id));
    } else {
      setSelectedZones([]);
    }
  };

  const handleEmergencyBroadcast = () => {
    if (!broadcastMessage?.trim() || selectedZones?.length === 0) {
      return;
    }
    setShowConfirmation(true);
  };

  const confirmEmergencyBroadcast = () => {
    if (confirmationCode !== 'EMERGENCY-2025') {
      alert('Invalid confirmation code. Please enter the correct emergency code.');
      return;
    }
    
    console.log('Emergency broadcast sent:', {
      message: broadcastMessage,
      zones: selectedZones,
      level: alertLevel,
      timestamp: new Date()
    });
    
    // Reset form
    setBroadcastMessage('');
    setSelectedZones([]);
    setConfirmationCode('');
    setShowConfirmation(false);
    
    alert('Emergency broadcast sent successfully to selected zones.');
  };

  const handleToggleEmergencyMode = () => {
    setEmergencyMode(!emergencyMode);
    console.log(`Emergency mode ${!emergencyMode ? 'activated' : 'deactivated'}`);
  };

  const handleDisableZone = (zoneId) => {
    console.log(`Disabling monitoring for zone: ${zoneId}`);
    // Implementation would disable zone monitoring
  };

  const handleUseTemplate = (template) => {
    setBroadcastMessage(template?.message);
  };

  const getZoneStatusConfig = (status) => {
    const configs = {
      'active': { bg: 'bg-success/10', text: 'text-success', icon: 'CheckCircle' },
      'maintenance': { bg: 'bg-warning/10', text: 'text-warning', icon: 'Wrench' },
      'disabled': { bg: 'bg-muted', text: 'text-text-secondary', icon: 'XCircle' }
    };
    return configs?.[status] || configs?.['disabled'];
  };

  const getAlertLevelConfig = (level) => {
    const configs = {
      'critical': { bg: 'bg-destructive', text: 'text-destructive-foreground' },
      'high': { bg: 'bg-warning', text: 'text-warning-foreground' },
      'medium': { bg: 'bg-secondary', text: 'text-secondary-foreground' },
      'info': { bg: 'bg-primary', text: 'text-primary-foreground' }
    };
    return configs?.[level] || configs?.['info'];
  };

  return (
    <div className="space-y-6">
      {/* Emergency Mode Toggle */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-bold text-text-primary">Emergency Controls</h2>
            <p className="text-sm font-body text-text-secondary mt-1">
              Emergency override controls and system-wide alert management
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
              emergencyMode ? 'bg-destructive/10 text-destructive' : 'bg-muted text-text-secondary'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                emergencyMode ? 'bg-destructive animate-pulse' : 'bg-text-secondary'
              }`}></div>
              <span className="text-sm font-body font-medium">
                {emergencyMode ? 'Emergency Mode Active' : 'Normal Operation'}
              </span>
            </div>
            <Button
              variant={emergencyMode ? 'destructive' : 'default'}
              iconName={emergencyMode ? 'ShieldOff' : 'Shield'}
              onClick={handleToggleEmergencyMode}
            >
              {emergencyMode ? 'Deactivate Emergency Mode' : 'Activate Emergency Mode'}
            </Button>
          </div>
        </div>
      </div>
      {/* Emergency Broadcast */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-heading font-semibold text-text-primary">Emergency Broadcast</h3>
          <p className="text-sm font-body text-text-secondary mt-1">
            Send immediate alerts to selected monitoring zones
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Message Templates */}
          <div>
            <h4 className="text-sm font-body font-semibold text-text-primary mb-3">Quick Templates</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {emergencyTemplates?.map((template) => (
                <button
                  key={template?.id}
                  onClick={() => handleUseTemplate(template)}
                  className="p-3 text-left border border-border rounded-md hover:bg-muted/50 transition-colors duration-200"
                >
                  <h5 className="text-sm font-body font-medium text-text-primary">{template?.title}</h5>
                  <p className="text-xs font-caption text-text-secondary mt-1 line-clamp-2">
                    {template?.message}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Emergency Message
                </label>
                <textarea
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e?.target?.value)}
                  placeholder="Enter emergency broadcast message..."
                  className="w-full h-32 px-3 py-2 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs font-caption text-text-secondary mt-1">
                  {broadcastMessage?.length}/500 characters
                </p>
              </div>

              <Select
                label="Alert Level"
                options={alertLevelOptions}
                value={alertLevel}
                onChange={setAlertLevel}
              />
            </div>

            {/* Zone Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-body font-semibold text-text-primary">Target Zones</h4>
                <Checkbox
                  label="Select All Active"
                  checked={selectedZones?.length === monitoringZones?.filter(z => z?.status === 'active')?.length}
                  onChange={(e) => handleSelectAllZones(e?.target?.checked)}
                />
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {monitoringZones?.map((zone) => {
                  const statusConfig = getZoneStatusConfig(zone?.status);
                  return (
                    <div key={zone?.id} className="flex items-center justify-between p-3 border border-border rounded-md">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedZones?.includes(zone?.id)}
                          onChange={(e) => handleZoneSelection(zone?.id, e?.target?.checked)}
                          disabled={zone?.status !== 'active'}
                        />
                        <div>
                          <p className="text-sm font-body font-medium text-text-primary">{zone?.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-medium ${statusConfig?.bg} ${statusConfig?.text}`}>
                              <Icon name={statusConfig?.icon} size={10} />
                              <span>{zone?.status}</span>
                            </span>
                            {zone?.vehicles > 0 && (
                              <span className="text-xs font-caption text-text-secondary">
                                {zone?.vehicles} vehicles
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Broadcast Button */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-sm font-body text-text-secondary">
              {selectedZones?.length} zone{selectedZones?.length !== 1 ? 's' : ''} selected
            </div>
            <Button
              variant="destructive"
              iconName="Megaphone"
              onClick={handleEmergencyBroadcast}
              disabled={!broadcastMessage?.trim() || selectedZones?.length === 0}
            >
              Send Emergency Broadcast
            </Button>
          </div>
        </div>
      </div>
      {/* Zone Management */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-heading font-semibold text-text-primary">Monitoring Zone Control</h3>
          <p className="text-sm font-body text-text-secondary mt-1">
            Enable, disable, or configure individual monitoring zones
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Zone</th>
                <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Status</th>
                <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Active Vehicles</th>
                <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Last Alert</th>
                <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {monitoringZones?.map((zone) => {
                const statusConfig = getZoneStatusConfig(zone?.status);
                return (
                  <tr key={zone?.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4">
                      <p className="text-sm font-body font-medium text-text-primary">{zone?.name}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${statusConfig?.bg} ${statusConfig?.text}`}>
                        <Icon name={statusConfig?.icon} size={12} />
                        <span>{zone?.status}</span>
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-body text-text-primary">{zone?.vehicles}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-body text-text-primary">{zone?.lastAlert}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" iconName="Settings" />
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          iconName="Power"
                          onClick={() => handleDisableZone(zone?.id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border shadow-modal max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} color="var(--color-destructive)" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary">Confirm Emergency Broadcast</h3>
                  <p className="text-sm font-body text-text-secondary">This action cannot be undone</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-body text-text-primary">{broadcastMessage}</p>
                </div>
                
                <div className={`p-2 rounded-md text-center ${getAlertLevelConfig(alertLevel)?.bg}`}>
                  <span className={`text-sm font-body font-medium ${getAlertLevelConfig(alertLevel)?.text}`}>
                    {alertLevelOptions?.find(opt => opt?.value === alertLevel)?.label}
                  </span>
                </div>
                
                <Input
                  label="Enter confirmation code"
                  type="password"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e?.target?.value)}
                  placeholder="EMERGENCY-2025"
                  description="Enter the emergency confirmation code to proceed"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmEmergencyBroadcast}>
                  Confirm Broadcast
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyControls;