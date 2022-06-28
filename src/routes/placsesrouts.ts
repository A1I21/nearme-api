import { Static, Type } from '@sinclair/typebox';
import { Place, User } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { prismaClient } from '../prisma';

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
//model for palce
const Favorite = Type.Object({
	placename: Type.String(),
	city: Type.String(),
	catagory: Type.String(),
});
//model for place
const Place = Type.Object({
	name: Type.String(),
	address: Type.String(),
	city: Type.String(),
	phone: Type.String(),
	latitude: Type.Number(),
	longitude: Type.Number(),
	rating: Type.String(),
	price: Type.String(),
	openinghours: Type.String(),
	category: Type.Array(Type.String()),
	delevryapps: Type.Array(Type.String()),
});

const User = Type.Object({
	user_id: Type.String(),
	username: Type.String(),
	password: Type.String(),
	email: Type.String(),
	phone: Type.String(),
	name: Type.String(),
	favorite_places: Type.Array(Favorite),
});

//restrunt array of places

export default async function (server: FastifyInstance) {
	//add a new place

	server.route({
		method: 'POST',
		url: '/placecreate',
		schema: {
			summary: 'create a new place',
			tags: ['place'],
			body: Place,
		},
		handler: async (request, reply) => {
			const place: any = request.body as Place;
			console.log(place);
			await prismaClient.place.create({
				data: place,
			});
			return await prismaClient.place.findMany();
		},
	});
	// //view all places
	// server.route({
	// 	method: 'GET',
	// 	url: '/placeview',
	// 	schema: {
	// 		summary: 'view all places',
	// 		tags: ['place'],
	// 	},
	// 	handler: async (request, reply) => {
	// 		return place;
	// 	},
	// });
	// //search place by qurey
	// server.route({
	// 	method: 'GET',
	// 	url: '/placeserachbyname',
	// 	schema: {
	// 		summary: 'search all places by name',
	// 		tags: ['place'],
	// 		// querystring: GetPlaceQuerybyanme,
	// 	},

	// 	handler: async (request, reply) => {
	// 		const Nqurey: any = request.query as GetPlaceQuerybyanme;
	// 		if (Nqurey.name) {
	// 			return place.filter((p) => p.name.includes(Nqurey.name ?? ''));
	// 		}
	// 	},
	// });
	// //serach place by catagory and city
	// server.route({
	// 	method: 'GET',
	// 	url: '/placeserachbycc',
	// 	schema: {
	// 		summary: 'search by canagory and city',
	// 		tags: ['place'],
	// 		querystring: GetPlaceQuerybycc,
	// 	},
	// 	handler: async (request, reply) => {
	// 		const qurey: any = request.query as GetPlaceQuerybycc;
	// 		if (qurey.name || qurey.city) {
	// 			let samllname = qurey.name.toLowerCase();
	// 			let smallc = qurey.city.toLowerCase();

	// 			return place
	// 				.filter((p) => p.name.toLowerCase().includes(samllname ?? ''))
	// 				.filter((p) => p.city.toLowerCase().includes(smallc ?? ''));
	// 		}
	// 	},
	// });
	// //route search place by qurey name
	// server.route({
	// 	method: 'GET',
	// 	url: '/myapi/searchName',
	// 	schema: {
	// 		summary: 'snew',
	// 		tags: ['new'],
	// 		querystring: myq,
	// 	},
	// 	handler: async (request, reply) => {},
	// });
}
