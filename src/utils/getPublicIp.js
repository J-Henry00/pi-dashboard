import axios from 'axios';

async function getPublicIP() {
  return (await axios.get('https://ifconfig.me/ip')).data;
}

export default getPublicIP;
