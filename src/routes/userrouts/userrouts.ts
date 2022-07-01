import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { type } from 'os';
import { usercreatcont } from '../../controller/createUser';
import { User } from '@prisma/client';
import { prismaClient } from '../../prisma';
const bcrypt = require('bcrypt');
var ObjectID = require('bson-objectid');

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
const User = Type.Object({
	user_id: Type.String(),
	username: Type.String(),
	password: Type.String(),
	email: Type.String(),
	phone: Type.String(),
	name: Type.String(),
});

export default async function (server: FastifyInstance) {
	//create user and return created user message
	server.route({
		method: 'POST',
		url: '/usercreate',
		schema: {
			summary: 'create a new user',
			tags: ['user'],
			body: User,
		},
		handler: async (request, reply) => {
			//bcrypt password
			const body = request.body as any;

			const hashedPassword = await bcrypt.hash(body.password, 10);
			const newuser = {
				user_id: body.user_id,
				username: body.username,
				password: hashedPassword,
				email: body.email,
				phone: body.phone,
				name: body.name,
			};

			await prismaClient.user.create({
				data: {
					...newuser,
				},
			});
			return { msg: 'user created successfully' };
		},
	});
	//
	//login user and return user token
	server.route({
		method: 'POST',
		url: '/userlogin',
		schema: {
			summary: 'login a user',
			tags: ['user'],
			body: User,
		},
		handler: async (request, reply) => {
			const body = request.body as any;
			const user = await prismaClient.user.findMany({
				where: {
					username: body.username,
				},
			});
			if (!user) {
				return { msg: 'user not found' };
			}
			const isMatch = await bcrypt.compare(body.password, user);
			if (!isMatch) {
				return { msg: 'password incorrect' };
			}
			return { msg: 'user logged in successfully' };
		},
	});
}
// }
