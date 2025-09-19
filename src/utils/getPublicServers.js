import axios from 'axios';

async function getPublicServers() {
  var config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  var activeServers = (
    await axios.get('http://192.168.1.50:9001/services', config)
  ).data;

  if (!activeServers.success) return null;

  return activeServers.data;
}

export default getPublicServers;
