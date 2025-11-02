// Network graphs are served directly as images from the endpoints
// No need to fetch data, just return URLs
async function getNetworkGraphs() {
  return {
    traffic: import.meta.env.VITE_X_API_URL + '/network/traffic',
    latency: import.meta.env.VITE_X_API_URL + '/network/latency',
    packetLoss: import.meta.env.VITE_X_API_URL + '/network/packet-loss',
  };
}

export default getNetworkGraphs;
