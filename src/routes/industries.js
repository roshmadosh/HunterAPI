const express = require('express');
const router = express.Router();
const { industryServices } = require('../services');

router.get('/', async (req, res) => {
  const resObject = await industryServices.getIndustries();

  if (!resObject.success) {
    res.status(400).send(resObject);
  } else {
    res.status(200).send(resObject);
  }
});

router.post('/', async (req, res) => {
  const resObject = await industryService.addIndustry(req.body['industry_name']);

  if (!resObject.success) {
    res.status(400).send(resObject);
  } else {
    res.status(201).send(resObject);
  }
})

module.exports = router;