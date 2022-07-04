import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';

export default async function (server: FastifyInstance) {
	addAuthorization(server);
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
}
