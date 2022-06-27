import request from "request";
import { resourceLimits } from "worker_threads";
//export let mymap = new Map<string, string>();

// export async function plapla(ss: String) {
//   let myobj:any = [];

//   const options = {
//     method: "GET",
//     url: "https://api.foursquare.com/v3/places/search?query=" + ss,
//     headers: {
//       Accept: "application/json",
//       Authorization: "fsq3sx7F0Uwp8G6We+CzMo05xZK2N3OA6dDbIyJ2GRaKhKY=",
//     },
//   };

//    request(
//     options,
//     function (error: string | undefined, response: any, body: any) {
//       if (error) throw new Error(error);
//       const result = JSON.parse(body).results;
     
//       const x = result.forEach(
//         (element: {
//           fsq_id: any;
//           name: any;
//           geocodes: { main: { latitude: any; longitude: any } };
//         }) => {
//        myobj.name = element.name;
//         myobj.city = element.geocodes.main.latitude;
//         console.log(myobj);
//         //console.log(myobj);
//          // mymap.set("name", element.name);
//           //console.log(mymap)
//           let lat = element.geocodes.main.latitude;
//           let long = element.geocodes.main.longitude;
//           // console.log(
//           //   "https://www.google.com/maps/search/?api=1&query=" +
//           //     lat +
//           //     "," +
//           //     long
//           // );
          
//         }
//       );
//       ;
//     }
   
//   );
//   console.log("///////////////////////");
//   console.log(myobj);
//   return myobj;
// }

const axios = require("axios").default;



// Want to use async/await? Add the `async` keyword to your outer function/method.
// export async function getneww() {

//   const options = {
//     method: 'GET',
//     url: 'https://api.foursquare.com/v3/places/search?query=burger',
//     headers: {
//       Accept: 'application/json',
//       Authorization: 'fsq3sx7F0Uwp8G6We+CzMo05xZK2N3OA6dDbIyJ2GRaKhKY='
//     },

//     transformResponse: [function (data: any) {
//       return data;
//     }],

//   };

//   try {
//     const response = await axios.get(options);
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }




export async function plapla(ss: String) {
const options = {
  method: 'GET',
  url: 'https://api.foursquare.com/v3/places/search?query=burger',
  headers: {
    Accept: 'application/json',
    Authorization: 'fsq3sx7F0Uwp8G6We+CzMo05xZK2N3OA6dDbIyJ2GRaKhKY='
  },

  
  // transformResponse: [function (data: any) {
  //   console.log("hello transformResponse");
  //   console.log(data);
  //   return data;
  // }]
};

//var number ="before request";
let number ="in request";
await axios.request(options)
 .then(function (response: { data: any; }) {
  console.log("hello 1");
  let number =response.data.results;
  console.log(response.data.results);
}).catch(function (error: any) {
  console.error(error);
}).then;

return number;
}