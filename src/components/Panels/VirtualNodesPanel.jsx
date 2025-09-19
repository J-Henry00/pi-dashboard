import React from 'react';
import Card from '../UI/Card';
import PanelTitle from '../UI/PanelTitle';

import localAddresses from '../../utils/localAddresses';

const VirtualNodesPanel = ({ servers, isDarkMode = true, isLoggedIn = false, onKillNode, killingServerId }) => {
  // Filter servers to only include those with "virtual" in their hostname
  const virtualServers = servers.filter(server => 
    server.hostname && server.hostname.toLowerCase().includes('virtual')
  );

  // Separate servers with port 6000 from others
  const port6000Servers = virtualServers.filter(server => server.port === 6000);
  const otherVirtualServers = virtualServers.filter(server => server.port !== 6000);
  
  // Define the loading spinner styles
  const loadingStyles = `
    .loading-spinner {
      border: 2px solid rgba(255, 255, 255, 0.5);
      border-top: 2px solid #fff;
      border-radius: 50%;
      width: 1rem;
      height: 1rem;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <Card isDarkMode={isDarkMode}>
      <PanelTitle title="Virtual Nodes" isDarkMode={isDarkMode} />
      <div
        className={`space-y-2 overflow-y-auto custom-scrollbar ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
        style={{ maxHeight: '40vh' }}
      >
        {virtualServers.length > 0 ? (
          <>
            {/* Port 6000 servers at the top */}
            {port6000Servers.map((server, index) => (
              <div key={`6000-${index}`} className='mb-[1vh] flex items-center justify-between'>
                <div>
                  <strong>{server.protocol}</strong> on port <strong>{server.port}</strong>: <a target='_blank' href={server.protocol.toLowerCase() + "://" + server.hostname} className="text-blue-400 hover:underline">{server.hostname}</a> { localAddresses.includes(window.location.hostname) && (<span>(<strong><a href={server.local.replace('localhost', window.location.hostname)} target="_blank" className='hover:underline'>{server.local.replace('localhost', window.location.hostname)}</a></strong>)</span>) }
                </div>
                {/* No kill button for port 6000 servers */}
              </div>
            ))}
            
            {/* Horizontal rule if both port 6000 and other servers exist */}
            {port6000Servers.length > 0 && otherVirtualServers.length > 0 && (
              <hr className={`my-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
            )}
            
            {/* Other virtual servers */}
            {otherVirtualServers.map((server, index) => {
              const isKilling = killingServerId === server.hostname.split('.')[0];
              return (
                <div key={`other-${index}`} className='mb-[1vh] flex items-center justify-between'>
                  <div>
                    <strong>{server.protocol}</strong> on port <strong>{server.port}</strong>: <a target='_blank' href={server.protocol.toLowerCase() + "://" + server.hostname} className="text-blue-400 hover:underline">{server.hostname}</a> { localAddresses.includes(window.location.hostname) && (<span>(<strong><a href={server.local.replace('localhost', window.location.hostname)} target="_blank" className='hover:underline'>{server.local.replace('localhost', window.location.hostname)}</a></strong>)</span>) }
                  </div>
                  {isLoggedIn && (
                    <button
                      onClick={() => onKillNode(server.hostname.split('.')[0])}
                      disabled={isKilling}
                      className={`ml-2 px-2 py-1 text-white text-xs rounded transition-colors duration-200 flex items-center justify-center ${
                        isKilling 
                          ? 'bg-gray-500 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                      title="Kill Virtual Node"
                    >
                      {isKilling ? (
                        <>
                          <div className="loading-spinner mr-2"></div>
                          <span>Killing...</span>
                        </>
                      ) : (
                        <span>Kill</span>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <div className="text-gray-500 italic">
            No virtual nodes found
          </div>
        )}
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fff; /* White handle */
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; /* Invisible background */
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #fff transparent;
        }
      `}</style>
    </Card>
  );
};

export default VirtualNodesPanel;