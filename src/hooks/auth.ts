import { FastifyInstance } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function verifyToken(token: string): { flag: boolean; userId: string } {
	const mySecret = 'mysecret';
	let flag = false;
	let userId = '';
	jwt.verify(token, mySecret, (err, decoded) => {
		console.log(decoded);
		console.log(err);
		if (err) {
			flag = false;
		}
		if ((decoded as { username: string })?.username) {
			flag = true;
		}
	});
	return { flag, userId };
}
export function addAuthorization(server: FastifyInstance) {
	server.addHook('onRequest', async (request, reply) => {
		if (request.headers.authorization == undefined) {
			reply.status(400).send({ msg: "there's no token" });
		}
		let token = (request.headers as any).authorization as string;
		token = token.replace('Bearer ', '');
		const { flag, userId } = verifyToken(token);
		if (flag === false) reply.code(401).send({ msg: 'unauthorized' });
	});
}
