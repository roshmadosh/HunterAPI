const express = require('express');
const router = express.Router();
const services= require('../services');
const path = require('path');
const { authenticateUser } = require('../middleware');


function createRouter(dataAccessor) {
  /**
   * Example of serving a static file from an endpoint. UI routing is done by
   * React. Serving static files with React will prob require everything be served
   * from server. Did not originally set up that way, will try in some other proj.
   */
  // router.get('/home', (req, res) => {
  //   res.sendFile(path.join(__dirname, '..', 'views', 'index.html'), (err) => {
  //     if (err) {
  //       console.error(err);
  //     };
  //   });
  // })
  router.post('/', async (req, res) => {
    const { rememberMe } = req.body;
    const respObj =  await services(dataAccessor).attemptLogin(req.body);

    if (!respObj.success) {
      return res.status(200).send(respObj);
    } else {
      const expiry = new Date(Date.now() + parseInt(process.env.JWT_EXPIRES_IN) * 1000);
      res.cookie('token', respObj.token, 
      {
        httpOnly: true,
        secure: false,
        // this sets expiration time in browser. Should but doesn't have to match expiry encoded in token
        ...(rememberMe && { expires: expiry }) 
      });

      return res.status(200).send(respObj);
    }
  })

  router.use(authenticateUser);
  router.get('/', async (req, res) => {
    if (!req.username) {
      return res.status(400).send({
        success: false,
        apiCalled: false,
        message: 'Token verification failed.'
      });
    } 

    const respObj = await services(dataAccessor).getAppUserByUsername({ username: req.username });

    if (!respObj.success) {
      return res.status(403).send(respObj);
    } else {
      return res.status(200).send({
        success: true,
        apiCalled: true,
        data: respObj.data
      });
    }
  })
  return router;
}


module.exports = createRouter;

