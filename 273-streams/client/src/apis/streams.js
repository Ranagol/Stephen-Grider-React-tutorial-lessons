//we create here an instance of axios, and then we will export it
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3001',//our api is running here
});
