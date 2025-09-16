import React from 'react';
import Card from '../UI/Card';
import PanelTitle from '../UI/PanelTitle';

const ServersPanel = ({ servers }) => {
  return (
    <Card>
      <PanelTitle title="Active servers" />
      <div className="text-gray-300 space-y-2">
        {servers.map((server, index) => (
          <div key={index}>
            <strong>{server.protocol}:</strong> <a href={server.url} className="text-blue-400 hover:underline">{server.url}</a>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ServersPanel;