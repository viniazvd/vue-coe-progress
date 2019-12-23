// const typescript = require('rollup-plugin-typescript2')

module.exports = {
  input: 'src/index.ts',
  banner: true,
  externals: ['vue'],
  output: {
    format: [
      'es',
      'cjs',
      'umd',
      'umd-min'
    ],
      moduleName: 'VueCoeProgress',
  },
  // plugins: [
  //   typescript({
  //     clean: true,
  //     verbosity: 0,
  //     useTsconfigDeclarationDir: true
  //   })
  // ]
}