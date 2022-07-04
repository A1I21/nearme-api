import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';

export default async function (server: FastifyInstance) {
	addAuthorization(server);
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
}
