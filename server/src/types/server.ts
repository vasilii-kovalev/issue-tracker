import Fastify from "fastify";

type Server = ReturnType<typeof Fastify>;

type UseRoutes = (server: Server) => void;

export {
	type UseRoutes,
}
