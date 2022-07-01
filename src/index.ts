import { connectDb } from './prisma';
import { listen, server } from './server';
var ObjectID = require('bson-objectid');

async function start() {
	console.log(ObjectID());
	await connectDb();
	listen();
}
start();
