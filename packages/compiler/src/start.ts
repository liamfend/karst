import { createKarstServer } from "./server";

const start = async (): Promise<void> => {
  const server = createKarstServer({
    port: 3000,
  });

  console.log("starting port:3000,http://localhost:3000/");
  await server.listen();
};

export default start;
