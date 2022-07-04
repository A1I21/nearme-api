import fastify from 'fastify';
import { addAuthorization } from './hooks/auth';
import { connectDb } from './prisma';
import { listen, server } from './server';
var ObjectID = require('bson-objectid');

async function start() {
	await connectDb();
	listen();
}
start();
