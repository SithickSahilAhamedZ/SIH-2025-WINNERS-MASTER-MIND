// FIX: Changed React import from namespace import ('* as React') to default import ('React') to resolve widespread JSX intrinsic element type errors. The default import is standard with modern TypeScript/React configurations and should restore the correct JSX type definitions.
import React from 'react';
import { Temple } from '../types';
import { TEMPLES } from '../constants';

interface HeaderProps {
  selectedTemple: Temple;
  setSelectedTemple: (temple: Temple) => void;
  isOnline?: boolean;
}

// Fix: Create the Header component to resolve the module not found error.
const Header: React.FC<HeaderProps> = ({ selectedTemple, setSelectedTemple, isOnline = true }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleSelectTemple = (temple: Temple) => {
    setSelectedTemple(temple);
    setDropdownOpen(false);
  };

  return (
    <header className="relative bg-white/95 backdrop-blur-sm p-4 border-b border-gray-200 shadow-sm rounded-t-3xl flex-shrink-0">
      {!isOnline && (
        <div className="bg-red-600 text-white text-center py-1 text-xs font-semibold">
          <iconify-icon icon="mdi:wifi-off" className="inline mr-1"></iconify-icon>
          You are offline - Some features may be limited
        </div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">{selectedTemple.name}</h1>
          <p className="text-sm text-gray-500">{selectedTemple.location}</p>
        </div>
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            {/* Using iconify-icon custom element */}
            <iconify-icon icon="solar:alt-arrow-down-outline" className="text-gray-600 w-6 h-6"></iconify-icon>
          </button>
          {dropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-gray-100"
              role="menu"
            >
              {TEMPLES.map(temple => (
                <button
                  key={temple.id}
                  onClick={() => handleSelectTemple(temple)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 flex items-center"
                  role="menuitem"
                >
                  {temple.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;