import React from 'react';
import Card from '../UI/Card';
import PanelTitle from '../UI/PanelTitle';

const ServersPanel = ({ servers }) => {
  return (
    <Card>
      <PanelTitle title="Active public servers" />
      <div className="text-gray-300 space-y-2">
        {servers.map((server, index) => (
          <div key={index}>
            <strong>{server.protocol} on port {server.port}:</strong> <a target='_blank' href={server.protocol.toLowerCase() + "://" + server.hostname} className="text-blue-400 hover:underline">{server.hostname}</a> (<strong>{server.local}</strong>)
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ServersPanel;