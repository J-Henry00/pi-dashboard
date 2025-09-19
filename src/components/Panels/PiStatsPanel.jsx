import React from 'react';
import Card from '../UI/Card';
import PanelTitle from '../UI/PanelTitle';

const PiStatsPanel = ({ stats, loading, isDarkMode = true }) => {
  return (
    <Card isDarkMode={isDarkMode}>
      <PanelTitle title="PI stats" isDarkMode={isDarkMode} />
      <div className={`space-y-2 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {loading ? (
          <div className="text-center py-8">
            <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>Loading...</div>
          </div>
        ) : stats ? (
          <>
            <p><strong>hostname:</strong> {stats.hostname}</p>
            <p><strong>architecture:</strong> {stats.arch}</p>
            <p><strong>CPU Temp:</strong> {stats.tempC} °C / {stats.tempF.toFixed(1)} °F</p>
            <hr className={`my-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
            <p><strong>CPU0:</strong> {stats.cpu[0]}%</p>
            <p><strong>CPU1:</strong> {stats.cpu[1]}%</p>
            <p><strong>CPU2:</strong> {stats.cpu[2]}%</p>
            <p><strong>CPU3:</strong> {stats.cpu[3]}%</p>
            <p><strong>RAM:</strong> {stats.ram} </p>
            <p><strong>Uptime:</strong> {stats.uptime}</p>
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

export default PiStatsPanel;