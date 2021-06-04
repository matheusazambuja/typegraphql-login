module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    'minify'
  ],
  ignore: [
    '**/*.spec.ts'
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }]
  ]
}
