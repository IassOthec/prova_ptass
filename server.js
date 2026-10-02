

import express from 'express'
import { readUsers } from './db.js'

const App = express()

app.get('/users', async (req, res) => {
    const users = await readUsers()
    res.json(users)
})

app.get('/users/:id', async (req, res) => {
    const users = await readUsers()
    const user = users.find(u => u.id === Number(req.params.id))
    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' })
    res.json(user)
})

app.listen(3000, () => console.log('API rodando em :3000'))

const app = express()
const PORT = 3000


app.get('/', (req, res) => {
    res.send('Biblioteca de Usuários')
})
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})

app.get('/json', (req, res) => {
    res.json({ mensagem: 'Olá, bem-vindo!', timestamp: Date.now() })
})


app.patch('/users/:id', async (req, res) => {
  const id = Number(req.params.id)
  const users = await readUsers()
  const user = users.find(u => u.id === id)
  if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' })

  const { id: _, createdAt: __, updatedAt: ___, ...dadosPermitidos } = req.body || {}
  Object.assign(user, dadosPermitidos)
  
})
