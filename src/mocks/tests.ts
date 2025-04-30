export const mockUser = {
  data: {
    'id': 1,
    'name': 'Leanne Graham',
    'username': 'Bret',
    'email': 'Sincere@april.biz',
    'address': {
      'street': 'Kulas Light',
      'suite': 'Apt. 556',
      'city': 'Gwenborough',
      'zipcode': '92998-3874',
      'geo': {
        'lat': '-37.3159',
        'lng': '81.1496'
      }
    },
    'phone': '1-770-736-8031 x56442',
    'website': 'hildegard.org',
    'company': {
      'name': 'Romaguera-Crona',
      'catchPhrase': 'Multi-layered client-server neural-net',
      'bs': 'harness real-time e-markets'
    }
  }
}

export const mockCreateTask = {
  title: 'Tarefa Teste',
  description: 'Descrição da tarefa',
  userId: 1
}

export const mockCreatedTask = {
  id: 1,
  title: 'Test',
  description: 'Desc',
  userId: 1
}

export const mockFindAllTasks = [
  {
    id: 1,
    title: 'Test',
    description: 'Desc',
    userId: 1
  },
  {
    id: 2,
    title: 'Test 2',
    description: 'Desc 2',
    userId: 2
  }
]

export const mockUpdatedTask = {
  id: 1,
  title: 'Updated test',
  description: 'Desc updated',
  userId: 1
}
