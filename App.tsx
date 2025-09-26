// FIX: Changed React import from namespace import ('* as React') to default import ('React') to resolve widespread JSX intrinsic element type errors. The default import is standard with modern TypeScript/React configurations and should restore the correct JSX type definitions.
import React from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeScreen from './components/HomeScreen';
import BookingScreen from './components/BookingScreen';
import MapScreen from './components/MapScreen';
import EmergencyScreen from './components/EmergencyScreen';
import YatraScreen from './components/YatraScreen';
import HelpModal from './components/HelpModal';
import { View, Temple } from './types';
import { TEMPLES } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = React.useState<View>(View.Home);
  const [selectedTemple, setSelectedTemple] = React.useState<Temple>(TEMPLES[0]);
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const [isHelpModalOpen, setHelpModalOpen] = React.useState(false);
  const [poiToHighlight, setPoiToHighlight] = React.useState<string | null>(null);
  const [yatraInitialTab, setYatraInitialTab] = React.useState<'journey' | 'history'>('journey');

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleNavigate = (poiId: string) => {
    setPoiToHighlight(poiId);
    setCurrentView(View.Map);
    setHelpModalOpen(false);
  };

  const handleBooking = () => {
    setCurrentView(View.Booking);
    setHelpModalOpen(false);
  };

  const handleViewHistory = () => {
    setYatraInitialTab('history');
    setCurrentView(View.Yatra);
    setHelpModalOpen(false);
  };

  const handleNavigateToView = (view: string) => {
    switch (view) {
      case 'Booking':
        setCurrentView(View.Booking);
        break;
      case 'Map':
        setCurrentView(View.Map);
        break;
      case 'Emergency':
        setCurrentView(View.Emergency);
        break;
      case 'Calendar':
        setCurrentView(View.Calendar);
        break;
      case 'Yatra':
        setCurrentView(View.Yatra);
        break;
      default:
        console.warn(`Unknown view: ${view}`);
        break;
    }
    setHelpModalOpen(false);
  };

  const renderView = () => {
    switch (currentView) {
      case View.Home:
        return <HomeScreen
                  isOnline={isOnline}
                  onNavigate={handleNavigateToView}
                  selectedTemple={selectedTemple}
                  onTempleChange={setSelectedTemple}
                />;
      case View.Booking:
        return <BookingScreen isOnline={isOnline} />;
      case View.Map:
        return <MapScreen 
                  highlightPOI={poiToHighlight} 
                  onHighlightDone={() => setPoiToHighlight(null)}
                />;
      case View.Calendar:
        return <HomeScreen
                  isOnline={isOnline}
                  onNavigate={handleNavigateToView}
                  selectedTemple={selectedTemple}
                  onTempleChange={setSelectedTemple}
                />;
      case View.Emergency:
        return <EmergencyScreen />;
      case View.Yatra:
        return <YatraScreen 
                  onNavigate={handleNavigate}
                  initialTab={yatraInitialTab}
                />;
      default:
        return <HomeScreen
                  isOnline={isOnline}
                  onNavigate={handleNavigateToView}
                  selectedTemple={selectedTemple}
                  onTempleChange={setSelectedTemple}
                />;
    }
  };

  return (
    <div className="min-h-screen bg-amber-200 font-sans p-0 sm:p-4">
      <div className={`relative w-full max-w-6xl mx-auto bg-amber-50 shadow-2xl flex flex-col overflow-hidden h-screen sm:h-[calc(100vh-2rem)] sm:rounded-3xl sm:border-4 border-gray-800 transition-colors duration-300`}>
        <Header 
          selectedTemple={selectedTemple} 
          setSelectedTemple={setSelectedTemple}
          isOnline={isOnline}
        />
        <main className="flex-grow overflow-y-auto p-4 sm:p-6 transition-all duration-300 ease-in-out">
          <div className="animate-fade-in">
            {renderView()}
          </div>
        </main>
        <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
        
        <button
          onClick={() => setHelpModalOpen(true)}
          className="absolute bottom-20 right-5 bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 z-10"
          aria-label="Open AI Help Assistant"
        >
          <iconify-icon icon="ph:chats-circle-bold" className="text-4xl"></iconify-icon>
        </button>

        {isHelpModalOpen && (
          <HelpModal 
            isOnline={isOnline} 
            closeModal={() => setHelpModalOpen(false)} 
            onNavigate={handleNavigate}
            onBooking={handleBooking}
            onViewHistory={handleViewHistory}
          />
        )}
      </div>
    </div>
  );
};

export default App;