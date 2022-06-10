const { MODELS } = require('../models');

/**
 *  kept routes in JS, didn't want to import types for Express
 */
module.exports = {
  mountRoutes: (app) => {
    MODELS.forEach(model => {
      app.use(`/api/v1/${model}`, require(`./${model}`))
    });
  }
}