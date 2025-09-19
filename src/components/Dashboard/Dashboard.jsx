import React, { useState, useEffect } from 'react';
import PiStatsPanel from '../Panels/PiStatsPanel';
import ServersPanel from '../Panels/ServersPanel';
import ConnectPanel from '../Panels/ConnectPanel';

import getStats from '../../utils/getStats';
import getPublicServers from '../../utils/getPublicServers';

const Dashboard = () => {
  const [piStats, setPiStats] = useState(null);
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {

      await fetchStats();
      const serversData = await getPublicServers();
      setServers(serversData);
    } catch (err) {
      setError(err.message);
      console.error(err);
      
    } finally {
      setLoading(false);
    }

    // Using mock data for now
    // setPiStats(statsData);
    // setServers(mockServers);
    setLoading(false);
  }

  async function fetchStats() {
      const statsData = await getStats();
      setPiStats(statsData);
  }

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
  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchStats, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const handleConnect = (action) => {
    var actions = {
      'web-ssh': {
        action: 'new_page',
        target: 'https://ssh-pi.hjindra.org/'
      },
      ssh: {
        action: 'display-modal',
        target: 'pi@hjindra.org'
      },
      vnc: {
        action: 'display-modal',
        target: 'vnc.hjindra.org'
      },
      'pi-connect': {
        action: 'new_page',
        target: 'https://connect.raspberrypi.com/devices'
      },
      'vscode-web': {
        action: 'new_page',
        target: 'https://code.hjindra.org/'
      },
      'cloud-storage': {
        action: 'new_page',
        target: 'https://disk.hjindra.org/'
      }
    }

    return actions[action] || null; // make the function
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