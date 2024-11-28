const redis = require('../redis');
const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  let current_todos = Number(await redis.getAsync('added_todos')) ?? 0
  current_todos++
  await redis.setAsync('added_todos', current_todos)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  return res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { id } = req.todo
  const todo = req.body

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { ...todo }, { new: true })
    res.send(updatedTodo)
  } catch (e) {
    res.status(405).send(e.message)

  }


});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
