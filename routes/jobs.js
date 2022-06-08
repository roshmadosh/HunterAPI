const express = require('express');
const router = express.Router();
const { runQuery } = require('./index');

router.get('/', async (req, res) => {
  const resObject = await runQuery({ text: 'SELECT * FROM job' });

  if (!resObject.success) {
    res.status(400).send(resObject);
  } else {
    res.status(200).send(resObject);
  }
})

router.get('/:id', (req, res) => {

})

router.post('/', (req, res) => {
})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})


module.exports = router;