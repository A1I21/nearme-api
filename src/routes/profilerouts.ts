import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { profileCON } from "../controller/profileCON";

const profiles = Type.Object({
  id: Type.String({ format: "uuid" }),
  name: Type.String(),
  phone: Type.String(),
  email: Type.String(),
  address: Type.String(),
  city: Type.String(),
  favoritePlacses: Type.Array(Type.String()),
});
type profiles = Static<typeof profiles>;

const GetProfileQuery = Type.Object({
    name: Type.Optional(Type.String()),
  });
  type GetProfileQuery = Static<typeof GetProfileQuery>;

export let profile: profiles[] = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "user1",
    phone: "1234567890",
    email: "ff",
    address: "ff",
    city: "ff",
    favoritePlacses: ["ff"],
  },
];
export default async function (server: FastifyInstance) {
    //create prfile and return created profile message
    server.route({
        method: "POST",
        url: "/profilecreate",
        schema: {
            summary: "create a new profile",
            tags: ["profile"],
            body: profiles,
        },
        handler: async (request, reply) => {
            const newprofile: any = request.body;
            return profileCON(profile, newprofile);
        }
    });
    //view all profiles
    server.route({
        method: "GET",
        url: "/profileview",
        schema: {
            summary: "view all profiles",
            tags: ["profile"],
        },
        handler: async (request, reply) => {
            return profile;
        }
    });
    //search profile by qurey
    server.route({
        method: "GET",
        url: "/profilesearch",
        schema: {
            summary: "search profile by query",
            tags: ["profile"],
            querystring: GetProfileQuery,
        },
        handler: async (request, reply) => {
            const query: any = request.query as GetProfileQuery;
            if (query.name) {
                return profile.filter((p) => p.name.includes(query.name ?? ""));
              } else {
                return profile;
              }
        }
    });


}
