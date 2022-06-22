const express = require('express');
const router = express.Router();

function createRouter(dataAccessor) {
  router.get('/', async (req, res) => {
    const resObject = await dataAccessor.getIndustries();
  
    res.status(400).send(resObject);

  });
  
  router.post('/', async (req, res) => {
    const resObject = await dataAccessor.addIndustry(req.body['industry_name']);
  
    if (!resObject.success) {
      res.status(200).send(resObject);
    } else {
      res.status(201).send(resObject);
    }
  })
  
  return router;
}


module.exports = createRouter;