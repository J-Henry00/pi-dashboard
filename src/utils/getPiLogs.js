import axios from 'axios';

async function getPiLogs() {
  var config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  try {
    var logsData = (
      await axios.get(import.meta.env.VITE_X_API_URL + '/pilogs', config)
    ).data;

    if (!logsData.success) return null;

    return logsData.data;
  } catch (error) {
    console.error('Error fetching PI logs:', error);
    return null;
  }
}

export default getPiLogs;
