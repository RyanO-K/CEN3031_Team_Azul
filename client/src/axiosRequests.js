import axios from 'axios'
/*
Give bodyInfo in the format of schema if creating or updating, otherwise just pass in the ID of the entry you want to delete.
personal/:Email for User info or horoscopeInfo/:ID for horoscope info
dont include an email or ID if you want to get all or are creating a entry
*/




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

//neds to accept a horoscopeSchema as its Body
async makeUpdateRequest(url, bodyInfo) {
  
  let res = await axios.put('http://localhost:5000/api/' + url,bodyInfo);
  
},
//unstable
async makeCreateRequest(url, bodyInfo) {
  
  let res = await axios.post('http://localhost:5000/api/' + url,bodyInfo);
  
}

}


export default axoisRequests;