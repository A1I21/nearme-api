import { Static, Type } from '@sinclair/typebox';
import { Category, Place, User } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import Fuse from 'fuse.js';
import { Url } from 'url';
import { addAuthorization, verifyToken } from '../../hooks/auth';

//query for search by name

//query for search by name and city
export const GetPlaceQuerybynaci = Type.Object({
	name: Type.Optional(Type.String()),
	city: Type.Optional(Type.String()),
});
type GetPlaceQuerybynaci = Static<typeof GetPlaceQuerybynaci>;

//model for place
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
	//add to favs
	server.route({
		method: 'POST',
		url: '/addfav',
		schema: {
			summary: 'add to favs',
			tags: ['place'],
			body: Type.Object({
				username: Type.String(),
			}),
		},
		handler: async (request, reply) => {},
	});
}
