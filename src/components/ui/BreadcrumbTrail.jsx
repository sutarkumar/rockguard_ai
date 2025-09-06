import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMap = {
    '/real-time-dashboard': 'Dashboard',
    '/alert-management': 'Alert Management',
    '/geological-data-analysis': 'Geological Data Analysis',
    '/system-administration': 'System Administration',
    '/login': 'Login',
    '/register': 'Register',
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/real-time-dashboard' }];

    let currentPath = '';
    pathSegments?.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = pathMap?.[currentPath] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      breadcrumbs?.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1 || location?.pathname === '/login' || location?.pathname === '/register') {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center space-x-2 px-4 lg:px-6 py-3 bg-background border-b border-border" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                color="var(--color-text-secondary)" 
                className="mx-2" 
              />
            )}
            {index === breadcrumbs?.length - 1 ? (
              <span className="text-sm font-body font-medium text-text-primary">
                {crumb?.label}
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(crumb?.path)}
                className="text-sm font-body font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {crumb?.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;