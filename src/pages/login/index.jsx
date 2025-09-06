import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import SystemStatus from './components/SystemStatus';
import EmergencyAccess from './components/EmergencyAccess';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem('rockguard_user');
    if (userData) {
      const user = JSON.parse(userData);
      // Check if remember me was selected or if session is still valid
      if (user?.rememberMe || (new Date() - new Date(user.loginTime)) < 24 * 60 * 60 * 1000) {
        navigate('/real-time-dashboard');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-border bg-surface">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Mountain" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold text-text-primary">
              RockGuard AI
            </h1>
            <p className="text-sm font-caption text-text-secondary">
              Geological Monitoring System
            </p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-md">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs font-caption text-success font-medium">
              System Online
            </span>
          </div>
          <div className="text-xs font-caption text-text-secondary">
            {new Date()?.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Welcome Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4">
                  Welcome Back
                </h2>
                <p className="text-lg font-body text-text-secondary leading-relaxed">
                  Access your geological monitoring dashboard to track real-time rockfall 
                  predictions, manage alerts, and ensure safety across monitored zones.
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  System Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: 'Activity', title: 'Real-time Monitoring', desc: 'Live geological data analysis' },
                    { icon: 'Bell', title: 'Instant Alerts', desc: 'Multi-channel notifications' },
                    { icon: 'Map', title: 'Risk Mapping', desc: 'Geographic visualization' },
                    { icon: 'Shield', title: 'Safety Systems', desc: 'Vehicle integration & protection' }
                  ]?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-md">
                      <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                        <Icon name={feature?.icon} size={16} color="var(--color-primary)" />
                      </div>
                      <div>
                        <h4 className="text-sm font-body font-medium text-text-primary">
                          {feature?.title}
                        </h4>
                        <p className="text-xs font-caption text-text-secondary">
                          {feature?.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Status Component */}
              <SystemStatus />
            </div>

            {/* Right Side - Login Form */}
            <div className="bg-surface border border-border rounded-lg shadow-card p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">
                  Sign In
                </h3>
                <p className="text-sm font-body text-text-secondary">
                  Enter your credentials to access the monitoring system
                </p>
              </div>

              {/* Login Form Component */}
              <LoginForm />

              {/* Security Badges Component */}
              <SecurityBadges />

              {/* Emergency Access Component */}
              <EmergencyAccess />
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-surface p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-xs font-caption text-text-secondary">
              <span>© {new Date()?.getFullYear()} RockGuard AI. All rights reserved.</span>
              <span>•</span>
              <span>Version 2.1.4</span>
              <span>•</span>
              <span>Last Updated: September 2025</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={14} color="var(--color-success)" />
                <span className="text-xs font-caption text-success">Secure Connection</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Globe" size={14} color="var(--color-text-secondary)" />
                <span className="text-xs font-caption text-text-secondary">Global Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;