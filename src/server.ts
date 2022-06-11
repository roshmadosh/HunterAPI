const express = require('express');
const app = express();
const { mountRoutes } = require('./routes');


function createApp(dataAccessor: any) {
  app.use(express.json());
  
  // injecting services as a dependency bc it (indirectly) provides the methods to access the database.
  mountRoutes(app, dataAccessor);
  
  return app;
}

export default createApp;
