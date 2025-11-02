import React, { useState } from 'react';
import Card from '../UI/Card';
import PanelTitle from '../UI/PanelTitle';

const PiLogsPanel = ({ logsData, loading, isDarkMode = true, isLoggedIn = false }) => {
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);

  const filteredLogs = (logsData && isLoggedIn) ? logsData.filter(log => 
    log.message.toLowerCase().includes(filter.toLowerCase()) ||
    log.host.toLowerCase().includes(filter.toLowerCase())
  ) : [];

  const displayedLogs = showAll ? filteredLogs : filteredLogs.slice(0, 10);

  const getLogLevelColor = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes('error') || msg.includes('failed')) return 'text-red-400';
    if (msg.includes('warn')) return 'text-yellow-400';
    if (msg.includes('info')) return 'text-blue-400';
    return isDarkMode ? 'text-gray-300' : 'text-gray-700';
  };

  const truncateMessage = (message, maxLines = 2) => {
    const lines = message.split('\n');
    if (lines.length <= maxLines) {
      return { text: message, isTruncated: false };
    }
    return {
      text: lines.slice(0, maxLines).join('\n'),
      isTruncated: true,
      fullText: message
    };
  };

  const handleLogClick = (log) => {
    setSelectedLog(log);
    setShowLogModal(true);
  };

  return (
    <Card isDarkMode={isDarkMode}>
      <PanelTitle title="Raspberry PI Logs" isDarkMode={isDarkMode} />
      
      {/* Filter input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter logs..."
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
        className={`space-y-2 overflow-y-auto custom-scrollbar ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
        style={{ maxHeight: '35vh' }}
      >
        {loading ? (
          <div className="text-center py-8">
            <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>Loading...</div>
          </div>
        ) : displayedLogs.length > 0 ? (
          displayedLogs.map((log, index) => {
            const truncated = truncateMessage(log.message);
            return (
              <div key={index} className="border-b border-gray-600 pb-2 last:border-b-0">
                <div className="flex items-start justify-between text-xs text-gray-400 mb-1">
                  <span>{log.date}</span>
                  <span>{log.host}</span>
                </div>
                <div className={`text-sm ${getLogLevelColor(log.message)}`}>
                  <pre className="whitespace-pre-wrap break-words font-sans !select-text">
                    {truncated.text}
                  </pre>
                  {truncated.isTruncated && (
                    <button
                      onClick={() => handleLogClick(log)}
                      className="text-blue-400 hover:text-blue-300 text-xs underline mt-1 block"
                    >
                      Zobrazit celou zprávu...
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-500 italic">
              {filter ? 'No logs match the filter' : isLoggedIn ? 'No logs available' : 'You need to log in to see logs'}
            </div>
          </div>
        )}
      </div>

      {/* Show more/less button */}
      {filteredLogs.length > 10 && (
        <div className="mt-3 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className={`text-sm px-4 py-2 rounded-md transition-colors duration-200 ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            {showAll ? 'Show Less' : `Show All (${filteredLogs.length})`}
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

      {/* Log Detail Modal */}
      {showLogModal && selectedLog && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50" 
          onClick={() => setShowLogModal(false)}
          style={{ 
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)'
          }}
        >
          <div 
            className={`relative max-w-4xl max-h-[80vh] mx-4 rounded-lg shadow-xl ${
              isDarkMode ? 'bg-[#2d3748]' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-4 border-b ${
              isDarkMode ? 'border-gray-600' : 'border-gray-300'
            }`}>
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Log Detail
              </h3>
              <button
                onClick={() => setShowLogModal(false)}
                className={`text-2xl font-bold hover:opacity-70 transition-opacity ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <strong>Date:</strong> {selectedLog.date}
                  </span>
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <strong>Host:</strong> {selectedLog.host}
                  </span>
                </div>
              </div>
              
              <div className={`p-4 rounded-md overflow-auto max-h-96 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <pre className={`whitespace-pre-wrap break-words font-mono text-sm ${
                  getLogLevelColor(selectedLog.message)
                } !select-text`}>
                  {selectedLog.message}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`flex justify-end p-4 border-t ${
              isDarkMode ? 'border-gray-600' : 'border-gray-300'
            }`}>
              <button
                onClick={() => setShowLogModal(false)}
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                Zavřít
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PiLogsPanel;
