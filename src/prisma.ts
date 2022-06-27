import { PrismaClient } from '@prisma/client';
export const prismaClient = new PrismaClient();

export async function connectDb() {
	await prismaClient.$connect();
}