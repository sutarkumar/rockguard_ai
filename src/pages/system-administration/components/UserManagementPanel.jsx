import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserManagementPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const users = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      email: "sarah.chen@rockguard.ai",
      organization: "Geological Survey Institute",
      role: "Senior Analyst",
      accessLevel: "Administrator",
      status: "Active",
      lastLogin: "2025-09-06 06:45:12",
      alertsReceived: 247,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      email: "m.rodriguez@translogistics.com",
      organization: "TransLogistics Corp",
      role: "Fleet Manager",
      accessLevel: "Standard User",
      status: "Active",
      lastLogin: "2025-09-06 05:23:45",
      alertsReceived: 89,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emma Thompson",
      email: "e.thompson@emergencyservices.gov",
      organization: "Emergency Services Department",
      role: "Emergency Coordinator",
      accessLevel: "Emergency Response",
      status: "Active",
      lastLogin: "2025-09-06 07:01:33",
      alertsReceived: 156,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "James Wilson",
      email: "j.wilson@mountainmining.com",
      organization: "Mountain Mining Solutions",
      role: "Safety Officer",
      accessLevel: "Standard User",
      status: "Inactive",
      lastLogin: "2025-09-04 14:22:18",
      alertsReceived: 34,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Lisa Park",
      email: "l.park@highwayauthority.gov",
      organization: "Highway Authority",
      role: "Maintenance Supervisor",
      accessLevel: "Standard User",
      status: "Active",
      lastLogin: "2025-09-06 04:15:27",
      alertsReceived: 198,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'Senior Analyst', label: 'Senior Analyst' },
    { value: 'Fleet Manager', label: 'Fleet Manager' },
    { value: 'Emergency Coordinator', label: 'Emergency Coordinator' },
    { value: 'Safety Officer', label: 'Safety Officer' },
    { value: 'Maintenance Supervisor', label: 'Maintenance Supervisor' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Suspended', label: 'Suspended' }
  ];

  const accessLevelOptions = [
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Emergency Response', label: 'Emergency Response' },
    { value: 'Standard User', label: 'Standard User' },
    { value: 'Read Only', label: 'Read Only' }
  ];

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.organization?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = filterRole === 'all' || user?.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user?.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserSelection = (userId, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers?.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(filteredUsers?.map(user => user?.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on users:`, selectedUsers);
    // Implementation would handle bulk actions
    setSelectedUsers([]);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { bg: 'bg-success/10', text: 'text-success', icon: 'CheckCircle' },
      'Inactive': { bg: 'bg-muted', text: 'text-text-secondary', icon: 'Clock' },
      'Suspended': { bg: 'bg-destructive/10', text: 'text-destructive', icon: 'XCircle' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.['Inactive'];
    
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${config?.bg} ${config?.text}`}>
        <Icon name={config?.icon} size={12} />
        <span>{status}</span>
      </span>
    );
  };

  const getAccessLevelBadge = (level) => {
    const levelConfig = {
      'Administrator': { bg: 'bg-primary/10', text: 'text-primary' },
      'Emergency Response': { bg: 'bg-warning/10', text: 'text-warning' },
      'Standard User': { bg: 'bg-secondary/10', text: 'text-secondary' },
      'Read Only': { bg: 'bg-muted', text: 'text-text-secondary' }
    };
    
    const config = levelConfig?.[level] || levelConfig?.['Standard User'];
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${config?.bg} ${config?.text}`}>
        {level}
      </span>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-bold text-text-primary">User Management</h2>
            <p className="text-sm font-body text-text-secondary mt-1">
              Manage user accounts, permissions, and access levels
            </p>
          </div>
          <Button variant="default" iconName="UserPlus" iconPosition="left">
            Add New User
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-2">
            <Input
              type="search"
              placeholder="Search users by name, email, or organization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          <Select
            placeholder="Filter by role"
            options={roleOptions}
            value={filterRole}
            onChange={setFilterRole}
          />
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
          />
        </div>

        {/* Bulk Actions */}
        {selectedUsers?.length > 0 && (
          <div className="flex items-center space-x-2 p-3 bg-muted rounded-md mb-4">
            <span className="text-sm font-body text-text-primary">
              {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2 ml-auto">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkAction('activate')}
              >
                Activate
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkAction('deactivate')}
              >
                Deactivate
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkAction('changeRole')}
              >
                Change Role
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4">
                <Checkbox
                  checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">User</th>
              <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Organization</th>
              <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Role</th>
              <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Access Level</th>
              <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Status</th>
              <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Last Login</th>
              <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Alerts</th>
              <th className="text-left p-4 text-sm font-body font-semibold text-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user?.id} className="border-b border-border hover:bg-muted/50">
                <td className="p-4">
                  <Checkbox
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={(e) => handleUserSelection(user?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-body font-medium text-text-primary">{user?.name}</p>
                      <p className="text-xs font-caption text-text-secondary">{user?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm font-body text-text-primary">{user?.organization}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm font-body text-text-primary">{user?.role}</p>
                </td>
                <td className="p-4">
                  {getAccessLevelBadge(user?.accessLevel)}
                </td>
                <td className="p-4">
                  {getStatusBadge(user?.status)}
                </td>
                <td className="p-4">
                  <p className="text-sm font-body text-text-primary">
                    {new Date(user.lastLogin)?.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </td>
                <td className="p-4">
                  <p className="text-sm font-body text-text-primary">{user?.alertsReceived}</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Edit" />
                    <Button variant="ghost" size="sm" iconName="MoreVertical" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredUsers?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <p className="text-text-secondary font-body">No users found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default UserManagementPanel;