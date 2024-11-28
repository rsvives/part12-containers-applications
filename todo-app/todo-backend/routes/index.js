const redis = require('../redis');
const express = require('express');
const router = express.Router();

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const added_todos = Number(await redis.getAsync('added_todos') ?? 0)
  res.json({ added_todos })
})

module.exports = router;
