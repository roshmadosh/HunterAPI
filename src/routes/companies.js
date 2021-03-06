const express = require('express');
const router = express.Router();
const services = require('../services');

function createRouter(dataAccessor) {
  router.get('/', async (req, res) => {
    const resObject = await services(dataAccessor).getCompanies();
  
    res.status(200).send(resObject);
  });
  
  router.get('/:id', async (req, res) => {
    const { id: company_id } = req.params;
    const resObject = await services(dataAccessor).getCompanyById(company_id);
  
    res.status(200).send(resObject);
  })
  
  router.post('/', async (req, res) => {
    const resObject = await services(dataAccessor).addCompany(req.body);
    
    if (!resObject.success) {
      res.status(200).send(resObject);
    } else {
      res.status(201).send(resObject);
    }
  
  })
  
  router.put('/:id', async (req, res) => {
    const { id: company_id } = req.params;
    const param = { company_id, ...req.body };
    const resObject = await services(dataAccessor).updateCompany(param);
  
    res.status(200).send(resObject);
  })

  router.delete('/:id', async (req, res) => {
    const { id: company_id } = req.params;
    const resObject = await services(dataAccessor).removeCompany(company_id);

    res.status(200).send(resObject);
  })

  return router;
}


module.exports = createRouter;