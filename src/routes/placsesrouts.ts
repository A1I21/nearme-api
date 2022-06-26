import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
const request = require('request');

import { placsesCON } from "../controller/placsesCON";
import { plapla } from "../services/api";
//import { getPlaces, placesearch } from "../services/placesreach";
import querystring from "querystring";
import { type } from "os";

export const GetPlaceQuerybyanme = Type.Object({
  name: Type.Optional(Type.String()),
});
type GetPlaceQuerybyanme = Static<typeof GetPlaceQuerybyanme>;

export const GetPlaceQuerybycc = Type.Object({
  name: Type.Optional(Type.String()),
  city: Type.Optional(Type.String()),
});
export const myq = Type.Object({
  name: Type.Optional(Type.String()),
});
type myq = Static<typeof myq>;


type GetPlaceQuerybycc = Static<typeof GetPlaceQuerybycc>;

const places = Type.Object({
  placeid: Type.String({ format: "uuid" }),
  name: Type.String(),
  address: Type.String(),
  city: Type.String(),
  catagory: Type.Array(Type.String()),
  description: Type.String(),
  rating: Type.Number(),
});
type places = Static<typeof places>;
//restrunt array of places
export let place: places[] = [
  {
    placeid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "MAcDonalds",
    address: "Riyadh",
    city: "Riyadh",
    catagory: ["burger", "fastfood"],
    description: "Amiercan restaurant",
    rating: 4,
  },
  {
    placeid: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
    name: "KFC",
    address: "Jeddah",
    city: "Jeddah",
    catagory: ["burger", "fastfood"],
    description: "Amiercan restaurant",
    rating: 4,
  },
  {
    placeid: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
    name: "KFC",
    address: "Riyadh",
    city: "Riyadh",
    catagory: ["burger", "fastfood"],
    description: "Amiercan restaurant",
    rating: 4,
  },
  {
    placeid: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
    name: "Domino's",
    address: "Riyadh",
    city: "Riyadh",
    catagory: ["pizza"],
    description: "Amiercan restaurant",
    rating: 4,
  },
  {
    placeid: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
    name: "Pizza Hut",
    address: "Riyadh",
    city: "Riyadh",
    catagory: ["pizza"],
    description: "Amiercan restaurant",
    rating: 4,
  },
];

export default async function (server: FastifyInstance) {
  //add a new place
  server.route({
    method: "POST",
    url: "/placecreate",
    schema: {
      summary: "create a new place",
      tags: ["place"],
      body: places,
    },
    handler: async (request, reply) => {
      const newplace: any = request.body;
      return placsesCON(place, newplace);
    },
  });
  //view all places
  server.route({
    method: "GET",
    url: "/placeview",
    schema: {
      summary: "view all places",
      tags: ["place"],
    },
    handler: async (request, reply) => {
      return place;
    },
  });
  //search place by qurey
  server.route({
    method: "GET",
    url: "/placeserachbyname",
    schema: {
      summary: "search all places by name",
      tags: ["place"],
      // querystring: GetPlaceQuerybyanme,
    },

    handler: async (request, reply) => {
     
    
      // const Nqurey: any = request.query as GetPlaceQuerybyanme;
      // if (Nqurey.name) {
      //   return place.filter((p) => p.name.includes(Nqurey.name ?? ""));
      // }
    },
  });
  //serach place by catagory and city
  server.route({
    method: "GET",
    url: "/placeserachbycc",
    schema: {
      summary: "search by canagory and city",
      tags: ["place"],
      querystring: GetPlaceQuerybycc,
    },
    handler: async (request, reply) => {
      const qurey: any = request.query as GetPlaceQuerybycc;
      if (qurey.name || qurey.city) {
        let samllname = qurey.name.toLowerCase();
        let smallc = qurey.city.toLowerCase();
        return place
          .filter((p) => p.name.toLowerCase().includes(samllname ?? ""))
          .filter((p) => p.city.toLowerCase().includes(smallc ?? ""));
      }
    },
  });
  //route to run a function 
  server.route({
    method: "GET",
    url: "/placeserachbyapppli",
    schema: {
      summary: "search by canagory and city",
      tags: ["place"],
      querystring: myq,
    },
    handler: async (request, reply) => {
      const qurey: any = request.query as myq;
      return plapla(qurey.name);

}
  });
}







