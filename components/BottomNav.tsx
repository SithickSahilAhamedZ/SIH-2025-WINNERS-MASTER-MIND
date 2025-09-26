// FIX: Changed React import from namespace import ('* as React') to default import ('React') to resolve widespread JSX intrinsic element type errors. The default import is standard with modern TypeScript/React configurations and should restore the correct JSX type definitions.
import React from 'react';
import { View } from '../types';

interface BottomNavProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  const activeClass = isActive ? 'text-orange-600' : 'text-gray-500';

  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      className={`relative flex flex-col items-center justify-center w-1/5 h-full transition-colors duration-200 hover:text-orange-500 focus:outline-none focus:text-orange-600 ${activeClass}`}
    >
      {isActive && (
        <span className="absolute top-0 h-1 w-8 bg-orange-500 rounded-b-full transition-all duration-300"></span>
      )}
      <iconify-icon icon={icon} className="h-6 w-6"></iconify-icon>
      <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-normal'}`}>{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView }) => {
  return (
    <nav className="h-16 bg-white/95 backdrop-blur-sm border-t border-gray-200 flex justify-around items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] rounded-b-3xl flex-shrink-0">
      <NavItem
        icon="solar:home-2-bold-duotone"
        label="Home"
        isActive={currentView === View.Home}
        onClick={() => setCurrentView(View.Home)}
      />
      <NavItem
        icon="solar:ticket-bold-duotone"
        label="Booking"
        isActive={currentView === View.Booking}
        onClick={() => setCurrentView(View.Booking)}
      />
      <NavItem
        icon="solar:map-bold-duotone"
        label="Map"
        isActive={currentView === View.Map}
        onClick={() => setCurrentView(View.Map)}
      />
      <NavItem
        icon="solar:siren-rounded-bold-duotone"
        label="Emergency"
        isActive={currentView === View.Emergency}
        onClick={() => setCurrentView(View.Emergency)}
      />
      <NavItem
        icon="solar:compass-bold-duotone"
        label="My Yatra"
        isActive={currentView === View.Yatra}
        onClick={() => setCurrentView(View.Yatra)}
      />
    </nav>
  );
};

export default BottomNav;