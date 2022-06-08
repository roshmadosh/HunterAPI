const express = require('express');
const router = express.Router();
const { runQuery } = require('./index');

router.get('/', async (req, res) => {
  const resObject = await runQuery({ text: 'SELECT * FROM industry' });

  if (!resObject.success) {
    res.status(400).send(resObject);
  } else {
    res.status(200).send(resObject);
  }
});

router.post('/', async (req, res) => {
  const resObject = await runQuery({ 
    text: 'INSERT INTO industry(industry_name) VALUES($1)',
    values: [req.body['industry_name']]
  });

  if (!resObject.success) {
    res.status(400).send(resObject);
  } else {
    res.status(201).send(resObject);
  }
})

module.exports = router;