import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const EmergencyContacts = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [newContact, setNewContact] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    priority: 'medium',
    channels: {
      email: true,
      sms: false,
      voice: false
    },
    zones: []
  });

  const contacts = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      role: 'Chief Geological Analyst',
      email: 'sarah.chen@rockguard.ai',
      phone: '+1 (555) 123-4567',
      priority: 'critical',
      status: 'active',
      lastContacted: new Date('2025-01-06T06:45:00'),
      responseRate: '98%',
      channels: {
        email: true,
        sms: true,
        voice: true
      },
      zones: ['Highway 101 Corridor', 'Mountain Pass Route'],
      backup: false
    },
    {
      id: 2,
      name: 'Emergency Response Team',
      role: 'First Response Coordinator',
      email: 'emergency@cityresponse.gov',
      phone: '+1 (555) 911-0000',
      priority: 'critical',
      status: 'active',
      lastContacted: new Date('2025-01-06T06:45:45'),
      responseRate: '100%',
      channels: {
        email: true,
        sms: true,
        voice: true
      },
      zones: ['All Zones'],
      backup: false
    },
    {
      id: 3,
      name: 'Highway Maintenance Dept',
      role: 'Road Safety Manager',
      email: 'maintenance@highway101.gov',
      phone: '+1 (555) 456-7890',
      priority: 'high',
      status: 'active',
      lastContacted: new Date('2025-01-06T05:30:00'),
      responseRate: '92%',
      channels: {
        email: true,
        sms: false,
        voice: false
      },
      zones: ['Highway 101 Corridor'],
      backup: false
    },
    {
      id: 4,
      name: 'Fleet Operations Center',
      role: 'Vehicle Dispatch Manager',
      email: 'dispatch@fleetops.com',
      phone: '+1 (555) 789-0123',
      priority: 'high',
      status: 'active',
      lastContacted: new Date('2025-01-06T04:15:00'),
      responseRate: '95%',
      channels: {
        email: true,
        sms: true,
        voice: false
      },
      zones: ['Highway 101 Corridor', 'Valley Transit Route'],
      backup: false
    },
    {
      id: 5,
      name: 'Dr. Michael Rodriguez',
      role: 'Backup Geological Analyst',
      email: 'michael.rodriguez@rockguard.ai',
      phone: '+1 (555) 234-5678',
      priority: 'medium',
      status: 'standby',
      lastContacted: new Date('2025-01-05T18:00:00'),
      responseRate: '89%',
      channels: {
        email: true,
        sms: true,
        voice: false
      },
      zones: ['All Zones'],
      backup: true
    }
  ];

  const roleOptions = [
    { value: 'geological_analyst', label: 'Geological Analyst' },
    { value: 'emergency_coordinator', label: 'Emergency Coordinator' },
    { value: 'road_safety_manager', label: 'Road Safety Manager' },
    { value: 'fleet_manager', label: 'Fleet Manager' },
    { value: 'system_administrator', label: 'System Administrator' },
    { value: 'backup_contact', label: 'Backup Contact' }
  ];

  const priorityOptions = [
    { value: 'critical', label: 'Critical Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const zoneOptions = [
    { value: 'highway_101', label: 'Highway 101 Corridor' },
    { value: 'mountain_pass', label: 'Mountain Pass Route' },
    { value: 'coastal_access', label: 'Coastal Access Road' },
    { value: 'valley_transit', label: 'Valley Transit Route' },
    { value: 'all_zones', label: 'All Zones' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-accent bg-accent/10 border-accent/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'standby': return 'text-warning bg-warning/10';
      case 'inactive': return 'text-text-secondary bg-muted';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const handleAddContact = () => {
    setShowAddForm(true);
    setEditingContact(null);
    setNewContact({
      name: '',
      role: '',
      email: '',
      phone: '',
      priority: 'medium',
      channels: {
        email: true,
        sms: false,
        voice: false
      },
      zones: []
    });
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact?.id);
    setNewContact({
      name: contact?.name,
      role: contact?.role,
      email: contact?.email,
      phone: contact?.phone,
      priority: contact?.priority,
      channels: contact?.channels,
      zones: contact?.zones
    });
    setShowAddForm(true);
  };

  const handleSaveContact = () => {
    // Save logic would go here
    setShowAddForm(false);
    setEditingContact(null);
  };

  const formatTimestamp = (timestamp) => {
    return timestamp?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-text-primary">Emergency Contacts</h2>
          <p className="text-sm font-body text-text-secondary mt-1">
            Manage contact lists with role-based distribution and backup sequences
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Contacts
          </Button>
          <Button variant="secondary" iconName="Plus" iconPosition="left" onClick={handleAddContact}>
            Add Contact
          </Button>
        </div>
      </div>
      {/* Add/Edit Contact Form */}
      {showAddForm && (
        <div className="bg-muted/30 rounded-lg p-6 mb-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              {editingContact ? 'Edit Contact' : 'Add New Contact'}
            </h3>
            <Button variant="ghost" iconName="X" onClick={() => setShowAddForm(false)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter contact name"
              value={newContact?.name}
              onChange={(e) => setNewContact(prev => ({ ...prev, name: e?.target?.value }))}
              required
            />
            
            <Select
              label="Role"
              options={roleOptions}
              value={newContact?.role}
              onChange={(value) => setNewContact(prev => ({ ...prev, role: value }))}
              placeholder="Select role"
            />
            
            <Input
              label="Email Address"
              type="email"
              placeholder="contact@example.com"
              value={newContact?.email}
              onChange={(e) => setNewContact(prev => ({ ...prev, email: e?.target?.value }))}
              required
            />
            
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={newContact?.phone}
              onChange={(e) => setNewContact(prev => ({ ...prev, phone: e?.target?.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Select
              label="Priority Level"
              options={priorityOptions}
              value={newContact?.priority}
              onChange={(value) => setNewContact(prev => ({ ...prev, priority: value }))}
            />
            
            <Select
              label="Monitoring Zones"
              options={zoneOptions}
              value={newContact?.zones}
              onChange={(value) => setNewContact(prev => ({ ...prev, zones: value }))}
              multiple
              placeholder="Select zones"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-body font-medium text-text-primary mb-3 block">
              Notification Channels
            </label>
            <div className="flex space-x-6">
              <Checkbox
                label="Email"
                checked={newContact?.channels?.email}
                onChange={(e) => setNewContact(prev => ({
                  ...prev,
                  channels: { ...prev?.channels, email: e?.target?.checked }
                }))}
              />
              <Checkbox
                label="SMS"
                checked={newContact?.channels?.sms}
                onChange={(e) => setNewContact(prev => ({
                  ...prev,
                  channels: { ...prev?.channels, sms: e?.target?.checked }
                }))}
              />
              <Checkbox
                label="Voice Call"
                checked={newContact?.channels?.voice}
                onChange={(e) => setNewContact(prev => ({
                  ...prev,
                  channels: { ...prev?.channels, voice: e?.target?.checked }
                }))}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="secondary" onClick={handleSaveContact}>
              {editingContact ? 'Update Contact' : 'Add Contact'}
            </Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* Contacts List */}
      <div className="space-y-4">
        {contacts?.map((contact) => (
          <div key={contact?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-body font-semibold text-text-primary">{contact?.name}</h3>
                    <span className={`px-2 py-1 rounded-md text-xs font-caption font-medium border ${getPriorityColor(contact?.priority)}`}>
                      {contact?.priority?.toUpperCase()}
                    </span>
                    {contact?.backup && (
                      <span className="px-2 py-1 rounded-md text-xs font-caption font-medium bg-accent/10 text-accent border border-accent/20">
                        BACKUP
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-body text-text-secondary mb-2">{contact?.role}</p>
                  <div className="flex items-center space-x-4 text-xs font-caption text-text-secondary">
                    <span className="flex items-center space-x-1">
                      <Icon name="Mail" size={12} />
                      <span>{contact?.email}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Phone" size={12} />
                      <span>{contact?.phone}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-md ${getStatusColor(contact?.status)}`}>
                  <div className={`w-2 h-2 rounded-full ${contact?.status === 'active' ? 'bg-success' : contact?.status === 'standby' ? 'bg-warning' : 'bg-text-secondary'}`}></div>
                  <span className="text-xs font-caption font-medium capitalize">{contact?.status}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-3 border-t border-border">
              <div>
                <span className="text-xs font-caption text-text-secondary">Notification Channels</span>
                <div className="flex items-center space-x-2 mt-1">
                  {contact?.channels?.email && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-success/10 text-success rounded-md">
                      <Icon name="Mail" size={12} />
                      <span className="text-xs font-caption">Email</span>
                    </div>
                  )}
                  {contact?.channels?.sms && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-md">
                      <Icon name="MessageSquare" size={12} />
                      <span className="text-xs font-caption">SMS</span>
                    </div>
                  )}
                  {contact?.channels?.voice && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-warning/10 text-warning rounded-md">
                      <Icon name="Phone" size={12} />
                      <span className="text-xs font-caption">Voice</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <span className="text-xs font-caption text-text-secondary">Response Rate</span>
                <div className="text-sm font-body font-medium text-text-primary mt-1">
                  {contact?.responseRate}
                </div>
              </div>
              
              <div>
                <span className="text-xs font-caption text-text-secondary">Last Contacted</span>
                <div className="text-sm font-body font-medium text-text-primary mt-1">
                  {formatTimestamp(contact?.lastContacted)}
                </div>
              </div>
              
              <div>
                <span className="text-xs font-caption text-text-secondary">Monitoring Zones</span>
                <div className="text-sm font-body font-medium text-text-primary mt-1">
                  {contact?.zones?.length > 2 ? `${contact?.zones?.length} zones` : contact?.zones?.join(', ')}
                </div>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <Button variant="outline" size="sm" iconName="Edit" iconPosition="left" onClick={() => handleEditContact(contact)}>
                Edit
              </Button>
              <Button variant="outline" size="sm" iconName="Send" iconPosition="left">
                Test Contact
              </Button>
              <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                View History
              </Button>
              {contact?.status === 'active' && (
                <Button variant="outline" size="sm" iconName="Pause" iconPosition="left">
                  Set Standby
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Contact Statistics */}
      <div className="border-t border-border pt-6 mt-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Contact Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-success/10 rounded-lg text-center">
            <div className="text-2xl font-heading font-bold text-success">4</div>
            <div className="text-sm font-body text-text-secondary">Active Contacts</div>
          </div>
          <div className="p-4 bg-warning/10 rounded-lg text-center">
            <div className="text-2xl font-heading font-bold text-warning">1</div>
            <div className="text-sm font-body text-text-secondary">Standby Contacts</div>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg text-center">
            <div className="text-2xl font-heading font-bold text-primary">94.8%</div>
            <div className="text-sm font-body text-text-secondary">Avg Response Rate</div>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg text-center">
            <div className="text-2xl font-heading font-bold text-accent">2.3min</div>
            <div className="text-sm font-body text-text-secondary">Avg Response Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;