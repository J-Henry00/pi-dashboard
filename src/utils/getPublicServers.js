import axios from 'axios';

async function getPublicServers() {
  var config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  var activeServers = (
    await axios.get(import.meta.env.VITE_X_API_URL + '/services', config)
  ).data;

  if (!activeServers.success) return null;

  return activeServers.data;
}

export default getPublicServers;
