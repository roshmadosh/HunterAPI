const express = require('express');
const router = express.Router();
const services = require('../services');

function createRouter(dataAccessor) {
  router.get('/', async (req, res) => {
    let resObject;
    if (req.query.username) {
      resObject = await services(dataAccessor).getAppUserByUsername(req.query);
    } else {
      resObject = await services(dataAccessor).getAllUsers();
    }

    res.status(200).send(resObject);
  });

  router.get('/:username', async (req, res) => {
    const resObject = await services(dataAccessor).getAppUserByUsername();

    res.status(200).send(resObject);
  });

  router.post('/', async (req, res) => {
    const resObject = await services(dataAccessor).addAppUser(req.body);

    if (!resObject.success) {
      res.status(200).send(resObject);
    } else {
      res.status(201).send(resObject);
    }
  });

  router.put('/', async (req, res) => {
    const requestObject = {
      ...req.body,
      username: req.query.username,
    }
    const resObject = await services(dataAccessor).updateAppUser(requestObject);

    res.status(200).send(resObject);
  });

  router.delete('/', async (req, res) => {
    const resObject = await services(dataAccessor).removeAppUser(req.query.username);

    res.status(200).send(resObject);
  });

  return router;
}

module.exports = createRouter;

