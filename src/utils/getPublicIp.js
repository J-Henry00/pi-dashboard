import axios from 'axios';

async function getPublicIP() {
  var config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  console.log(
    'https://pi-system.hjindra.org/sysinfo?ipkey=' +
      import.meta.env.VITE_X_IP_KEY
  );

  return (
    await axios.get(
      'https://pi-system.hjindra.org/sysinfo?ipkey=' +
        import.meta.env.VITE_X_IP_KEY
    )
  ).data.data.publicIp;
}

export default getPublicIP;
