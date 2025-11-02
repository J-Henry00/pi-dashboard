import axios from 'axios';

async function getStats() {
  let storage = { basic: [], advanced: [] };
  var config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  var storageInfo = (
    await axios.get(import.meta.env.VITE_X_API_URL + '/storage', config)
  ).data;
  var advancedStorageInfo = (
    await axios.get(
      import.meta.env.VITE_X_API_URL + '/storage?showAll=true',
      config
    )
  ).data;

  if (!storageInfo.success || !advancedStorageInfo.success) {
    return null;
  }

  storageInfo.data.forEach((d) => {
    storage.basic.push({
      filesystem: d.filesystem,
      mount: d.mounted_on,
      totalGB: d.total.gb,
      fullGB: d.full.gb,
      fullPercent: d.full.percentage,
    });
  });

  advancedStorageInfo.data.forEach((d) => {
    storage.advanced.push({
      filesystem: d.filesystem,
      mount: d.mounted_on,
      totalGB: d.total.gb,
      fullGB: d.full.gb,
      fullPercent: d.full.percentage,
    });
  });

  return storage;
}

export default getStats;
