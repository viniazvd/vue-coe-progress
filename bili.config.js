/**
 * Bili's configuration object.
 * @type {import('bili').Config}
 */
module.exports = {
  input: 'src/index.ts',
  banner: true,
  externals: ['vue'],
  output: {
    format: ['es', 'cjs', 'umd', 'umd-min'],
    moduleName: 'VueCoeProgress',
  },
  plugins: {
    typescript2: {
      clean: true,
      verbosity: 0,
      useTsconfigDeclarationDir: true
    }
  }
}