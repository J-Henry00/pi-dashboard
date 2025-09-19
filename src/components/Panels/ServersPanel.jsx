import React, { useState } from 'react';
import Card from '../UI/Card';
import PanelTitle from '../UI/PanelTitle';

import localAddresses from '../../utils/localAddresses';

const ServersPanel = ({ servers, loading, isDarkMode = true }) => {
  // Stav pro uložení vybraných protokolů
  const [selectedProtocols, setSelectedProtocols] = useState([]);

  // Vytvoření seznamu unikátních protokolů z dat
  const uniqueProtocols = [...new Set(servers.map(server => server.protocol))];

  // Funkce pro změnu stavu protokolu
  const handleProtocolChange = (protocol) => {
    setSelectedProtocols(prevProtocols =>
      prevProtocols.includes(protocol)
        ? prevProtocols.filter(p => p !== protocol)
        : [...prevProtocols, protocol]
    );
  };

  // Filtrování serverů podle protokolu a "virtual" serverů
  const filteredServers = servers.filter(server => {
    // Původní logika filtru pro virtuální servery
    const isVirtual = server.hostname && server.hostname.toLowerCase().includes('virtual');
    const isPort6000 = server.port === 6000;
    const isVisibleByVirtualFilter = !isVirtual || (isVirtual && isPort6000);
    
    // Nová logika filtru pro protokoly
    const isVisibleByProtocolFilter = selectedProtocols.length === 0 || selectedProtocols.includes(server.protocol);
    
    // Server se zobrazí, pokud vyhovuje oběma filtrům
    return isVisibleByVirtualFilter && isVisibleByProtocolFilter;
  });

  return (
    <Card isDarkMode={isDarkMode}>
      <PanelTitle title="Active public servers" isDarkMode={isDarkMode} />
      
      {/* UI pro filtrování protokolů */}
      <div className="flex flex-wrap gap-2 mb-4">
        {uniqueProtocols.map(protocol => (
          <label key={protocol} className="flex items-center space-x-1 cursor-pointer">
            <input
              type="checkbox"
              className={`form-checkbox h-4 w-4 rounded transition-colors duration-200 ${isDarkMode ? 'text-blue-600 bg-gray-700' : 'text-blue-600 bg-gray-200'}`}
              checked={selectedProtocols.includes(protocol)}
              onChange={() => handleProtocolChange(protocol)}
            />
            <span className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{protocol}</span>
          </label>
        ))}
      </div>

      <div
        className={`space-y-2 overflow-y-auto custom-scrollbar ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
        style={{ maxHeight: '20vh' }}
      >
        {loading ? (
          <div className="text-center py-8">
            <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>Loading...</div>
          </div>
        ) : filteredServers.length > 0 ? (
          filteredServers.map((server, index) => (
            <div key={index} className='mb-[1vh]'>
              <strong>{server.protocol}</strong> on port <strong>{server.port}</strong>: <a target='_blank' href={server.protocol.toLowerCase() + "://" + server.hostname} className="text-blue-400 hover:underline">{server.hostname}</a> { localAddresses.includes(window.location.hostname) && (<span>(<strong><a href={server.local.replace('localhost', window.location.hostname)} target="_blank" className='hover:underline'>{server.local.replace('localhost', window.location.hostname)}</a></strong>)</span>) }
            </div>
          ))
        ) : (
          <div className="text-gray-500 italic">
            No servers found
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

export default ServersPanel;