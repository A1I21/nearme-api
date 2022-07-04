import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';

export default async function (server: FastifyInstance) {
	addAuthorization(server);

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
}
