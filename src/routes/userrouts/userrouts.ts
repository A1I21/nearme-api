import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { type } from 'os';
import { usercreatcont } from '../../controller/createUser';
import { User } from '@prisma/client';
import { prismaClient } from '../../prisma';
import { ObjectId } from 'bson';
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
	//login user and check if user exists and check if password is correct
	server.route({
		method: 'POST',
		url: '/userlogin',
		schema: {
			summary: 'login a user',
			tags: ['user'],
			body: Type.Object({
				username: Type.String(),
				password: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const body = request.body as any;
			const user = await prismaClient.user.findFirst({
				where: {
					username: body.username,
				},
			});
			if (!user) {
				return { msg: 'user not found' };
			}
			const isValid = await bcrypt.compare(body.password, user.password);
			if (!isValid) {
				return { msg: 'password is incorrect' };
			}
			return { msg: 'user logged in successfully' };
		},
	});
}
// }
