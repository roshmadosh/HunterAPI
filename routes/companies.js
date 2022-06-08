const express = require('express');
const router = express.Router();
const { runQuery } = require('./index');

router.get('/', async (req, res) => {
  const resObject = await runQuery({ text: 'SELECT * FROM company' });

  if (!resObject.success) {
    res.status(400).send(resObject);
  } else {
    res.status(200).send(resObject);
  }
});

router.post('/', async (req, res) => {
  const resObject = await runQuery({
    text: 'INSERT INTO company(industry_name, company_name) VALUES($1, $2)',
    values: [req.body['industry_name'], req.body['company_name']],
  })
  
  if (!resObject.success) {
    res.status(400).send(resObject);
  } else {
    res.status(201).send(resObject);
  }
})
module.exports = router;