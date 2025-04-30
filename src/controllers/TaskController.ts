import { Request, Response } from 'express'
import TaskService from '../services/TaskService'
import createError from '../helper/createError'

async function store(request: Request, response: Response) {
  const { title, description, userId } = request.body

  const createdTask = await TaskService.create({ title, description, userId })

  response.status(201).json(createdTask)
}

async function index(request: Request, response: Response) {
  const tasks = await TaskService.findAll()

  response.status(200).json(tasks)
}

async function update(request: Request, response: Response) {
  const { title, description } = request.body

  const parsedTaskId = parseInt(request.params.taskId)
  const taskExists = await TaskService.findOne(parsedTaskId)

  if (!taskExists) throw createError('Task not found.', 400)

  const updatedTask = await TaskService.update(parsedTaskId, { title, description })

  response.status(200).json(updatedTask)
}

async function remove(request: Request, response: Response) {
  await TaskService.remove(parseInt(request.params.taskId))

  response.status(204)
}

export default {
  store, index, update, remove
}
