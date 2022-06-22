const express = require('express');
const app = express();
const cors = require('cors');
const { mountRoutes } = require('./routes');

const corsOptions = {
  "origin": "http://localhost:9000", // overrides default *. Can't have wildcard for credentials to work
  "credentials": true // need this for cookies to be saved on browser
}
function createApp(dataAccessor: any) {
  app.use(express.json());
  app.use(cors(corsOptions));
  
  // injecting services as a dependency bc it (indirectly) provides the methods to access the database.
  mountRoutes(app, dataAccessor);
  
  return app;
}

export default createApp;
