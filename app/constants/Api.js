const API_URL = 
  location.protocol + '//' + location.hostname + ':' + (process.env.API_PORT || location.port);

export default API_URL;