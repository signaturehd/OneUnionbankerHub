module.exports = {
  /* port of the app */
  port: 3000,
  /** The full path to the project's root directory */
  basePath: __dirname,
  /** The name of the directory containing the application source code */
  srcDir: 'src',
  /** The file name of the application's entry point */
  main: 'index.js',
  /** The name of the directory in which to emit compiled assets */
  outDir: 'dist',
  /** The base path for all projects assets (relative to the website root) */
  publicPath: '/',
  /** A hash map of keys that the compiler should treat as external to the project */
  externals: {},
  /** A hash map of variables and their values to expose globally */
  commonGlobals: {

  },

  prodGlobals: {
    IMAGE_URL: JSON.stringify('https://api.unionbankph.com/ubp/prod/hr/files/'),
    BASE_URL: JSON.stringify('https://api.unionbankph.com/ubp/prod/hr/benefits/'),
    ACCOUNT_URL: JSON.stringify('https://api.unionbankph.com/ubp/prod/hr/employees/'),
    ONBOARDING_URL: JSON.stringify('https://api.unionbankph.com/ubp/prod/hr/onboarding/'),
    COE_URL: JSON.stringify('https://api-uat.unionbankph.com/ubp/prod/'),
    CLIENT_ID: JSON.stringify('9c8024b2-24e7-4b90-a7db-69d751fa78ae'),
    CLIENT_SECRET: JSON.stringify('B8rA3uE0iL8tY8mO8gQ4pI0wM3rM3yJ7fD7bA3oC6kU0eH1rQ4'),
  },
  testGlobals: {
    IMAGE_URL: JSON.stringify('https://api-uat.unionbankph.com/ubp/uat/hr/files/'),
    BASE_URL: JSON.stringify('https://api-uat.unionbankph.com/ubp/uat/hr/benefits/'),
    ACCOUNT_URL: JSON.stringify('https://api-uat.unionbankph.com/ubp/uat/hr/employees/'),
    ONBOARDING_URL: JSON.stringify('https://api-uat.unionbankph.com/ubp/uat/hr/onboarding/'),
    COE_URL: JSON.stringify('https://api-uat.unionbankph.com/ubp/uat/'),
    CLIENT_ID: JSON.stringify('e409ff0a-4695-4a13-b67f-bf5fdf6b2590'),
    CLIENT_SECRET: JSON.stringify('U6aT1pP4dY5jA6tQ0pR7gF0aS3tK7rK8kD8aJ7yX4mN1yY7sU6'),
  },
  devGlobals: {
    IMAGE_URL: JSON.stringify('https://api-uat.unionbankph.com/ubp/uat/hr/files/'),
    BASE_URL: JSON.stringify('https://api-uat.unionbankph.com/ubp/uat/hr/benefits/'),
    ACCOUNT_URL: JSON.stringify('https://api-uat.unionbankph.com/ubp/uat/hr/employees/'),
    ONBOARDING_URL: JSON.stringify('https://api-uat.unionbankph.com/ubp/uat/hr/onboarding/'),
    COE_URL: JSON.stringify('https://api-uat.unionbankph.com/ubp/uat/'),
    CLIENT_ID: JSON.stringify('e409ff0a-4695-4a13-b67f-bf5fdf6b2590'),
    CLIENT_SECRET: JSON.stringify('U6aT1pP4dY5jA6tQ0pR7gF0aS3tK7rK8kD8aJ7yX4mN1yY7sU6'),
  },
}
