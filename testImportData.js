import request from 'request';

export default async function axios_get(horoscopeid){


    request('http://localhost:5000/api/horoscopeInfo/5e5842db3979b444104c1bba', function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    });
    return response;
};