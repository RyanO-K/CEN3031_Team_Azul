import axios from 'axios'

const axios = require('axios');

async function makeGetRequest() {
  
  let res = await axios.get('http://localhost:5000');

  let data = res.data;
  console.log(data);
}

makeGetRequest();