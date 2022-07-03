import { FastifyInstance } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { tokens } from '../routes/login';

function verifyToken(token: string): { flag: boolean; userId: string } {
	const mySecret = 'mysecret';
	let flag = false;
	let userId = '';
	jwt.verify(token, mySecret, (err, decoded) => {
		if (err) {
			flag = false;
		}
		if ((decoded as { id: string }).id) {
			flag = true;
		}
	});
	return { flag, userId };
}
export function addAuthorization(server: FastifyInstance) {
	server.addHook('onRequest', async (request, reply) => {
		if (request.headers.token == undefined) {
			reply.status(400).send({ msg: "there's no token " });
		}
		const token = (request.headers as any).authorization;
		const { flag, userId } = verifyToken(token);
		if (flag === false) reply.code(401).send({ msg: 'unauthorized' });
	});
}
