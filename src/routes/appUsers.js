const express = require('express');
const router = express.Router();
const services = require('../services');

function createRouter(dataAccessor) {
  router.get('/', async (req, res) => {
    const resObject = await services(dataAccessor).getAllUsers();

    if (!resObject.success) {
      res.status(400).send(resObject);
    } else {
      res.status(200).send(resObject);
    }
  });

  router.post('/', async (req, res) => {
    const resObject = await services(dataAccessor).addAppUser(req.body);

    if (!resObject.success) {
      res.status(400).send(resObject);
    } else {
      res.status(201).send(resObject);
    }
  })

  return router;
}

module.exports = createRouter;

