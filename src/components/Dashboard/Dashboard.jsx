import React, { useState, useEffect } from 'react';
import PiStatsPanel from '../Panels/PiStatsPanel';
import ServersPanel from '../Panels/ServersPanel';
import ConnectPanel from '../Panels/ConnectPanel';
import StoragePanel from '../Panels/StoragePanel';
import VirtualNodesPanel from '../Panels/VirtualNodesPanel';
import PM2Panel from '../Panels/PM2Panel';
import PiLogsPanel from '../Panels/PiLogsPanel';
import DockerPanel from '../Panels/DockerPanel';
import NetworkGraphsPanel from '../Panels/NetworkGraphsPanel';
import LoginModal from '../UI/LoginModal';
import ConfirmModal from '../UI/ConfirmModal';

import getStats from '../../utils/getStats';
import getPublicServers from '../../utils/getPublicServers';
import getStorage from '../../utils/getStorageUsage';
import getPM2Data from '../../utils/getPM2Data';
import getPiLogs from '../../utils/getPiLogs';
import getDockerContainers from '../../utils/getDockerContainers';
import getNetworkGraphs from '../../utils/getNetworkGraphs';
import axios from 'axios';

// Custom Modal Component
const CustomModal = ({ isOpen, onClose, text, protocol }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    // Close modal if clicking on the backdrop (not the modal content)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-51" 
      onClick={handleBackdropClick}
      style={{ 
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
    >
      {/* Modal content */}
      <div 
        className="relative bg-[#2d3748] rounded-lg p-6 max-w-md mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent modal content clicks from closing modal
      >
        <div className="text-white text-center mb-6">
        <p className="text-lg">
          {protocol.toUpperCase() !== 'NOTACONNECT' && (
            <>
              Download software for connecting to {protocol.toUpperCase()} server and use address
              <br />
            </>
          )}
          <strong>{text}</strong>
        </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded transition-colors duration-200"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [piStats, setPiStats] = useState(null);
  const [servers, setServers] = useState([]);
  const [storageInfo, setStorageInfo] = useState({});
  const [pm2Data, setPm2Data] = useState([]);
  const [logsData, setLogsData] = useState([]);
  const [dockerData, setDockerData] = useState([]);
  const [networkData, setNetworkData] = useState(null);
  const [loading, setLoading] = useState({
    piStats: true,
    servers: true,
    storage: true,
    pm2: true,
    logs: true,
    docker: true,
    network: true
  });
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, text: '', protocol: '' });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
  // Add new state to track the ID of the server being killed
  const [killingServerId, setKillingServerId] = useState(null);

  async function fetchData() {
    try {
      // Fetch Pi stats
      setLoading(prev => ({ ...prev, piStats: true }));
      await fetchStats();
      setLoading(prev => ({ ...prev, piStats: false }));

      // Fetch servers
      setLoading(prev => ({ ...prev, servers: true }));
      const serversData = await getPublicServers();
      setServers(serversData);
      setLoading(prev => ({ ...prev, servers: false }));

      // Fetch storage
      setLoading(prev => ({ ...prev, storage: true }));
      const storageData = await getStorage();
      setStorageInfo(storageData);
      setLoading(prev => ({ ...prev, storage: false }));

      // Fetch PM2 data
      setLoading(prev => ({ ...prev, pm2: true }));
      const pm2DataResult = await getPM2Data();
      setPm2Data(pm2DataResult || []);
      setLoading(prev => ({ ...prev, pm2: false }));

      // Fetch PI logs
      setLoading(prev => ({ ...prev, logs: true }));
      const logsDataResult = await getPiLogs();
      setLogsData(logsDataResult || []);
      setLoading(prev => ({ ...prev, logs: false }));

      // Fetch Docker containers
      setLoading(prev => ({ ...prev, docker: true }));
      const dockerDataResult = await getDockerContainers();
      setDockerData(dockerDataResult || []);
      setLoading(prev => ({ ...prev, docker: false }));

      // Fetch network graphs
      setLoading(prev => ({ ...prev, network: true }));
      const networkDataResult = await getNetworkGraphs();
      setNetworkData(networkDataResult);
      setLoading(prev => ({ ...prev, network: false }));
    } catch (err) {
      setError(err.message);
      console.error(err);
      setLoading(prev => ({ 
        ...prev, 
        piStats: false, 
        servers: false, 
        storage: false,
        pm2: false,
        logs: false,
        docker: false,
        network: false
      }));
    }
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

  if (error) return <div className="text-red-500">Error: {error}</div>;

  const handleAction = (actionType) => {
    const actions = {
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
    };

    const actionConfig = actions[actionType];
    if (!actionConfig) return;

    if (actionConfig.action === 'new_page') {
      // Open link in new tab
      window.open(actionConfig.target, '_blank');
    } else if (actionConfig.action === 'display-modal') {
      // Show custom modal with the target text
      setModal({ isOpen: true, text: actionConfig.target, protocol: actionType });
    }
  };

  const closeModal = () => {
    setModal({ isOpen: false, text: '', protocol: '' });
  };

  const handleRefresh = async () => {
    // Refresh all data except PiStatsPanel which refreshes automatically via interval
    setLoading(prev => ({ 
      ...prev, 
      servers: true, 
      storage: true,
      pm2: true,
      logs: true,
      docker: true,
      network: true
    }));
    try {
      const [serversData, storageData, pm2DataResult, logsDataResult, dockerDataResult, networkDataResult] = await Promise.all([
        getPublicServers(),
        getStorage(),
        getPM2Data(),
        getPiLogs(),
        getDockerContainers(),
        getNetworkGraphs()
      ]);
      
      setServers(serversData);
      setStorageInfo(storageData);
      setPm2Data(pm2DataResult || []);
      setLogsData(logsDataResult || []);
      setDockerData(dockerDataResult || []);
      setNetworkData(networkDataResult);
      
      setLoading(prev => ({ 
        ...prev, 
        servers: false, 
        storage: false,
        pm2: false,
        logs: false,
        docker: false,
        network: false
      }));
    } catch (err) {
      setError(err.message);
      console.error(err);
      setLoading(prev => ({ 
        ...prev, 
        servers: false, 
        storage: false,
        pm2: false,
        logs: false,
        docker: false,
        network: false
      }));
    }
  };

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleLoginSubmit = (username, password) => {
    try {
      // Check credentials against environment variables
      const envUser = import.meta.env.VITE_X_ADMIN_USER || process.env.X_ADMIN_USER;
      const envPass = import.meta.env.VITE_X_ADMIN_PASSWORD || process.env.X_ADMIN_PASSWORD;
      const response = {
        ok: username === envUser && password === envPass
      };
      
      if (response.ok) {
        setIsLoggedIn(true);
        setShowLoginModal(false);
        setAdminCredentials({ username, password });
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('adminUser', username);
      } else {
        setModal({ 
          isOpen: true, 
          text: 'Invalid credentials', 
          protocol: 'NotAConnect' 
        });
      }
    } catch (error) {
      setModal({ 
        isOpen: true, 
        text: 'Login failed. Please try again.', 
        protocol: 'NotAConnect' 
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminUser');
    setAdminCredentials({ username: '', password: '' });
  };

  const handleKillNode = async (serverHostname) => {
    // Set the ID of the server being killed
    setKillingServerId(serverHostname);

    try {
      const response = await axios.get(`https://virtual.hjindra.org/api/manage/${serverHostname}/kill`);
      
      if (response.data.success) {
        setModal({ 
          isOpen: true, 
          text: 'Successfully ended virtual node', 
          protocol: 'NotAConnect' 
        });
        // Refresh servers after successful kill
        handleRefresh();
      } else {
        setModal({ 
          isOpen: true, 
          text: 'There was an error killing virtual node', 
          protocol: 'NotAConnect' 
        });
      }
    } catch (error) {
      setModal({ 
        isOpen: true, 
        text: 'There was an error killing virtual node', 
        protocol: 'NotAConnect' 
      });
    } finally {
      // Reset the loading state regardless of the outcome
      setKillingServerId(null);
    }
  };

  const handleRestartConfirm = async () => {
    setShowRestartModal(false);
    
    try {
      // For testing purposes - commented out the actual reboot command
      const { exec } = require('child_process');
      exec('sudo reboot', (error, stdout, stderr) => {
        if (error) {
          console.error('Reboot error:', error);
          setModal({ 
            isOpen: true, 
            text: 'Failed to restart system', 
            protocol: 'NotAConnect' 
          });
        }
       setModal({ 
        isOpen: true, 
        text: 'System restart initiated', 
        protocol: 'NotAConnect' 
      });
      });
      
      // For testing - just show success message
      // setModal({ 
      //   isOpen: true, 
      //   text: 'System restart initiated (testing mode)', 
      //   protocol: 'NotAConnect' 
      // });
    } catch (error) {
      setModal({ 
        isOpen: true, 
        text: 'Failed to restart system', 
        protocol: 'NotAConnect' 
      });
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // Store preference in localStorage
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    setIsDarkMode(shouldBeDark);
  }, []);

  return (
    <div className={`p-8 min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#1f2328] text-white' 
        : 'bg-gray-100 text-gray-900'
    }`}>
      <h1 className="text-4xl font-bold text-center mb-8">Raspberry PI</h1>
      <div className="space-y-8 max-w-[95rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <PiStatsPanel stats={piStats} loading={loading.piStats} isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <StoragePanel storage={storageInfo} loading={loading.storage} isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <ServersPanel servers={servers} loading={loading.servers} isDarkMode={isDarkMode} />
          <ConnectPanel onConnect={handleAction} isDarkMode={isDarkMode} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <PM2Panel pm2Data={pm2Data} loading={loading.pm2} isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <PiLogsPanel logsData={logsData} loading={loading.logs} isDarkMode={isDarkMode} />
          <DockerPanel dockerData={dockerData} loading={loading.docker} isDarkMode={isDarkMode} />
          <NetworkGraphsPanel networkData={networkData} loading={loading.network} isDarkMode={isDarkMode} />
        </div>
        
        <div className="flex justify-center">
          <div className="w-full md:w-2/3">
            <VirtualNodesPanel 
              servers={servers} 
              isDarkMode={isDarkMode} 
              isLoggedIn={isLoggedIn}
              onKillNode={handleKillNode}
              killingServerId={killingServerId}
            />
          </div>
        </div>
      </div>
      <CustomModal 
        isOpen={modal.isOpen} 
        onClose={closeModal} 
        text={modal.text} 
        protocol={modal.protocol}
      />
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginSubmit}
      />
      
      <ConfirmModal
        isOpen={showRestartModal}
        onClose={() => setShowRestartModal(false)}
        onConfirm={handleRestartConfirm}
        title="Restart System"
        message="Are you sure you want to restart the Raspberry PI? This will reboot the entire system."
        confirmText="Yes"
        cancelText="No"
      />
      
      {/* Floating Control Panel */}
      <div className="fixed top-1/2 left-2 -translate-y-1/2 sm:top-4 sm:right-4 sm:left-auto sm:translate-y-0 z-40">
        <div className={`rounded-lg shadow-lg border transition-colors duration-300 p-2 sm:p-3 ${
          isDarkMode 
            ? 'bg-[#2d3748] border-gray-600' 
            : 'bg-white border-gray-300'
        }`}>
          <div className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2">
            <button
              onClick={handleRefresh}
              className="p-1 sm:p-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-md transition-all duration-200 touch-manipulation min-h-[26px] min-w-[26px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center"
              title="Refresh servers"
            >
              <svg className="w-2.5 h-2.5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            
            <button
              onClick={isLoggedIn ? handleLogout : handleLogin}
              className={`p-1 sm:p-2 ${isLoggedIn ? 'bg-red-600 hover:bg-red-700 active:bg-red-800' : 'bg-green-600 hover:bg-green-700 active:bg-green-800'} text-white rounded-md transition-all duration-200 touch-manipulation min-h-[26px] min-w-[26px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center`}
              title={isLoggedIn ? "Log Out" : "Log In"}
            >
              {isLoggedIn ? (
                <svg className="w-2.5 h-2.5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H3m4 4v1a3 3 0 003 3h4a3 3 0 003-3V7a3 3 0 00-3-3H7a3 3 0 00-3 3v1" />
                </svg>
              ) : (
                <svg className="w-2.5 h-2.5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              )}
            </button>
            
            {isLoggedIn && (
              <button
                onClick={() => setShowRestartModal(true)}
                className="p-1 sm:p-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-md transition-all duration-200 touch-manipulation min-h-[26px] min-w-[26px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center"
                title="Restart System"
              >
                <svg className="w-2.5 h-2.5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            )}
            
            <button
              onClick={toggleDarkMode}
              className="p-1 sm:p-2 bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white rounded-md transition-all duration-200 touch-manipulation min-h-[26px] min-w-[26px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                <svg className="w-2.5 h-2.5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-2.5 h-2.5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;