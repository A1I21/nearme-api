import { Place } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import Fuse from 'fuse.js';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';

export const GetPlaceQuerybyanme = Type.Object({
	name: Type.Optional(Type.String()),
});
type GetPlaceQuerybyanme = Static<typeof GetPlaceQuerybyanme>;
export default async function (server: FastifyInstance) {
	addAuthorization(server);
	//view all places or search by the name //100%
	server.route({
		method: 'GET',
		url: '/place',
		schema: {
			summary: 'view all places pr search by name',
			tags: ['place'],
			querystring: GetPlaceQuerybyanme,
			headers: {
				token: Type.String(),
			},
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
}
