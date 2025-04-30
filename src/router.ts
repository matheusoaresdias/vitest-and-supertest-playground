import express from 'express'
import TaskController from './controllers/TaskController'
import { asyncHandler } from './utils/asyncHandler'
import { TaskSchema } from './types/Task'
import { UpdateTaskSchema } from './types/UpdateTaskSchema'
import { validate } from './utils/zodValidate'

const router = express()

router.post('/tasks', validate(TaskSchema), asyncHandler(TaskController.store))
router.get('/tasks', asyncHandler(TaskController.index))
router.put('/tasks/:taskId', validate(UpdateTaskSchema), asyncHandler(TaskController.update))
router.delete('/tasks/:taskId', asyncHandler(TaskController.remove))

export default router
