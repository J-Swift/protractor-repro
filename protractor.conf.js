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

    // NOTE(jpr): this is to workaround EPIPE errors in protractor. We should test removing this when
    // the underlying selenium webdriver is upgraded to v4.0.
    // See https://github.com/angular/protractor/issues/4294#issuecomment-357941307
    let currentCommand = Promise.resolve();
    const webdriverSchedule = browser.driver.schedule;
    browser.driver.schedule = (command, description) => {
      currentCommand = currentCommand.then(() =>
        webdriverSchedule.call(browser.driver, command, description)
      );
      return currentCommand;
    };
  },
};

exports.config = config;

