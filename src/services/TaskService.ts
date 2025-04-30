import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { TaskSchema } from '../types/Task'
import { UpdateTaskSchema } from '../types/UpdateTaskSchema'
import valdidateUserId from '../utils/validateUserId'
import createError from '../helper/createError'
const prisma = new PrismaClient()

async function create({ title, description, userId }: z.infer<typeof TaskSchema>) {
  const userExists = await valdidateUserId(userId)

  if (!userExists) throw createError('Invalid userId.', 400)

  return await prisma.task.create({
    data: { title, description, userId }
  })
}

async function findAll() {
  return await prisma.task.findMany()
}

async function findOne(taskId: number) {
  return await prisma.task.findUnique({
    where: { id: taskId }
  })
}

async function update(taskId: number, { title, description }: z.infer<typeof UpdateTaskSchema>) {
  return await prisma.task.update({
    where: { id: taskId },
    data: { title, description }
  })
}

async function remove(taskId: number) {
  await prisma.task.delete({
    where: { id: taskId }
  })
}

export default {
  create,
  findAll,
  findOne,
  update,
  remove
}
