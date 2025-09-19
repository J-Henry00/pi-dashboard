import React from 'react';
import Card from '../UI/Card';
import PanelTitle from '../UI/PanelTitle';
import Button from '../UI/Button';

const ConnectPanel = ({ onConnect, isDarkMode = true }) => {
  const buttons = [
    { text: 'Connect to web terminal', type: 'web-ssh' },
    { text: 'Connect using SSH', type: 'ssh' },
    { text: 'Connect using VNC', type: 'vnc' },
    { text: 'Connect using PI Connect', type: 'pi-connect' },
    { text: 'Connect using VS Code Web server', type: 'vscode-web' },
    { text: 'Connect to cloud storage', type: 'cloud-storage' }
  ];

  return (
    <Card isDarkMode={isDarkMode}>
      <PanelTitle title="Connect" isDarkMode={isDarkMode} />
      <div className="flex flex-col space-y-2">
        {buttons.map((btn, index) => (
          <Button
            key={index}
            text={btn.text}
            onClick={() => onConnect(btn.type)}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </Card>
  );
};

export default ConnectPanel;