const express = require('express');
const router = express.Router();
const { companyServices } = require('../services');

router.get('/', async (req, res) => {
  const resObject = await companyServices.getCompanies();

  if (!resObject.success) {
    res.status(400).send(resObject);
  } else {
    res.status(200).send(resObject);
  }
});

router.get('/:id', async (req, res) => {
  const { id: company_id } = req.params;
  const resObject = await companyServices.getCompanyById(company_id);

  if (!resObject.success) {
    res.status(400).send(resObject);
  } else {
    res.status(200).send(resObject);
  }
})

router.post('/', async (req, res) => {
  const resObject = await companyServices.addCompany(req.body);
  
  if (!resObject.success) {
    res.status(400).send(resObject);
  } else {
    res.status(201).send(resObject);
  }

})

router.put('/:id', async (req, res) => {
  const { id: company_id } = req.params;
  const param = { company_id, ...req.body };
  const resObject = await companyServices.updateCompany(param);

  if (!resObject.success) {
    res.status(400).send(resObject);
  } else {
    res.status(200).send(resObject);
  }
})

module.exports = router;