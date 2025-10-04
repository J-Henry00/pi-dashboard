// Network graphs are served directly as images from the endpoints
// No need to fetch data, just return URLs
async function getNetworkGraphs() {
  return {
    traffic: 'https://pi-system.hjindra.org/network/traffic',
    latency: 'https://pi-system.hjindra.org/network/latency',
    packetLoss: 'https://pi-system.hjindra.org/network/packet-loss',
  };
}

export default getNetworkGraphs;
