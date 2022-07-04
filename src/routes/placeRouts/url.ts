import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { Url } from 'url';
import { addAuthorization } from '../../hooks/auth';

export default async function (server: FastifyInstance) {
	addAuthorization(server);
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
}
