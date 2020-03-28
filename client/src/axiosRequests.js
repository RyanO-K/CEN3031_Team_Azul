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

//neds to accept a horoscopeSchema as its Body
async makeUpdateRequest(url) {
  
  let res = await axios.put('http://localhost:5000/api/' + url,
  {
    house: "Mike",
    sign: "changed it",
    moonphase: "again"
  }).then(function (response){
    console.log(response.data);
    return response.data;
  });
  
},
//unstable
async makeCreateRequest(url) {
  
  let res = await axios.post('http://localhost:5000/api/' + url,
  {
    _id: "5e5842db3979b444104c1bba",
    house: "Ryan",
    sign: "idk",
    moonphase: "full"
  }).then(function (response){
    console.log(response.data);
    return response.data;
  });
  
}

}


export default axoisRequests;