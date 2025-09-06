import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ScheduleSettings = () => {
  const [scheduleProfiles, setScheduleProfiles] = useState({
    businessHours: {
      enabled: true,
      startTime: '08:00',
      endTime: '18:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      alertTypes: ['all'],
      escalationDelay: '5'
    },
    afterHours: {
      enabled: true,
      startTime: '18:00',
      endTime: '08:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      alertTypes: ['critical', 'high'],
      escalationDelay: '2'
    },
    weekends: {
      enabled: true,
      startTime: '00:00',
      endTime: '23:59',
      days: ['saturday', 'sunday'],
      alertTypes: ['critical'],
      escalationDelay: '1'
    },
    emergency: {
      enabled: true,
      startTime: '00:00',
      endTime: '23:59',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      alertTypes: ['critical'],
      escalationDelay: '0'
    }
  });

  const [activeProfile, setActiveProfile] = useState('businessHours');

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i?.toString()?.padStart(2, '0');
    return { value: `${hour}:00`, label: `${hour}:00` };
  });

  const alertTypeOptions = [
    { value: 'all', label: 'All Alert Types' },
    { value: 'critical', label: 'Critical Only' },
    { value: 'high', label: 'High & Critical' },
    { value: 'medium', label: 'Medium & Above' },
    { value: 'custom', label: 'Custom Selection' }
  ];

  const escalationOptions = [
    { value: '0', label: 'Immediate' },
    { value: '1', label: '1 minute' },
    { value: '2', label: '2 minutes' },
    { value: '5', label: '5 minutes' },
    { value: '10', label: '10 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' }
  ];

  const dayOptions = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const scheduleTypes = [
    {
      key: 'businessHours',
      label: 'Business Hours',
      description: 'Standard working hours with full alert coverage',
      icon: 'Clock',
      color: 'text-primary bg-primary/10 border-primary/20'
    },
    {
      key: 'afterHours',
      label: 'After Hours',
      description: 'Evening and night hours with priority alerts only',
      icon: 'Moon',
      color: 'text-accent bg-accent/10 border-accent/20'
    },
    {
      key: 'weekends',
      label: 'Weekends',
      description: 'Weekend coverage with critical alerts only',
      icon: 'Calendar',
      color: 'text-warning bg-warning/10 border-warning/20'
    },
    {
      key: 'emergency',
      label: 'Emergency Mode',
      description: '24/7 critical alert coverage with immediate escalation',
      icon: 'AlertTriangle',
      color: 'text-destructive bg-destructive/10 border-destructive/20'
    }
  ];

  const handleProfileUpdate = (profileKey, field, value) => {
    setScheduleProfiles(prev => ({
      ...prev,
      [profileKey]: {
        ...prev?.[profileKey],
        [field]: value
      }
    }));
  };

  const handleDayToggle = (profileKey, day) => {
    const currentDays = scheduleProfiles?.[profileKey]?.days;
    const updatedDays = currentDays?.includes(day)
      ? currentDays?.filter(d => d !== day)
      : [...currentDays, day];
    
    handleProfileUpdate(profileKey, 'days', updatedDays);
  };

  const getCurrentScheduleStatus = () => {
    const now = new Date();
    const currentHour = now?.getHours();
    const currentDay = now?.toLocaleLowerCase()?.substring(0, 3);
    
    // Simple logic to determine active profile
    if (scheduleProfiles?.emergency?.enabled) {
      return { profile: 'emergency', status: 'Emergency Mode Active' };
    } else if (currentDay === 'sat' || currentDay === 'sun') {
      return { profile: 'weekends', status: 'Weekend Schedule Active' };
    } else if (currentHour >= 8 && currentHour < 18) {
      return { profile: 'businessHours', status: 'Business Hours Active' };
    } else {
      return { profile: 'afterHours', status: 'After Hours Active' };
    }
  };

  const currentStatus = getCurrentScheduleStatus();

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-text-primary">Schedule Settings</h2>
          <p className="text-sm font-body text-text-secondary mt-1">
            Configure alert preferences for different time periods and situations
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-md border ${
            scheduleTypes?.find(s => s?.key === currentStatus?.profile)?.color || 'text-text-secondary bg-muted border-border'
          }`}>
            <Icon name={scheduleTypes?.find(s => s?.key === currentStatus?.profile)?.icon || 'Clock'} size={16} />
            <span className="text-sm font-body font-medium">{currentStatus?.status}</span>
          </div>
          <Button variant="secondary" iconName="Save" iconPosition="left">
            Save All Schedules
          </Button>
        </div>
      </div>
      {/* Schedule Profile Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {scheduleTypes?.map((schedule) => (
          <button
            key={schedule?.key}
            onClick={() => setActiveProfile(schedule?.key)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors duration-200 whitespace-nowrap ${
              activeProfile === schedule?.key
                ? schedule?.color
                : 'text-text-secondary bg-muted border-border hover:bg-muted/80'
            }`}
          >
            <Icon name={schedule?.icon} size={16} />
            <div className="text-left">
              <div className="text-sm font-body font-medium">{schedule?.label}</div>
              <div className="text-xs opacity-80">{schedule?.description}</div>
            </div>
          </button>
        ))}
      </div>
      {/* Active Profile Configuration */}
      <div className="bg-muted/30 rounded-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name={scheduleTypes?.find(s => s?.key === activeProfile)?.icon} size={20} />
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              {scheduleTypes?.find(s => s?.key === activeProfile)?.label} Configuration
            </h3>
          </div>
          <Checkbox
            label="Enable this schedule"
            checked={scheduleProfiles?.[activeProfile]?.enabled}
            onChange={(e) => handleProfileUpdate(activeProfile, 'enabled', e?.target?.checked)}
          />
        </div>

        {scheduleProfiles?.[activeProfile]?.enabled && (
          <div className="space-y-6">
            {/* Time Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Start Time"
                options={timeOptions}
                value={scheduleProfiles?.[activeProfile]?.startTime}
                onChange={(value) => handleProfileUpdate(activeProfile, 'startTime', value)}
              />
              
              <Select
                label="End Time"
                options={timeOptions}
                value={scheduleProfiles?.[activeProfile]?.endTime}
                onChange={(value) => handleProfileUpdate(activeProfile, 'endTime', value)}
              />
            </div>

            {/* Days Configuration */}
            <div>
              <label className="text-sm font-body font-medium text-text-primary mb-3 block">
                Active Days
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {dayOptions?.map((day) => (
                  <div
                    key={day?.value}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                      scheduleProfiles?.[activeProfile]?.days?.includes(day?.value)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-text-secondary border-border hover:bg-muted'
                    }`}
                    onClick={() => handleDayToggle(activeProfile, day?.value)}
                  >
                    <div className="text-center">
                      <div className="text-xs font-caption font-medium">
                        {day?.label?.substring(0, 3)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert Types Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Alert Types"
                description="Which alert priorities to process during this schedule"
                options={alertTypeOptions}
                value={scheduleProfiles?.[activeProfile]?.alertTypes?.[0] || 'all'}
                onChange={(value) => handleProfileUpdate(activeProfile, 'alertTypes', [value])}
              />
              
              <Select
                label="Escalation Delay"
                description="Time before escalating to backup contacts"
                options={escalationOptions}
                value={scheduleProfiles?.[activeProfile]?.escalationDelay}
                onChange={(value) => handleProfileUpdate(activeProfile, 'escalationDelay', value)}
              />
            </div>

            {/* Schedule Preview */}
            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-body font-semibold text-text-primary mb-3">Schedule Preview</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-card rounded-lg border border-border">
                  <div className="text-xs font-caption text-text-secondary">Active Period</div>
                  <div className="text-sm font-body font-medium text-text-primary">
                    {scheduleProfiles?.[activeProfile]?.startTime} - {scheduleProfiles?.[activeProfile]?.endTime}
                  </div>
                </div>
                <div className="p-3 bg-card rounded-lg border border-border">
                  <div className="text-xs font-caption text-text-secondary">Active Days</div>
                  <div className="text-sm font-body font-medium text-text-primary">
                    {scheduleProfiles?.[activeProfile]?.days?.length} days selected
                  </div>
                </div>
                <div className="p-3 bg-card rounded-lg border border-border">
                  <div className="text-xs font-caption text-text-secondary">Alert Coverage</div>
                  <div className="text-sm font-body font-medium text-text-primary">
                    {scheduleProfiles?.[activeProfile]?.alertTypes?.[0] === 'all' ? 'All Types' : 
                     scheduleProfiles?.[activeProfile]?.alertTypes?.[0] === 'critical'? 'Critical Only' : 'Priority Filtered'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Schedule Override */}
      <div className="border-t border-border pt-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">Quick Override</h3>
            <p className="text-sm font-body text-text-secondary mt-1">
              Temporarily override current schedule settings for immediate needs
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" iconName="Shield" iconPosition="left">
              Enable Emergency Mode
            </Button>
            <Button variant="outline" iconName="Pause" iconPosition="left">
              Pause All Alerts (1 hour)
            </Button>
            <Button variant="outline" iconName="Volume2" iconPosition="left">
              Critical Alerts Only
            </Button>
          </div>
        </div>
      </div>
      {/* Schedule Statistics */}
      <div className="border-t border-border pt-6 mt-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Schedule Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-primary/10 rounded-lg text-center">
            <div className="text-2xl font-heading font-bold text-primary">156</div>
            <div className="text-sm font-body text-text-secondary">Business Hours Alerts</div>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg text-center">
            <div className="text-2xl font-heading font-bold text-accent">43</div>
            <div className="text-sm font-body text-text-secondary">After Hours Alerts</div>
          </div>
          <div className="p-4 bg-warning/10 rounded-lg text-center">
            <div className="text-2xl font-heading font-bold text-warning">12</div>
            <div className="text-sm font-body text-text-secondary">Weekend Alerts</div>
          </div>
          <div className="p-4 bg-destructive/10 rounded-lg text-center">
            <div className="text-2xl font-heading font-bold text-destructive">3</div>
            <div className="text-sm font-body text-text-secondary">Emergency Overrides</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSettings;