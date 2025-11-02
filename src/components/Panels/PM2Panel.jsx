import React from 'react';
import Card from '../UI/Card';
import PanelTitle from '../UI/PanelTitle';

const PM2Panel = ({ pm2Data, loading, isDarkMode = true, isLoggedIn = false }) => {
  const getStatusColor = (online) => {
    return online ? 'text-green-400' : 'text-red-400';
  };

  const getStatusText = (online) => {
    return online ? 'Online' : 'Offline';
  };

  return (
    <Card isDarkMode={isDarkMode}>
      <PanelTitle title="PM2 Node.js Sessions" isDarkMode={isDarkMode} />
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
        ) : pm2Data && pm2Data.length > 0 ? (
          pm2Data.map((process, index) => (
            <div key={process.id} className="border-b border-gray-600 pb-3 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} !select-text`}>
                  {process.name}
                </h3>
                <span className={`text-sm font-medium ${getStatusColor(process.online)}`}>
                  {getStatusText(process.online)}
                </span>
              </div>
              
              <div className="space-y-1 text-sm">
                <p><strong>ID:</strong> <span className='!select-text'>{process.id}</span></p>
                <p><strong>PID:</strong> <span className='!select-text'>{process.pid}</span></p>
                <p><strong>CPU:</strong> <span className="text-yellow-400">{process.cpu}%</span></p>
                <p><strong>RAM:</strong> <span className="text-yellow-400">{process.ram}</span></p>
              </div>

              {(process.commands && isLoggedIn) && (
                <div className="mt-2 pt-2 border-t border-gray-600">
                  <p className="text-xs text-gray-400 mb-1">Commands:</p>
                  <div className="space-y-1">
                    <button
                      disabled={true}
                      className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded mr-1"
                      onClick={() => navigator.clipboard.writeText(process.commands.start)}
                      title="Copy to clipboard"
                    >
                      Start
                    </button>
                    <button
                      disabled={true}
                      className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded mr-1"
                      onClick={() => navigator.clipboard.writeText(process.commands.stop)}
                      title="Copy to clipboard"
                    >
                      Stop
                    </button>
                    <button
                      disabled={true}
                      className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded mr-1"
                      onClick={() => navigator.clipboard.writeText(process.commands.restart)}
                      title="Copy to clipboard"
                    >
                      Restart
                    </button>
                    <button
                      disabled={true}
                      className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                      onClick={() => navigator.clipboard.writeText(process.commands.logs)}
                      title="Copy to clipboard"
                    >
                      Logs
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-500 italic">No PM2 processes found</div>
          </div>
        )}
      </div>
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

export default PM2Panel;
