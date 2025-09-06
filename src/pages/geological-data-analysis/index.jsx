import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import DataVisualizationPanel from './components/DataVisualizationPanel';
import DataFilterControls from './components/DataFilterControls';
import SensorDataTable from './components/SensorDataTable';
import ComparisonTools from './components/ComparisonTools';
import AlertThresholdVisualization from './components/AlertThresholdVisualization';
import StatisticalSummary from './components/StatisticalSummary';
import DataSourceIntegration from './components/DataSourceIntegration';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const GeologicalDataAnalysis = () => {
  const [activeTab, setActiveTab] = useState('visualization');
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const tabs = [
    { id: 'visualization', label: 'Data Visualization', icon: 'BarChart3' },
    { id: 'comparison', label: 'Comparison Tools', icon: 'GitCompare' },
    { id: 'thresholds', label: 'Alert Thresholds', icon: 'AlertTriangle' },
    { id: 'statistics', label: 'Statistics', icon: 'TrendingUp' },
    { id: 'sensors', label: 'Sensor Data', icon: 'Database' },
    { id: 'sources', label: 'Data Sources', icon: 'Plug' }
  ];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const exportAnalysis = () => {
    console.log('Exporting analysis data...');
    // Mock export functionality
  };

  const generateReport = () => {
    console.log('Generating comprehensive report...');
    // Mock report generation
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'visualization':
        return <DataVisualizationPanel />;
      case 'comparison':
        return <ComparisonTools />;
      case 'thresholds':
        return <AlertThresholdVisualization />;
      case 'statistics':
        return <StatisticalSummary />;
      case 'sensors':
        return <SensorDataTable />;
      case 'sources':
        return <DataSourceIntegration />;
      default:
        return <DataVisualizationPanel />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Geological Data Analysis - RockGuard AI</title>
          <meta name="description" content="Comprehensive geological data analysis with AI predictions and sensor monitoring" />
        </Helmet>
        
        <Header />
        
        <div className="pt-16">
          <BreadcrumbTrail />
          
          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
                Loading Analysis Data
              </h2>
              <p className="text-sm font-body text-text-secondary">
                Fetching geological sensor data and AI predictions...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Geological Data Analysis - RockGuard AI</title>
        <meta name="description" content="Comprehensive geological data analysis with AI predictions, sensor monitoring, and risk assessment tools" />
        <meta name="keywords" content="geological analysis, seismic data, ground movement, AI predictions, sensor monitoring" />
      </Helmet>
      <Header />
      <div className="pt-16">
        <BreadcrumbTrail />
        
        <div className="px-4 lg:px-6 py-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Geological Data Analysis
              </h1>
              <p className="text-lg font-body text-text-secondary">
                Comprehensive analysis of sensor data, AI predictions, and historical trends for risk assessment
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6 lg:mt-0">
              <Button
                variant="outline"
                onClick={exportAnalysis}
                iconName="Download"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Export Analysis
              </Button>
              
              <Button
                variant="default"
                onClick={generateReport}
                iconName="FileText"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Generate Report
              </Button>
            </div>
          </div>

          {/* System Status Banner */}
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <Icon name="Activity" size={20} color="var(--color-success)" />
              <div className="flex-1">
                <h3 className="text-sm font-body font-semibold text-success mb-1">
                  Analysis System Online
                </h3>
                <p className="text-xs font-caption text-success/80">
                  All data sources connected • Last updated: January 6, 2025 at 6:59 AM • Processing 15.7K data points
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs font-caption text-success font-medium">Live</span>
              </div>
            </div>
          </div>

          {/* Data Filter Controls */}
          <div className="mb-6">
            <DataFilterControls onFiltersChange={handleFiltersChange} />
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-body font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {renderTabContent()}
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Quick Actions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                iconName="AlertTriangle"
                iconPosition="left"
                className="w-full justify-start"
                onClick={() => setActiveTab('thresholds')}
              >
                Configure Alerts
              </Button>
              
              <Button
                variant="outline"
                iconName="GitCompare"
                iconPosition="left"
                className="w-full justify-start"
                onClick={() => setActiveTab('comparison')}
              >
                Compare Data
              </Button>
              
              <Button
                variant="outline"
                iconName="TrendingUp"
                iconPosition="left"
                className="w-full justify-start"
                onClick={() => setActiveTab('statistics')}
              >
                View Statistics
              </Button>
              
              <Button
                variant="outline"
                iconName="Settings"
                iconPosition="left"
                className="w-full justify-start"
                onClick={() => setActiveTab('sources')}
              >
                Manage Sources
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeologicalDataAnalysis;