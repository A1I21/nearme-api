// import request from "request";

// export async function plapla(ss: String) {
//   const options = {
//     method: "GET",
//     url: "https://api.foursquare.com/v3/places/search?query=" + ss,
//     headers: {
//       Accept: "application/json",
//       Authorization: "fsq3sx7F0Uwp8G6We+CzMo05xZK2N3OA6dDbIyJ2GRaKhKY=",
//     },
//   };

//   request(
//     options,
//     function (error: string | undefined, response: any, body: any) {
//       if (error) throw new Error(error);
//       const result = JSON.parse(body).results;
//       console.log(result);
//       const x = result.forEach(
//         (element: {
//           fsq_id: any;
//           name: any;
//           geocodes: { main: { latitude: any; longitude: any } };
//         }) => {
//           let a = element.fsq_id;
//           let b = element.name;
//           let lat = element.geocodes.main.latitude;
//           let long = element.geocodes.main.longitude;
//           console.log(
//             "https://www.google.com/maps/search/?api=1&query=" +
//               lat +
//               "," +
//               long
//           );
//           console.log(a);
//           console.log(b);
//         }
//       );
//     }
//   );
// }

const axios = require("axios").default;
export async function plapla(ss: String) {
const options = {
  method: 'GET',
  url: 'https://api.foursquare.com/v3/places/search?query=burger',
  headers: {
    Accept: 'application/json',
    Authorization: 'fsq3sx7F0Uwp8G6We+CzMo05xZK2N3OA6dDbIyJ2GRaKhKY='
  }
};

axios.request(options).then(function (response: { data: any; }) {
  console.log(response.data);
}).catch(function (error: any) {
  console.error(error);
});


}