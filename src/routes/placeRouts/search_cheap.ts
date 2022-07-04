import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';

export default async function (server: FastifyInstance) {
	addAuthorization(server);

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
}
