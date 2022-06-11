const express = require('express');
const router = express.Router();


function createRouter(dataAccessor) {
  // router.get('/', async (req, res) => {
  //   const resObject = await dataAccessor.getJobs();

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

  return router;
}



module.exports = createRouter;