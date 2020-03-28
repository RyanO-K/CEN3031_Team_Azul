import axios from 'axios'

let axoisRequests = {

 async makeGetRequest(url) {
  
  let res = await axios.get('http://localhost:5000/api/' + url).then(function (response){
    console.log(response.data);
    return response.data;
  });
  
},

async makeDeleteRequest(url) {
  
  let res = await axios.delete('http://localhost:5000/api/' + url).then(function (response){
    console.log(response.data);
    return response.data;
  });
  
},

async makeUpdateRequest(url) {
  
  let res = await axios.put('http://localhost:5000/api/' + url).then(function (response){
    console.log(response.data);
    return response.data;
  });
  
},

async makeCreateRequest(url) {
  
  let res = await axios.post('http://localhost:5000/api/' + url).then(function (response){
    console.log(response.data);
    return response.data;
  });
  
}

}


export default axoisRequests;