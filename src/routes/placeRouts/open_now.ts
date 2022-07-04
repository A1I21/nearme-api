import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';

export default async function (server: FastifyInstance) {
	addAuthorization(server);

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
}
