import fastifyAutoload from '@fastify/autoload';
import fastifySwagger from '@fastify/swagger';
import { ajvTypeBoxPlugin, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import { join } from 'path';

// Create a fastify instance
export const server = fastify({
	logger: true,
	ajv: {
		customOptions: {
			removeAdditional: 'all',
			ownProperties: true,
		},
		plugins: [ajvTypeBoxPlugin],
	},
}).withTypeProvider<TypeBoxTypeProvider>();

//the swagger plugin
server.register(fastifySwagger, {
	routePrefix: '/docs',
	exposeRoute: true,
	mode: 'dynamic',
	openapi: {
		info: {
			title: 'myAPI',
			version: '1.0.0',
		},
		security: [
			{
				bearerAuth: [],
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
	},
});

//auto load all the routes
server.register(fastifyAutoload, {
	dir: join(__dirname, 'routes'),
});
const port: any = process.env.PORT ?? process.env.$PORT ?? 3002;

export function listen() {
	server
		.listen({
			port: port,
			host: '0.0.0.0',
		})
		.catch((err) => {
			server.log.error(err);
			process.exit(1);
		});
}
