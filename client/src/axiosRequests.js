import axios from 'axios'
/*
Give bodyInfo in the format of horoscopeSchema if getting a specific one, creating or updating, otherwise just pass in the ID of the entry you want to delete.
personal/{Email} for User info or horoscopeInfo/?moonphase='+moonphase+'&house='+house+'&sign='+sign for horoscope info
dont include an email or ID if you want to get all or are creating a entry
*/

let axiosRequests = {

 async makeGetRequest(url) {
  
  let res = await axios.get('/api/' + url,{ headers: process.env.KEY || 'Bearer 2h589hg9unfd0sfyg72458ugn540983g' }).then(function (response){ 
  return response.data;
  });
  return res;
},


async makeDeleteRequest(url) {
  
  let res = await axios.delete('/api/' + url,{ headers: process.env.KEY || 'Bearer 2h589hg9unfd0sfyg72458ugn540983g' }).then(function (response){
    
    return response.data;
  });
  return res;
},

//needs to accept a horoscopeSchema as its Body
async makeUpdateRequest(url, bodyInfo) {
  let res = await axios.put('/api/' + url,bodyInfo,{ headers: process.env.KEY || 'Bearer 2h589hg9unfd0sfyg72458ugn540983g' });
  return res;
},

async makeCreateRequest(url, bodyInfo) {
  
  let res = await axios.post('/api/' + url,bodyInfo,{headers:process.env.KEY || 'Bearer 2h589hg9unfd0sfyg72458ugn540983g'});
  return res;
}

}


export default axiosRequests;
