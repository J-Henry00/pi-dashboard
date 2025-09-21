import axios from 'axios';

async function getStats() {
  let basicStats = {};
  var config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  var sysInfo = (
    await axios.get('https://pi-system.hjindra.org/sysinfo', config)
  ).data;
  var resourcesInfo = (
    await axios.get('https://pi-system.hjindra.org/resources', config)
  ).data;

  if (!sysInfo.success || !resourcesInfo.success) {
    return null;
  }

  basicStats.hostname = sysInfo.data.hostname;
  basicStats.arch = sysInfo.data.arch;
  basicStats.uptime = sysInfo.data.uptime.formatted;
  basicStats.tempC = sysInfo.data.tempCelsius;
  basicStats.tempF = sysInfo.data.tempFarenheit;

  basicStats.cpu = [];
  basicStats.cpu[0] = resourcesInfo.data.cpu.utilizationPercent[0];
  basicStats.cpu[1] = resourcesInfo.data.cpu.utilizationPercent[1];
  basicStats.cpu[2] = resourcesInfo.data.cpu.utilizationPercent[2];
  basicStats.cpu[3] = resourcesInfo.data.cpu.utilizationPercent[3];
  basicStats.ram = resourcesInfo.data.ram.full.formattedMB;

  return basicStats;
}

export default getStats;
