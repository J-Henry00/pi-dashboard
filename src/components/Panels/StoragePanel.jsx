import React from 'react';
import Card from '../UI/Card';
import PanelTitle from '../UI/PanelTitle';
import { diskUsage } from '../../utils/getStatColor';

const StoragePanel = ({ storage, loading, isLoggedIn = false, isDarkMode = true }) => {
  return (
    <Card isDarkMode={isDarkMode}>
      <PanelTitle title={isLoggedIn ? "Storage (expert mode)" : "Storage"} isDarkMode={isDarkMode} />
      <div className={`space-y-2 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {loading ? (
          <>
            <div
              className={`space-y-2 overflow-y-auto custom-scrollbar ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
              style={{ maxHeight: '40vh' }}
            >
              <div className="mb-2">
                          <p><strong>File System: </strong> Loading...</p>
                          <p><strong>Mounted on: </strong> Loading...</p>
                          <p><strong>Capacity: </strong> <span>Loading...</span></p>
                        </div>
            </div>
          </>
        ) : storage ? (
          <>
            <div
              className={`space-y-2 overflow-y-auto custom-scrollbar ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
              style={{ maxHeight: '40vh' }}
            >
              {isLoggedIn ?  
                <>
                  {storage.advanced && storage.advanced.length > 0 ? (
                    storage.advanced.map((s, idx) => (
                      <React.Fragment key={s.filesystem + s.mount + idx}>
                        <div className="mb-2">
                          <p><strong>File System: </strong> {s.filesystem}</p>
                          <p><strong>Mounted on: </strong> {s.mount}</p>
                          <p><strong>Capacity: </strong> <span className={diskUsage(s.fullPercent, isDarkMode)}>{isDarkMode ? <>{s.fullGB} / {s.totalGB} GB ({s.fullPercent} %)</> : <strong>{s.fullGB} / {s.totalGB} GB ({s.fullPercent} %)</strong>}</span></p>
                        </div>
                        {idx + 1 !== storage.advanced.length && <hr className={`my-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} w-[3rem]`} />}
                      </React.Fragment>
                    ))
                  ) : (
                    <div className="text-gray-500 italic">No advanced storage data</div>
                  )}
                </>
              : 
                <>
                  {storage.basic && storage.basic.length > 0 ? (
                    storage.basic.map((s, idx) => (
                      <React.Fragment key={s.filesystem + s.mount + idx}>
                        <div className="mb-2">
                          <p><strong>File System: </strong> {s.filesystem}</p>
                          <p><strong>Mounted on: </strong> {s.mount}</p>
                          <p><strong>Capacity: </strong> <span className={diskUsage(s.fullPercent, isDarkMode)}>{isDarkMode ? <>{s.fullGB} / {s.totalGB} GB ({s.fullPercent} %)</> : <strong>{s.fullGB} / {s.totalGB} GB ({s.fullPercent} %)</strong>}</span></p>
                        </div>
                        {idx + 1 !== storage.basic.length && <hr className={`my-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />}
                      </React.Fragment>
                    ))
                  ) : (
                    <div className="text-gray-500 italic">No storage data</div>
                  )}
                </>
              }
            </div>
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: ${isDarkMode ? '#4B5563' : '#A0AEC0'};
                border-radius: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: ${isDarkMode ? '#1f2328' : '#F7FAFC'};
                border-radius: 4px;
              }
              .custom-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: ${isDarkMode ? '#4B5563 #1f2328' : '#A0AEC0 #F7FAFC'};
              }
            `}</style>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-500 italic">No data available</div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StoragePanel;