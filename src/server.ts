const express = require('express');
const app = express();
const { mountRoutes } = require('./routes');

app.use(express.json());
mountRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`Listening in ${process.env.NODE_ENV} on port ${process.env.PORT}`)
});
