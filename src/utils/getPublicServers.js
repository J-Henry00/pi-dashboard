import axios from 'axios';

async function getPublicServers() {
  var config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  var activeServers = (
    await axios.get('https://pi-system.hjindra.org/services', config)
  ).data;

  if (!activeServers.success) return null;

  return activeServers.data;
}

export default getPublicServers;
