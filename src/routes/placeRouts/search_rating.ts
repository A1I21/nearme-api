import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';

export default async function (server: FastifyInstance) {
	addAuthorization(server);
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
}
