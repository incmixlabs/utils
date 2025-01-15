import { defineConfig } from "tsup"
import * as glob from "glob"

const entries = glob.sync("./src/**/*.ts")
export default defineConfig((opts) => ({
  entry: entries,
  format: ["esm"],
  splitting: true,
  sourcemap: true,
  minify: !opts.watch,
  clean: !opts.watch,
  dts: true,
  outDir: "dist",
}))
