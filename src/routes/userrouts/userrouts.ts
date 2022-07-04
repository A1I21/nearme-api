import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { User } from '@prisma/client';
import { prismaClient } from '../../prisma';

const bcrypt = require('bcrypt');
const mySecret = 'mysecret';
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
}
