import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
const bcrypt = require('bcrypt');
import jwt, { JwtPayload } from 'jsonwebtoken';
const mySecret = 'mysecret';

export default async function (server: FastifyInstance) {
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
			if (isValid) {
				let token = jwt.sign({ username: user.username }, mySecret);
				return { token, name: user.name };
			}
			return { msg: 'user' };
		},
	});
}
