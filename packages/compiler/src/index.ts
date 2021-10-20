import { Command } from "commander";
import start from "./start";
//TODO: 替换成require package.json
const program = new Command();

export interface Params {
  debug: boolean;
  lint: string;
  start: string;
  build: string;
}
export interface StartOptions {
  client?: boolean;
  server?: boolean;
}

program.version("0.1.1");

// program
//   .command("start")
//   .option("-c, --client", "SPA, client render")
//   .option("-s, --server", "SSR, server render")
//   .action((options: StartOptions) => {
//     if (options.server) {
//       //只要不是ssr都走client
//     } else {
//       console.log(options);
//     }
//   });
program.command("start").description("SPA, client render").action(start);

program.parse();
