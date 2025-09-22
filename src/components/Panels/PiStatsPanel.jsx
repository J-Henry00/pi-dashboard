import React from 'react';
import Card from '../UI/Card';
import PanelTitle from '../UI/PanelTitle';
import { cpuTemp, cpuUsage, ramUsage } from '../../utils/getStatColor';
import getPublicIP from '../../utils/getPublicIp';

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
            <p>
              <strong>IP Address:</strong>{' '}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={async function handleClick(e) {
                  if (e.target.dataset.loading || e.target.dataset.revealed) return;
                  e.target.dataset.loading = "true";
                  e.target.textContent = "Loading...";
                  try {
                    const ip = await getPublicIP();
                    e.target.textContent = ip;
                    e.target.classList.remove("text-blue-400");
                    e.target.classList.remove("text-red-500");
                    e.target.style.cursor = "text";
                    e.target.dataset.revealed = "true";
                  } catch (err) {
                    e.target.textContent = "Error";
                    e.target.classList.remove("text-blue-400");
                    e.target.classList.add("text-red-500");
                  }
                  delete e.target.dataset.loading;
                }}
              >
                Click to reveal
              </span>
            </p>
            <p><strong>CPU Temp:</strong> <span className={cpuTemp(stats.tempC, isDarkMode)}>{isDarkMode ? <>{stats.tempC} °C</> : <strong>{stats.tempC} °C</strong> }</span> / <span className={cpuTemp(stats.tempC, isDarkMode)}>{isDarkMode ? <>{stats.tempF.toFixed(1)} °F</> : <strong>{stats.tempF.toFixed(1)} °F</strong>}</span></p>
            <hr className={`my-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
            <p><strong>CPU0:</strong> <span className={cpuUsage(stats.cpu[0], isDarkMode)}>{isDarkMode ? <>{stats.cpu[0]}%</> : <strong>{stats.cpu[0]}%</strong>}</span></p>
            <p><strong>CPU1:</strong> <span className={cpuUsage(stats.cpu[1], isDarkMode)}>{isDarkMode ? <>{stats.cpu[1]}%</> : <strong>{stats.cpu[1]}%</strong>}</span></p>
            <p><strong>CPU2:</strong> <span className={cpuUsage(stats.cpu[2], isDarkMode)}>{isDarkMode ? <>{stats.cpu[2]}%</> : <strong>{stats.cpu[2]}%</strong>}</span></p>
            <p><strong>CPU3:</strong> <span className={cpuUsage(stats.cpu[3], isDarkMode)}>{isDarkMode ? <>{stats.cpu[3]}%</> : <strong>{stats.cpu[3]}%</strong>}</span></p>
            <p><strong>RAM:</strong> <span className={`text-${ramUsage(stats.ramUsagePercent, isDarkMode)}`}>{isDarkMode ? <>{stats.ram}</> : <strong>{stats.ram}</strong>}</span> </p>
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