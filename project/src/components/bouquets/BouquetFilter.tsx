import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
}

interface BouquetFilterProps {
  onFilterChange: (filters: Record<string, string[]>) => void;
  onSortChange: (sort: string) => void;
}

const BouquetFilter: React.FC<BouquetFilterProps> = ({ onFilterChange, onSortChange }) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    occasions: [],
    flowers: [],
    colors: [],
    price: []
  });
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    occasions: true,
    flowers: true,
    colors: true,
    price: true
  });
  
  const occasionOptions: FilterOption[] = [
    { id: 'birthday', label: 'Birthday' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'congratulations', label: 'Congratulations' },
    { id: 'sympathy', label: 'Sympathy' },
    { id: 'get-well', label: 'Get Well' }
  ];
  
  const flowerOptions: FilterOption[] = [
    { id: 'roses', label: 'Roses' },
    { id: 'tulips', label: 'Tulips' },
    { id: 'lilies', label: 'Lilies' },
    { id: 'sunflowers', label: 'Sunflowers' },
    { id: 'orchids', label: 'Orchids' },
    { id: 'carnations', label: 'Carnations' }
  ];
  
  const colorOptions: FilterOption[] = [
    { id: 'red', label: 'Red' },
    { id: 'pink', label: 'Pink' },
    { id: 'white', label: 'White' },
    { id: 'yellow', label: 'Yellow' },
    { id: 'purple', label: 'Purple' },
    { id: 'blue', label: 'Blue' }
  ];
  
  const priceOptions: FilterOption[] = [
    { id: 'under-50', label: 'Under $50' },
    { id: '50-100', label: '$50 - $100' },
    { id: '100-150', label: '$100 - $150' },
    { id: 'over-150', label: 'Over $150' }
  ];
  
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];
  
  const toggleExpanded = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
  
  const handleFilterChange = (category: string, value: string) => {
    let newFilters = { ...activeFilters };
    
    if (newFilters[category].includes(value)) {
      newFilters[category] = newFilters[category].filter(item => item !== value);
    } else {
      newFilters[category] = [...newFilters[category], value];
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const clearAllFilters = () => {
    const resetFilters = {
      occasions: [],
      flowers: [],
      colors: [],
      price: []
    };
    
    setActiveFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  const countActiveFilters = () => {
    return Object.values(activeFilters).flat().length;
  };
  
  const renderFilterSection = (
    title: string, 
    options: FilterOption[], 
    category: string
  ) => {
    return (
      <div className="border-b border-gray-200 py-4">
        <button 
          className="flex items-center justify-between w-full"
          onClick={() => toggleExpanded(category)}
        >
          <h3 className="font-medium text-[#37474F]">{title}</h3>
          {expandedSections[category] ? (
            <ChevronUp size={18} className="text-[#78909C]" />
          ) : (
            <ChevronDown size={18} className="text-[#78909C]" />
          )}
        </button>
        
        {expandedSections[category] && (
          <div className="mt-2 space-y-1">
            {options.map((option) => (
              <div key={option.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${category}-${option.id}`}
                  checked={activeFilters[category].includes(option.id)}
                  onChange={() => handleFilterChange(category, option.id)}
                  className="h-4 w-4 rounded border-gray-300 text-[#F8BBD0] focus:ring-[#F8BBD0]"
                />
                <label
                  htmlFor={`${category}-${option.id}`}
                  className="ml-2 text-sm text-[#37474F]"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-100">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden p-4 border-b border-gray-200">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center">
            <Filter size={18} className="text-[#37474F] mr-2" />
            <span className="font-medium text-[#37474F]">Filters</span>
            {countActiveFilters() > 0 && (
              <span className="ml-2 bg-[#F8BBD0] text-white rounded-full text-xs px-2 py-0.5">
                {countActiveFilters()}
              </span>
            )}
          </div>
          {isMobileFilterOpen ? (
            <ChevronUp size={18} className="text-[#78909C]" />
          ) : (
            <ChevronDown size={18} className="text-[#78909C]" />
          )}
        </button>
      </div>
      
      {/* Filter Content */}
      <div className={`lg:block ${isMobileFilterOpen ? 'block' : 'hidden'}`}>
        <div className="p-4">
          {/* Sort By (Mobile) */}
          <div className="lg:hidden mb-4">
            <label className="block text-sm font-medium text-[#37474F] mb-1">
              Sort By
            </label>
            <select
              onChange={(e) => onSortChange(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F8BBD0] focus:ring-[#F8BBD0] sm:text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Active Filters */}
          {countActiveFilters() > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-[#37474F]">Active Filters</h3>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#F8BBD0] hover:text-[#C48B9F] transition-colors duration-300"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(activeFilters).map(([category, values]) => (
                  values.map((value) => {
                    let label = '';
                    
                    if (category === 'occasions') {
                      label = occasionOptions.find(o => o.id === value)?.label || '';
                    } else if (category === 'flowers') {
                      label = flowerOptions.find(o => o.id === value)?.label || '';
                    } else if (category === 'colors') {
                      label = colorOptions.find(o => o.id === value)?.label || '';
                    } else if (category === 'price') {
                      label = priceOptions.find(o => o.id === value)?.label || '';
                    }
                    
                    return (
                      <div
                        key={`${category}-${value}`}
                        className="flex items-center bg-[#FFF1F8] text-[#37474F] rounded-full px-3 py-1"
                      >
                        <span className="text-xs">{label}</span>
                        <button
                          onClick={() => handleFilterChange(category, value)}
                          className="ml-1 text-[#F8BBD0]"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })
                ))}
              </div>
            </div>
          )}
          
          {/* Filter Sections */}
          {renderFilterSection('Occasions', occasionOptions, 'occasions')}
          {renderFilterSection('Flower Types', flowerOptions, 'flowers')}
          {renderFilterSection('Colors', colorOptions, 'colors')}
          {renderFilterSection('Price Range', priceOptions, 'price')}
        </div>
      </div>
    </div>
  );
};

export default BouquetFilter;