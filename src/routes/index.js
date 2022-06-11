const { MODELS } = require('../models');

/**
 *  kept routes in JS, didn't want to import types for Express. dataAccessor is for decoupling production database from 
 *  controller and service layer.
 */
module.exports = {
  mountRoutes: (app, dataAccessor) => {
    MODELS.forEach(model => {
      app.use(`/api/v1/${model}`, require(`./${model}`)(dataAccessor))
    });
  }
}