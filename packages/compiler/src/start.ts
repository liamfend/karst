import { createKarstServer } from "./server";

const start = async (): Promise<void> => {
  const server = createKarstServer({
    port: 3000,
  });
  server.listen();
  console.log("starting port:3000,http://localhost:3000/");
};

export default start;
