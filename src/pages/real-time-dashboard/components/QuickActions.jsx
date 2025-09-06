import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionExecute }) => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const quickActions = [
    {
      id: 'broadcast',
      name: 'Broadcast Alert',
      description: 'Send immediate alert to all registered users and vehicles',
      icon: 'Radio',
      variant: 'destructive',
      requiresConfirmation: true,
      category: 'emergency'
    },
    {
      id: 'emergency_contact',
      name: 'Emergency Services',
      description: 'Contact emergency response teams and authorities',
      icon: 'Phone',
      variant: 'destructive',
      requiresConfirmation: true,
      category: 'emergency'
    },
    {
      id: 'vehicle_override',
      name: 'Vehicle Override',
      description: 'Send stop/reroute commands to vehicles in risk zones',
      icon: 'StopCircle',
      variant: 'warning',
      requiresConfirmation: true,
      category: 'emergency'
    },
    {
      id: 'manual_prediction',
      name: 'Manual Assessment',
      description: 'Override AI predictions with manual geological assessment',
      icon: 'Brain',
      variant: 'outline',
      requiresConfirmation: false,
      category: 'analysis'
    },
    {
      id: 'export_data',
      name: 'Export Data',
      description: 'Download current geological data and predictions',
      icon: 'Download',
      variant: 'outline',
      requiresConfirmation: false,
      category: 'data'
    },
    {
      id: 'system_status',
      name: 'System Diagnostics',
      description: 'Run comprehensive system health check',
      icon: 'Settings',
      variant: 'outline',
      requiresConfirmation: false,
      category: 'system'
    }
  ];

  const emergencyContacts = [
    {
      id: 'fire_dept',
      name: 'Fire Department',
      phone: '+1-555-FIRE-911',
      type: 'emergency',
      available: true
    },
    {
      id: 'police',
      name: 'Police Department',
      phone: '+1-555-POLICE-1',
      type: 'emergency',
      available: true
    },
    {
      id: 'geological_survey',
      name: 'Geological Survey Team',
      phone: '+1-555-GEO-TEAM',
      type: 'technical',
      available: true
    },
    {
      id: 'transport_authority',
      name: 'Transport Authority',
      phone: '+1-555-TRANSPORT',
      type: 'coordination',
      available: false
    }
  ];

  const handleActionClick = (action) => {
    if (action?.requiresConfirmation) {
      setConfirmAction(action);
    } else {
      executeAction(action);
    }
  };

  const executeAction = (action) => {
    setSelectedAction(action?.id);
    
    // Simulate action execution
    setTimeout(() => {
      setSelectedAction(null);
      setConfirmAction(null);
      onActionExecute?.(action);
    }, 2000);
  };

  const getActionsByCategory = (category) => {
    return quickActions?.filter(action => action?.category === category);
  };

  const categories = [
    { id: 'emergency', name: 'Emergency Actions', icon: 'AlertTriangle' },
    { id: 'analysis', name: 'Analysis Tools', icon: 'BarChart3' },
    { id: 'data', name: 'Data Management', icon: 'Database' },
    { id: 'system', name: 'System Control', icon: 'Settings' }
  ];

  return (
    <div className="space-y-6">
      {/* Emergency Mode Toggle */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} color="var(--color-primary)" />
              <h3 className="font-heading font-semibold text-lg text-text-primary">
                Quick Actions
              </h3>
            </div>
            
            <button
              onClick={() => setIsEmergencyMode(!isEmergencyMode)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body font-medium transition-all duration-200 ${
                isEmergencyMode
                  ? 'bg-error text-error-foreground'
                  : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-muted/80'
              }`}
            >
              <Icon name={isEmergencyMode ? "ShieldAlert" : "Shield"} size={16} />
              <span>{isEmergencyMode ? 'Emergency Mode' : 'Normal Mode'}</span>
            </button>
          </div>
        </div>

        <div className="p-4">
          {categories?.map((category) => {
            const categoryActions = getActionsByCategory(category?.id);
            
            return (
              <div key={category?.id} className="mb-6 last:mb-0">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name={category?.icon} size={16} color="var(--color-text-secondary)" />
                  <h4 className="font-body font-medium text-text-primary">
                    {category?.name}
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categoryActions?.map((action) => (
                    <div
                      key={action?.id}
                      className="p-3 border border-border rounded-lg hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Icon name={action?.icon} size={16} color="var(--color-text-secondary)" />
                          <h5 className="font-body font-medium text-text-primary">
                            {action?.name}
                          </h5>
                        </div>
                        
                        {action?.requiresConfirmation && (
                          <Icon name="Lock" size={12} color="var(--color-warning)" />
                        )}
                      </div>
                      
                      <p className="text-sm font-body text-text-secondary mb-3">
                        {action?.description}
                      </p>
                      
                      <Button
                        variant={action?.variant}
                        size="sm"
                        fullWidth
                        loading={selectedAction === action?.id}
                        disabled={!isEmergencyMode && action?.category === 'emergency'}
                        onClick={() => handleActionClick(action)}
                      >
                        {selectedAction === action?.id ? 'Executing...' : 'Execute'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Emergency Contacts */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={20} color="var(--color-primary)" />
            <h3 className="font-heading font-semibold text-lg text-text-primary">
              Emergency Contacts
            </h3>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {emergencyContacts?.map((contact) => (
            <div
              key={contact?.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  contact?.available ? 'bg-success' : 'bg-error'
                }`} />
                
                <div>
                  <h4 className="font-body font-semibold text-text-primary">
                    {contact?.name}
                  </h4>
                  <p className="text-sm font-body text-text-secondary">
                    {contact?.phone} • {contact?.type}
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Phone"
                disabled={!contact?.available}
                onClick={() => {
                  if (contact?.available) {
                    window.open(`tel:${contact?.phone}`, '_self');
                  }
                }}
              >
                Call
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border shadow-modal max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-warning/10 rounded-md">
                  <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-text-primary">
                  Confirm Action
                </h3>
              </div>
              
              <p className="text-sm font-body text-text-secondary mb-6">
                Are you sure you want to execute "{confirmAction?.name}"? This action cannot be undone and will immediately affect all connected systems.
              </p>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setConfirmAction(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  fullWidth
                  loading={selectedAction === confirmAction?.id}
                  onClick={() => executeAction(confirmAction)}
                >
                  Confirm & Execute
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;