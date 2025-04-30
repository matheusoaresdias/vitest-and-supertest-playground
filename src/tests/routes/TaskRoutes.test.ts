import request from 'supertest'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import app from '../../src/app'
import axios from 'axios'
import { mockUser } from '../../src/mocks/tests'

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>
}

vi.mock('axios')

describe('Task Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve criar uma tarefa com userId válido', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue(mockUser)

    const response = await request(app).post('/tasks').send({
      title: 'Nova Tarefa',
      description: 'Criar testes de integração',
      userId: 1,
    })

    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      title: 'Nova Tarefa',
      description: 'Criar testes de integração',
      userId: 1,
    })
  })

  it('deve retornar 400 se userId for inválido', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue({ status: 404 })

    const response = await request(app).post('/tasks').send({
      title: 'Tarefa com user inválido',
      description: 'Testar erro',
      userId: 9999,
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')
  })
})
