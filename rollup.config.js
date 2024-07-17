import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import json from "@rollup/plugin-json";
import commonjs from "rollup-plugin-commonjs";
import { map, mapValues } from "lodash";

const packages = require("./package.json");

const { dependencies } = packages;
const external = map(dependencies, (mod, key) => key);
const globals = mapValues(dependencies, (mod, key) => key);
export default {
  input: "src/server.js",
  output: {
    name: "lightency-backend",
    file: "dist/bundle.js",
    format: "umd",
    globals
  },
  external,
  plugins: [
    babel({
      babelrc: false,
      presets: [
        [
          "env",
          {
            targets: {
              node: "current"
            },
            modules: false
          }
        ]
      ],
      plugins: [
        "transform-export-default",
        "@babel/plugin-proposal-object-rest-spread",
        [
          "module-resolver",
          {
            root: ["./"],
            alias: {
              utils: "./src/utils"
            }
          }
        ]
      ],
      exclude: "node_modules/**"
    }),
    json(),
    commonjs(),
    resolve()
  ]
};
