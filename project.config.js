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
  },
  testGlobals: {
  },
  devGlobals: {
    BASE_URL: JSON.stringify('https://api-uat.unionbankph.com/ubp/uat/hr/benefits/'),
    CLIENT_ID: JSON.stringify('5a52c99a-1303-42f5-9871-9e3844f1fd9f'),
    CLIENT_SECRET: JSON.stringify('sJ2sU2mJ4eE2oI6wM7rY3mG6jT1mS2eT1wY3pR8qP7jL2uC5iT'),
  },
}
