import { server } from "./server";


server.listen({ port: 300 }).catch((err) => {
	server.log.error(err);
	process.exit(1);
});

