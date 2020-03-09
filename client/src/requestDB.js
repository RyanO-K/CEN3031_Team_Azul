import request from 'request';

    export default async function requestGet(horoscopeid){
    
    
    request('http://localhost:3000/api/horoscopeInfo/'+horoscopeid, function (error, response, body) {
    console.log(body);
    return body;
    });

};
