const envOptions = {
  modules: false,
  targets: { node: 'current', browsers: '> 2%, last 2 versions, not dead' },
  // Exclude transforms that make all code slower
  exclude: ['transform-typeof-symbol'],
};

const ENV = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
const isTest = ENV === 'test';

module.exports = {
  presets: [['@babel/preset-env', envOptions], '@babel/preset-react'],

  plugins: [
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    // Polyfills the runtime needed for async/await
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: false,
        regenerator: true,
      },
    ],
  ],

  env: {
    production: {
      plugins: [],
    },
    development: {
      plugins: [],
    },
    test: {
      presets: [['@babel/preset-env'], '@babel/preset-react'],
    },
  },

  overrides: [
    {
      test: /\.tsx?$/,
      presets: [
        ['@babel/preset-env', isTest ? undefined : envOptions],
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
    },
  ],
};
