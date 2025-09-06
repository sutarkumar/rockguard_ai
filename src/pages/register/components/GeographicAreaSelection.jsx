import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const GeographicAreaSelection = ({ formData, handleInputChange, handleSelectChange, errors }) => {
  const [mapView, setMapView] = useState('satellite');

  const regionOptions = [
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'south-america', label: 'South America' },
    { value: 'africa', label: 'Africa' },
    { value: 'middle-east', label: 'Middle East' }
  ];

  const stateOptions = [
    { value: 'california', label: 'California' },
    { value: 'colorado', label: 'Colorado' },
    { value: 'washington', label: 'Washington' },
    { value: 'oregon', label: 'Oregon' },
    { value: 'montana', label: 'Montana' },
    { value: 'wyoming', label: 'Wyoming' },
    { value: 'utah', label: 'Utah' },
    { value: 'nevada', label: 'Nevada' }
  ];

  // Mock coordinates for demonstration
  const mockLat = 39.7392;
  const mockLng = -104.9903;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          Geographic Monitoring Areas
        </h3>
        <p className="text-sm font-body text-text-secondary">
          Select the geographic regions you want to monitor for geological risks
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Primary Region"
              name="primaryRegion"
              options={regionOptions}
              value={formData?.primaryRegion}
              onChange={(value) => handleSelectChange('primaryRegion', value)}
              error={errors?.primaryRegion}
              placeholder="Select region"
              required
            />

            <Select
              label="State/Province"
              name="state"
              options={stateOptions}
              value={formData?.state}
              onChange={(value) => handleSelectChange('state', value)}
              error={errors?.state}
              placeholder="Select state"
              searchable
              required
            />
          </div>

          <Input
            label="City/Area"
            type="text"
            name="city"
            placeholder="Enter city or specific area"
            value={formData?.city}
            onChange={handleInputChange}
            error={errors?.city}
            description="Specific city or area of interest"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Latitude"
              type="number"
              name="latitude"
              placeholder="39.7392"
              value={formData?.latitude}
              onChange={handleInputChange}
              error={errors?.latitude}
              description="Decimal degrees"
            />

            <Input
              label="Longitude"
              type="number"
              name="longitude"
              placeholder="-104.9903"
              value={formData?.longitude}
              onChange={handleInputChange}
              error={errors?.longitude}
              description="Decimal degrees"
            />
          </div>

          <Input
            label="Monitoring Radius"
            type="number"
            name="monitoringRadius"
            placeholder="50"
            value={formData?.monitoringRadius}
            onChange={handleInputChange}
            error={errors?.monitoringRadius}
            description="Radius in kilometers"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-body font-medium text-text-primary">
              Interactive Map
            </h4>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setMapView('satellite')}
                className={`px-3 py-1 text-xs font-caption rounded-md transition-colors duration-200 ${
                  mapView === 'satellite' ?'bg-primary text-primary-foreground' :'bg-muted text-text-secondary hover:text-text-primary'
                }`}
              >
                Satellite
              </button>
              <button
                type="button"
                onClick={() => setMapView('terrain')}
                className={`px-3 py-1 text-xs font-caption rounded-md transition-colors duration-200 ${
                  mapView === 'terrain' ?'bg-primary text-primary-foreground' :'bg-muted text-text-secondary hover:text-text-primary'
                }`}
              >
                Terrain
              </button>
            </div>
          </div>

          <div className="relative w-full h-64 bg-muted rounded-md overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Geographic Area Selection"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${mockLat},${mockLng}&z=10&output=embed`}
              className="border-0"
            />
            <div className="absolute top-2 right-2 bg-surface/90 backdrop-blur-sm rounded-md p-2">
              <Icon name="MapPin" size={16} color="var(--color-primary)" />
            </div>
          </div>

          <div className="bg-accent/10 p-3 rounded-md">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} color="var(--color-accent)" className="mt-0.5" />
              <div>
                <p className="text-xs font-caption font-medium text-accent mb-1">
                  Map Integration
                </p>
                <p className="text-xs font-caption text-text-secondary">
                  Click on the map to set precise coordinates or use the search function to find specific locations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicAreaSelection;