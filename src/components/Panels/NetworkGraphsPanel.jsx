import React, { useState } from 'react';
import Card from '../UI/Card';
import PanelTitle from '../UI/PanelTitle';

const NetworkGraphsPanel = ({ networkData, loading, isDarkMode = true }) => {
  const [activeGraph, setActiveGraph] = useState('traffic');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const graphTypes = [
    { key: 'traffic', label: 'Traffic', icon: '📊' },
    { key: 'latency', label: 'Latency', icon: '⏱️' },
    { key: 'packetLoss', label: 'Packet Loss', icon: '📉' }
  ];

  const getCurrentGraphUrl = () => {
    if (!networkData) return null;
    
    switch (activeGraph) {
      case 'traffic':
        return networkData.traffic;
      case 'latency':
        return networkData.latency;
      case 'packetLoss':
        return networkData.packetLoss;
      default:
        return networkData.traffic;
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImageUrl('');
  };

  const renderGraphContent = () => {
    if (loading) {
      return (
        <div className="text-center py-8">
          <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>Loading...</div>
        </div>
      );
    }

    const imageUrl = getCurrentGraphUrl();
    
    if (!imageUrl) {
      return (
        <div className="text-center py-8">
          <div className="text-gray-500 italic">No data available for {activeGraph}</div>
        </div>
      );
    }
    
    return (
      <div className="flex justify-center">
        <img 
          src={imageUrl} 
          alt={`${activeGraph} graph`}
          className="max-w-full h-auto rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity duration-200"
          style={{ maxHeight: '300px' }}
          onClick={() => handleImageClick(imageUrl)}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div 
          className="text-center py-8 text-gray-500 italic" 
          style={{ display: 'none' }}
        >
          Failed to load {activeGraph} graph
        </div>
      </div>
    );
  };

  return (
    <Card isDarkMode={isDarkMode}>
      <PanelTitle title="Network Graphs" isDarkMode={isDarkMode} />
      
      {/* Graph type selector */}
      <div className="flex space-x-2 mb-4">
        {graphTypes.map((graphType) => (
          <button
            key={graphType.key}
            onClick={() => setActiveGraph(graphType.key)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeGraph === graphType.key
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white'
                : isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span>{graphType.icon}</span>
            <span>{graphType.label}</span>
          </button>
        ))}
      </div>

      {/* Graph content */}
      <div className="min-h-[300px] flex items-center justify-center">
        {renderGraphContent()}
      </div>

      {/* Graph info */}
      <div className="mt-4 text-center">
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Click on the buttons above to switch between different network graphs
        </p>
        <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          Click on the graph to enlarge it
        </p>
      </div>

      {/* Image Modal */}
      {showImageModal && selectedImageUrl && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50" 
          onClick={closeImageModal}
          style={{ 
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          <div 
            className="relative max-w-[90vw] max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeImageModal}
              className={`absolute -top-10 right-0 text-2xl font-bold hover:opacity-70 transition-opacity z-10 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              ×
            </button>
            
            {/* Image */}
            <img 
              src={selectedImageUrl} 
              alt={`${activeGraph} graph - enlarged`}
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              style={{
                background: 'rgba(20, 20, 20, 0.3)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)'
              }}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default NetworkGraphsPanel;
