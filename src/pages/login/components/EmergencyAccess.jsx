import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyAccess = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const emergencyContacts = [
    {
      title: 'Emergency Operations Center',
      phone: '+1-800-ROCK-911',
      available: '24/7'
    },
    {
      title: 'Technical Support',
      phone: '+1-800-TECH-AID',
      available: 'Business Hours'
    },
    {
      title: 'System Administrator',
      phone: '+1-800-SYS-ADMIN',
      available: 'On-Call'
    }
  ];

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-2 text-sm font-body text-text-secondary hover:text-text-primary transition-colors duration-200"
      >
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
        />
        <span>Emergency Access Information</span>
      </button>
      {isExpanded && (
        <div className="mt-4 p-4 bg-warning/5 border border-warning/20 rounded-md">
          <div className="flex items-start space-x-2 mb-3">
            <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
            <div>
              <h4 className="text-sm font-body font-medium text-text-primary">
                Critical Situation Access
              </h4>
              <p className="text-xs font-caption text-text-secondary mt-1">
                If you cannot access the system during a geological emergency, contact:
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {emergencyContacts?.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-surface rounded border border-border">
                <div>
                  <p className="text-xs font-body font-medium text-text-primary">
                    {contact?.title}
                  </p>
                  <p className="text-xs font-caption text-text-secondary">
                    Available: {contact?.available}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-data text-primary">
                    {contact?.phone}
                  </span>
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Phone"
                    onClick={() => window.open(`tel:${contact?.phone}`)}
                  >
                    Call
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 p-2 bg-error/5 border border-error/20 rounded">
            <p className="text-xs font-caption text-error">
              <strong>Emergency Protocol:</strong> In case of imminent rockfall danger, 
              immediately contact local emergency services (911) and evacuate the area.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyAccess;