import React, { useState, useEffect } from 'react';
import PiStatsPanel from '../Panels/PiStatsPanel';
import ServersPanel from '../Panels/ServersPanel';
import ConnectPanel from '../Panels/ConnectPanel';

import getStats from '../../utils/getStats';

const Dashboard = () => {
  const [piStats, setPiStats] = useState(null);
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Example placeholder data
  const mockPiStats = {
    hostname: 'raspberrypi',
    arch: 'arm64',
    tempC: 55,
    TempF: 120,
    cpu: [25, 22, 28, 24],
    ram: '1 / 8 GB',
    uptime: '1d, 5h, 2m, 30s'
  };

  const mockServers = [
    { protocol: 'HTTP', url: 'http://x.x.x.x:yyyy' },
    { protocol: 'HTTP', url: 'http://x.x.x.x:yyyy' },
    { protocol: 'SSH', url: 'ssh://x.x.x.x:yyyy' },
    { protocol: 'SMB', url: 'smb://x.x.x.x:yyyy' },
  ];

  // In a real application, you would use useEffect to fetch data
  useEffect(async() => {
    try {
      const statsData = await getStats();
      setPiStats(statsData);
      // const serversData = await fetchServersData();
      // setServers(serversData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

    // Using mock data for now
    // setPiStats(statsData);
    setServers(mockServers);
    setLoading(false);
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const handleConnect = (action) => {
    console.log(`Action: ${action}`);
    // Implement your connection logic here
  };

  return (
    <div className="p-8 bg-[#1f2328] min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-8">Raspberry PI</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <PiStatsPanel stats={piStats} />
        <ServersPanel servers={servers} />
        <ConnectPanel onConnect={handleConnect} />
      </div>
    </div>
  );
};

export default Dashboard;