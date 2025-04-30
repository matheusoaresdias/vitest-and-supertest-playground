import { mockUser, mockCreateTask, mockCreatedTask, mockFindAllTasks, mockUpdatedTask } from '../../src/mocks/tests'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import TaskService from '../../src/services/TaskService'

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>
}

vi.mock('axios')

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: vi.fn().mockImplementation(() => ({
      task: {
        findMany: vi.fn().mockResolvedValue(mockFindAllTasks),
        create: vi.fn().mockResolvedValue(mockCreatedTask),
        update: vi.fn().mockResolvedValue(mockUpdatedTask),
        delete: vi.fn().mockResolvedValue(undefined)
      }
    }))
  }
})

beforeEach(() => {
  vi.clearAllMocks()
})

describe('TaskService', () => {
  it('deve criar uma tarefa válida se o usuário existir', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue(mockUser)

    const task = await TaskService.create(mockCreateTask)

    expect(task).toHaveProperty('id')
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.USERS_API}/users/1`
    )
  })

  it('deve listar todas as tasks', async () => {
    const tasks = await TaskService.findAll()

    expect(tasks).toEqual(mockFindAllTasks)
  })

  it('deve atualizar o título e descrição da task', async () => {
    const updatedTask = await TaskService.update(mockCreatedTask.id, mockCreatedTask)

    expect(updatedTask).toEqual(mockUpdatedTask)
  })

  it('deve lançar erro se o userId for inválido', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue(null)

    await expect(
      TaskService.create(mockCreateTask)
    ).rejects.toThrowError('Invalid userId.')
  })
})
