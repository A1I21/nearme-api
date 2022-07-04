import { Place } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import Fuse from 'fuse.js';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
import { GetPlaceQuerybynaci } from './placsesrouts';
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

type GetPlaceQuerybynaci = Static<typeof GetPlaceQuerybynaci>;
export default async function (server: FastifyInstance) {
	addAuthorization(server);
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
}
