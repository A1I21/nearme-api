const request = require("request");

export function plapla(ss: String) {
  const options = {
    method: "GET",
    url: "https://api.foursquare.com/v3/places/search?query=" + ss,
    headers: {
      Accept: "application/json",
      Authorization: "fsq3sx7F0Uwp8G6We+CzMo05xZK2N3OA6dDbIyJ2GRaKhKY=",
    },
  };

  return request(
    options,
    function (error: string | undefined, response: any, body: any) {
      if (error) throw new Error(error);
      const result = JSON.parse(body).results;

      const x = result.forEach(
        (element: {
          fsq_id: any;
          name: any;
          geocodes: { main: { latitude: any; longitude: any } };
        }) => {
          let a = element.fsq_id;
          let b = element.name;
          let lat = element.geocodes.main.latitude;
          let long = element.geocodes.main.longitude;
          console.log(
            "https://www.google.com/maps/search/?api=1&query=" +
              lat +
              "," +
              long
          );

          console.log(a);
          console.log(b);
        }
      );
    }
  );
}
