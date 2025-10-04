import React, { useState } from 'react';
import Card from '../UI/Card';
import PanelTitle from '../UI/PanelTitle';

const DockerPanel = ({ dockerData, loading, isDarkMode = true }) => {
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState('');

  const filteredContainers = dockerData ? dockerData.filter(container => 
    container.name.toLowerCase().includes(filter.toLowerCase()) ||
    container.image.toLowerCase().includes(filter.toLowerCase()) ||
    container.status.toLowerCase().includes(filter.toLowerCase())
  ) : [];

  const displayedContainers = showAll ? filteredContainers : filteredContainers.slice(0, 5);

  const getStatusColor = (status) => {
    const stat = status.toLowerCase();
    if (stat.includes('running')) return 'text-green-400';
    if (stat.includes('stopped') || stat.includes('exited')) return 'text-red-400';
    if (stat.includes('paused')) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const getStatusIcon = (status) => {
    const stat = status.toLowerCase();
    if (stat.includes('running')) return '🟢';
    if (stat.includes('stopped') || stat.includes('exited')) return '🔴';
    if (stat.includes('paused')) return '🟡';
    return '⚪';
  };

  return (
    <Card isDarkMode={isDarkMode}>
      <PanelTitle title="Docker Containers" isDarkMode={isDarkMode} />
      
      {/* Filter input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter containers..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={`w-full px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
              : 'bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-300'
          } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>

      <div
        className={`space-y-3 overflow-y-auto custom-scrollbar ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
        style={{ maxHeight: '35vh' }}
      >
        {loading ? (
          <div className="text-center py-8">
            <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>Loading...</div>
          </div>
        ) : displayedContainers.length > 0 ? (
          displayedContainers.map((container, index) => (
            <div key={container.id} className="border-b border-gray-600 pb-3 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {container.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getStatusIcon(container.status)}</span>
                  <span className={`text-sm font-medium ${getStatusColor(container.status)}`}>
                    {container.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1 text-sm">
                <p><strong>ID:</strong> {container.id}</p>
                <p><strong>Image:</strong> <span className="text-blue-400">{container.image}</span></p>
                <p><strong>Command:</strong> <span className="text-gray-400 font-mono text-xs">{container.command}</span></p>
                
                {container.ports && container.ports.length > 0 && (
                  <div>
                    <p><strong>Ports:</strong></p>
                    <div className="ml-2 space-y-1">
                      {container.ports.map((port, portIndex) => (
                        <div key={portIndex} className="text-xs">
                          <span className="text-green-400">{port.publicPort}</span>
                          <span className="text-gray-400"> → </span>
                          <span className="text-blue-400">{port.privatePort}</span>
                          <span className="text-gray-400"> ({port.type})</span>
                          {port.ip && (
                            <span className="text-gray-400"> @ {port.ip}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-500 italic">
              {filter ? 'No containers match the filter' : 'No Docker containers found'}
            </div>
          </div>
        )}
      </div>

      {/* Show more/less button */}
      {filteredContainers.length > 5 && (
        <div className="mt-3 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className={`text-sm px-4 py-2 rounded-md transition-colors duration-200 ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            {showAll ? 'Show Less' : `Show All (${filteredContainers.length})`}
          </button>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fff;
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #fff transparent;
        }
      `}</style>
    </Card>
  );
};

export default DockerPanel;
