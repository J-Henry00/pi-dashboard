import axios from 'axios';

async function getPM2Data() {
  var config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  try {
    var pm2Data = (await axios.get('https://pi-system.hjindra.org/pm2', config))
      .data;

    if (!pm2Data.success) return null;

    return pm2Data.data;
  } catch (error) {
    console.error('Error fetching PM2 data:', error);
    return null;
  }
}

export default getPM2Data;
