import { Static, Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { FastifyInstance } from 'fastify';

const LoginBody = Type.Object({
	email: Type.String({ format: 'email' }),
	password: Type.String(),
});
type LoginBody = Static<typeof LoginBody>;

export const tokens: string[] = [];
export const tokenUsers: { [token: string]: string } = {};

export default async function (server: FastifyInstance) {
	server.route({
		method: 'POST',
		url: '/login',
		schema: {
			summary: 'Login a user and returns a token',
			body: LoginBody,
		},
		handler: async (request, reply) => {
			const { email, password } = request.body as LoginBody;
			/// check if user and password are correct

			const newToken = new ObjectId().toHexString();

			tokens.push(newToken);
			tokenUsers[newToken] = email;

			return newToken;
		},
	});
}
