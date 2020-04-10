
const API_HOST = `https://api.opendota.com/api`;

const callApi = async endpoint => {
  let response = await fetch(`${API_HOST}${endpoint}`);
  let data = await response.json();
  return data;
};

export default callApi;

