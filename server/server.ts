import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { fastify } from "fastify";
import { routes } from "./routes/contacts";

const app = fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();

app.register(routes, { prefix: "/api/contacts" });

// Run the server!
const start = async () => {
  try {
    await app.listen({ port: 4567 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
