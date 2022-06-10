const express = require('express');
const { service } = require('../services');
const router = express.Router();


// router.get('/', async (req, res) => {
//   const resObject = await service.getJobs();

//   if (!resObject.success) {
//     res.status(400).send(resObject);
//   } else {
//     res.status(200).send(resObject);
//   }
// })

router.get('/:id', (req, res) => {

})

router.post('/', (req, res) => {
})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})


module.exports = router;