const express = require('express');
const router = express.Router();
const services= require('../services');


function createRouter(dataAccessor) {
  router.post('/', async (req, res) => {
    const respObj =  await services(dataAccessor).attemptLogin(req.body);

    if (!respObj.success) {
      return res.status(400).send(respObj);
    } else {

      res.cookie('token', respObj.token, 
      {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours
        httpOnly: true,
        secure: false,
      });

      return res.status(200).send(respObj);
    }
  })

  return router;
}


module.exports = createRouter;

