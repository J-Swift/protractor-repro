const config = {
  allScriptsTimeout: 11000,
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  useAllAngular2AppRoots: true,

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  specs: ['./e2e/**/*.feature'],
  cucumberOpts: {
    require: ['./e2e/_shared/setup.ts', './e2e/**/*.steps.ts'],
    tags: [],
    format: ['node_modules/cucumber-pretty'],
    strict: true,
    dryRun: false,
    compiler: []
  },

  onPrepare: function () {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
};

exports.config = config;
