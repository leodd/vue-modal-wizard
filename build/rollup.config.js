import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'

const pkg = require('../package.json')

const version = pkg.version

const babelConfig = {
  // runtimeHelpers: true,
  exclude: 'node_modules/**',
  plugins: ['external-helpers'],
  "presets": [
    [
      "env",
      {
        "modules": false
      }
    ]
  ]
}

const nodeResolveOptions = {
  module: true,
  jsnext: true,
  extensions: ['.js', '.vue'],
}

export default {
  banner: `/*
    vue-modal-wizard
    Version: ${version}
    Licence: MIT
    (c) Yuqiao Chen
  */
  `,
  entry: './src/index.js',
  external: ['vue'],
  globals: {
    vue: 'Vue',
  },
  format: 'umd',
  moduleName: 'VueModalWizard',
  dest: './dist/vue-modal-wizard.js', // equivalent to --output
  sourceMap: false,
  plugins: [vue(), babel(babelConfig), nodeResolve(nodeResolveOptions), commonjs()],
}