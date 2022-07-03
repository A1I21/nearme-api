import { Static, Type } from '@sinclair/typebox';
import { Category, Place, User } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import Fuse from 'fuse.js';
import { Url } from 'url';

//query for search by name
export const GetPlaceQuerybyanme = Type.Object({
	name: Type.Optional(Type.String()),
});
type GetPlaceQuerybyanme = Static<typeof GetPlaceQuerybyanme>;

//query for search by name and city
export const GetPlaceQuerybynaci = Type.Object({
	name: Type.Optional(Type.String()),
	city: Type.Optional(Type.String()),
});
type GetPlaceQuerybynaci = Static<typeof GetPlaceQuerybynaci>;

// export const qureyCRC = Type.Object({
// 	category: Type.Optional(Type.String()),
// 	rating: Type.Optional(Type.String()),
// 	city: Type.Optional(Type.String()),
// });
//type qureyCRC = Static<typeof qureyCRC>;
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
	radius: Type.Number(),
	category: Type.Array(Type.String()),
	delevryapps: Type.Array(Type.String()),
	usersfavs: Type.Array(Type.String()),
});
const User = Type.Object({
	user_id: Type.String(),
	username: Type.String(),
	password: Type.String(),
	email: Type.String(),
	phone: Type.String(),
	name: Type.String(),
});

////
export default async function (server: FastifyInstance) {
	//create a new place and return all the places
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
	//view all places or search by the name //100%
	server.route({
		method: 'GET',
		url: '/place',
		schema: {
			summary: 'view all places pr search by name',
			tags: ['place'],
			querystring: GetPlaceQuerybyanme,
		},
		handler: async (request, reply) => {
			const query = request.query as GetPlaceQuerybyanme;
			await prismaClient.place.findMany();
			const place = await prismaClient.place.findMany();
			if (!query.name) return place;

			const fuse = new Fuse(place, {
				isCaseSensitive: false,

				keys: ['name'],
			});

			console.log(JSON.stringify(fuse.search(query.name)));

			const result: Place[] = fuse.search(query.name).map((r) => r.item);
			return result;
		},
	});
	//serach place by catagory and city //100%
	server.route({
		method: 'GET',
		url: '/placeserachbycatagoryandcity',
		schema: {
			summary: 'search by category and city',
			tags: ['place'],
			querystring: GetPlaceQuerybynaci,
		},
		handler: async (request, reply) => {
			const query: any = request.query as GetPlaceQuerybynaci;
			await prismaClient.place.findMany();
			const place = await prismaClient.place.findMany();
			if (!query.name || !query.city) return { message: 'please enter the name and city' };

			const fuse = new Fuse(place, {
				isCaseSensitive: false,
				keys: ['name', 'city'],
			});
			const result: Place[] = fuse.search(query.name || query.city).map((r) => r.item);
			return result;
		},
	});
	//search place by rating and category //100%
	server.route({
		method: 'GET',
		url: '/rating',
		schema: {
			summary: 'search by rating and category',
			tags: ['place'],
			querystring: Type.Object({
				category: Type.String(),
				city: Type.String(),
				rating: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const query: any = request.query as any;
			//if (!query.category || !query.city) return { message: 'please enter the name city and rating' };

			const place = await prismaClient.place.findMany({
				where: {
					category: {
						has: query.category,
					},
					city: query.city,
					rating: query.rating,
				},
				orderBy: {
					rating: 'asc',
				},
			});
			return place;
		},
	});
	//get the google maps url by longitude and latitude //100%
	server.route({
		method: 'GET',
		url: '/getgooglemapsurl',
		schema: {
			summary: 'get the google maps url by longitude and latitude',
			tags: ['place'],
			querystring: Type.Object({
				latitude: Type.String(),
				longitude: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const query: any = request.query as any;
			const url =
				`https://www.google.com/maps/search/?api=1&query=${query.latitude},${query.longitude}` as unknown as Url;
			return url;
		},
	});
	//search by category and the most favorite places //100% still the length
	server.route({
		method: 'GET',
		url: '/searchfav',
		schema: {
			summary: 'search by category and the most favorite places',
			tags: ['place'],
			querystring: Type.Object({
				category: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const query: any = request.query as any;

			//if (!query.category) return place;
			const place = await prismaClient.place.findMany({
				where: {
					category: {
						has: query.category,
					},
				},
				orderBy: {
					usersfavs: 'asc',
				},
			});
			return place;
		},
	});
	//search by category and the most expensive places
	server.route({
		method: 'GET',
		url: '/mostexpensive',
		schema: {
			summary: 'search by category and the most expensive places',
			tags: ['place'],
			querystring: Type.Object({
				category: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const query: any = request.query as any;

			const place = await prismaClient.place.findMany({
				where: {
					category: {
						has: query.category,
					},
				},
				orderBy: {
					price: 'desc',
				},
			});
			return place;
		},
	});
	//search by category and the most cheap places
	//copy its working
	server.route({
		method: 'GET',
		url: '/pricesearch',
		schema: {
			summary: 'search by category and the most cheap places',
			tags: ['place'],
			querystring: Type.Object({
				category: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const query: any = request.query as any;
			const place = await prismaClient.place.findMany({
				where: {
					category: {
						has: query.category,
					},
				},
				orderBy: {
					price: 'asc',
				},
			});
			return place;
		},
	});
	//trendy places
	//search by category and the most recent places and most favorite places //get the time as string
	server.route({
		method: 'GET',
		url: '/trendy',
		schema: {
			summary: 'search by category and the most recent places and most favorite places',
			tags: ['place'],
			querystring: Type.Object({
				category: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const query: any = request.query as any;
			const place = await prismaClient.place.findMany({
				where: {
					category: {
						has: query.category,
					},
				},
				orderBy: {
					// usersfavs: 'desc',
					created_at: 'desc',
				},
			});
			return place;
		},
	});
	//is it open now by category //how to get the current time //70%
	server.route({
		method: 'GET',
		url: '/isitopen',
		schema: {
			summary: 'is it open now by category',
			tags: ['place'],
			querystring: Type.Object({
				category: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const query: any = request.query as any;
			const place = await prismaClient.place.findMany({
				where: {
					category: {
						has: query.category,
					},
				},
			});
			return place;
		},
	});

	//add to favs
	server.route({
		method: 'POST',
		url: '/addfav',
		schema: {
			summary: 'add to favs',
			tags: ['place'],
			body: Type.Object({
				username: Type.String(),
			}),
		},
		handler: async (request, reply) => {},
	});
}
