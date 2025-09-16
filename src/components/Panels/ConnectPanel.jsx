import React from 'react';
import Card from '../UI/Card';
import PanelTitle from '../UI/PanelTitle';
import Button from '../UI/Button';

const ConnectPanel = ({ onConnect }) => {
  const buttons = [
    'Connect to web terminal',
    'Connect using SSH',
    'Connect using VNC',
    'Connect using PI Connect',
    'Connect using VS Code Web server',
    'Connect to cloud storage'
  ];

  return (
    <Card>
      <PanelTitle title="Connect" />
      <div className="flex flex-col space-y-2">
        {buttons.map((text, index) => (
          <Button key={index} text={text} onClick={() => onConnect(text)} />
        ))}
      </div>
    </Card>
  );
};

export default ConnectPanel;