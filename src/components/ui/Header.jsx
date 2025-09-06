import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Dashboard', path: '/real-time-dashboard', icon: 'Activity' },
    { label: 'Alerts', path: '/alert-management', icon: 'AlertTriangle' },
    { label: 'Analysis', path: '/geological-data-analysis', icon: 'BarChart3' },
    { label: 'Admin', path: '/system-administration', icon: 'Settings' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-card">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Mountain" size={20} color="white" />
            </div>
            <span className="font-heading font-bold text-xl text-text-primary">
              RockGuard AI
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-colors duration-200 ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Side - System Status & User Menu */}
        <div className="flex items-center space-x-4">
          {/* System Health Badge */}
          <div className="hidden sm:flex items-center space-x-2">
            <div className="flex items-center space-x-1 px-2 py-1 bg-success/10 rounded-md">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs font-caption text-success font-medium">Online</span>
            </div>
          </div>

          {/* Alert Status Indicator */}
          <div className="relative">
            <button
              onClick={() => handleNavigation('/alert-management')}
              className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-muted transition-colors duration-200"
            >
              <Icon name="Bell" size={18} color="var(--color-text-secondary)" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-warning text-warning-foreground text-xs font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-muted transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden lg:block text-sm font-body font-medium text-text-primary">
                Dr. Sarah Chen
              </span>
              <Icon name="ChevronDown" size={16} color="var(--color-text-secondary)" />
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-modal z-50">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-body font-medium text-text-primary">Dr. Sarah Chen</p>
                    <p className="text-xs font-caption text-text-secondary">Geological Analyst</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm font-body text-text-secondary hover:bg-muted hover:text-text-primary transition-colors duration-200">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm font-body text-text-secondary hover:bg-muted hover:text-text-primary transition-colors duration-200">
                    Preferences
                  </button>
                  <div className="border-t border-border mt-1 pt-1">
                    <button
                      onClick={() => handleNavigation('/login')}
                      className="w-full text-left px-4 py-2 text-sm font-body text-destructive hover:bg-destructive/10 transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors duration-200"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} color="var(--color-text-primary)" />
          </button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span className="font-body font-medium">{item?.label}</span>
              </button>
            ))}
          </nav>
          
          {/* Mobile System Status */}
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-caption text-success font-medium">System Online</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Bell" size={16} color="var(--color-warning)" />
                <span className="text-sm font-caption text-warning font-medium">3 Alerts</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {(isMenuOpen || isUserMenuOpen) && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => {
            setIsMenuOpen(false);
            setIsUserMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;