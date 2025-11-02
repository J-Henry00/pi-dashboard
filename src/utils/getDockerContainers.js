import axios from 'axios';

async function getDockerContainers() {
  var config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  try {
    var dockerData = (
      await axios.get(
        import.meta.env.VITE_X_API_URL + '/dockerContainers',
        config
      )
    ).data;

    if (!dockerData.success) return null;

    return dockerData.data;
  } catch (error) {
    console.error('Error fetching Docker containers:', error);
    return null;
  }
}

export default getDockerContainers;
