import axios from 'axios';

//here we set up some pre-configured default setups

export default axios.create({//this creates a customizable copy of axios
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID OIZZNthBYRVAwkA0v0VELTPgjDCt3pkMPILPbpoEVZY'
  }
});
