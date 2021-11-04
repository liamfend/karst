import * as esbuild from "esbuild";
import path from "path";
import fs, { WriteFileOptions } from "fs";

const karstCachePath = path.join(process.cwd(), "node_modules", ".karst");
console.log(karstCachePath);
const isMonoRepo = true;

fs.rmdirSync(karstCachePath, { recursive: true });
esbuild
  .build({
    write: false,
    entryPoints: ["./src/index.tsx"],
    bundle: true,
    metafile: true,
  })
  .then((data) => {
    //    console.log( data?.metafile?.inputs);
    // let inputs = data?.metafile?.inputs??{}
    //  Object.keys(inputs).forEach(item =>{
    //      console.log(item)
    //      console.log(inputs[`${item}`])
    //  })
    const inputs = data?.metafile?.inputs ?? {};
    console.log(inputs);
    const moduleGraph = Object.keys(inputs)
      .filter(
        (item) =>
          !item.startsWith(isMonoRepo ? "../../node_modules" : "node_modules")
      )
      .map((item) => inputs[`${item}`].imports)
      .flat()
      .filter((node) =>
        node.path.includes(isMonoRepo ? "../../node_modules" : "node_modules")
      );

    const resolveGraph = moduleGraph.map((mo) => {
      const nameReg = mo.path.match(/node_modules\/(.*)?\//);

      return {
        name: nameReg?.[1],
        path: mo.path,
        kind: mo.kind,
      };
    });

    if (!fs.existsSync(karstCachePath)) {
      fs.mkdirSync(karstCachePath);
    }
    fs.writeFileSync(
      path.join(karstCachePath, "__meta.json"),
      JSON.stringify(moduleGraph),
      { flag: "w+" }
    );
    return resolveGraph;
  })
  .then((data) => {
    console.log(data);
    const mapKeys: Record<string, string> = {};
    data.forEach((t) => {
      mapKeys[`${t.name || ""}`] = t.path;
    });
    esbuild.buildSync({
      entryPoints: mapKeys,
      bundle: true,
      splitting: true,
      metafile: true,
      outdir: karstCachePath,
      format: "esm",
    });
  });
