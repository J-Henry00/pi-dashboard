import React from 'react';
import Card from '../UI/Card';
import PanelTitle from '../UI/PanelTitle';

const PiStatsPanel = ({ stats }) => {
  if (!stats) return null;

  return (
    <Card>
      <PanelTitle title="PI stats" />
      <div className="text-gray-300 space-y-2">
        <p><strong>hostname:</strong> {stats.hostname}</p>
        <p><strong>architecture:</strong> {stats.arch}</p>
        <p><strong>CPU Temp:</strong> {stats.tempC} °C / {stats.tempF} °F</p>
        <hr className="border-gray-600 my-4" />
        <p><strong>CPU0:</strong> {stats.cpu[0]}%</p>
        <p><strong>CPU1:</strong> {stats.cpu[1]}%</p>
        <p><strong>CPU2:</strong> {stats.cpu[2]}%</p>
        <p><strong>CPU3:</strong> {stats.cpu[3]}%</p>
        <p><strong>RAM:</strong> {stats.ram} </p>
        <p><strong>Uptime:</strong> {stats.uptime}</p>
      </div>
    </Card>
  );
};

export default PiStatsPanel;