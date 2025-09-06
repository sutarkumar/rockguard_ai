import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      label: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'CheckCircle',
      label: 'USGS Certified',
      description: 'Geological authority approved'
    },
    {
      icon: 'Clock',
      label: '24/7 Monitoring',
      description: 'Continuous system surveillance'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-center sm:text-left">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name={feature?.icon} size={16} color="var(--color-success)" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-body font-medium text-text-primary">
                {feature?.label}
              </p>
              <p className="text-xs font-caption text-text-secondary">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;