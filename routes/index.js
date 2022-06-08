const db = require('../db');

const routes = [
  'jobs',
  'companies',
  'industries',
];

const runQuery = async (queryConfig) => {
  try {
    const resp = await db.query(queryConfig);
    const data = resp.rows;
    return { success: true, data };
  } catch (err) {
    console.error(err.stack);
    return { success: false, message: err.message };
  } 
}

module.exports = {
  runQuery,
  mountRoutes: (app) => {
    routes.forEach(route => {
      app.use(`/api/v1/${route}`, require(`./${route}`))
    });
  }
}