import * as esbuild from "esbuild";

process.env.NODE_ENV === "develop";
// const a = require.resolve("react");
// const bc = require.resolve("react-dom");
// console.log(process.cwd());
// const main = async () => {
//   const b = await esbuild.build({
//     absWorkingDir: process.cwd(),
//     entryPoints: {
//       react: a,
//       "react-dom": bc,
//     },
//     bundle: true,
//     format: "esm",
//     outdir: "out",
//     splitting: true,
//     sourcemap: true,
//     ignoreAnnotations: true,
//     metafile: true,
//   });
//   console.log(b);
// };

//main();
const maps = new Set();
const scanPlugin = {
  name: "scana:import",
  setup(build: esbuild.PluginBuild) {
    build.onResolve({ filter: /[:word:]|@/ }, (args) => {
      console.log(args);
      if (
        args.importer &&
        !/node_modules/.test(args.importer) &&
        args.kind === "import-statement" &&
        /node_modules/.test(args.path)
      ) {
        console.log(args);
        maps.add(args.importer);
        return {
          path: args.path,
          namespace: "aaaaa",
        };
      }
    });
    build.onLoad({ filter: /.*/, namespace: "aaaaa" }, (args) => {
      console.log(args.path);
      return {
        contents: require(args.path),
        loader: "js",
      };
    });
  },
};

const a = require.resolve("./src");

const main = async () => {
  const b = await esbuild.build({
    absWorkingDir: process.cwd(),
    entryPoints: [a],
    write: false,
    bundle: true,
    format: "esm",
    plugins: [scanPlugin],
  });
  console.log(b);
  console.log(maps);
};

esbuild.build({ entryPoints: [a] });
