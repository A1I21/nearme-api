import { Place } from '@prisma/client';
import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';

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

export default async function (server: FastifyInstance) {
	addAuthorization(server);
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
}
