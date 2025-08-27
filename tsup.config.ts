import * as glob from "glob"
import { defineConfig } from "tsup"

const entries = glob.sync("./src/**/*.ts", {
  ignore: ["**/*.spec.ts", "**/*.test.ts"],
})
export default defineConfig((opts) => ({
  entry: entries,
  format: ["esm"],
  splitting: true,
  sourcemap: true,
  minify: !opts.watch,
  clean: !opts.watch,
  treeshake: true,
  dts: true,
  outDir: "dist",
}))
