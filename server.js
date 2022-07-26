const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = require('http').Server(app)
const { Server } = require('socket.io')

const PORT = 3000
const rooms = new Map()

app.get('/rooms/:id', (req, res) => {
   const { id: roomId } = req.params
   const obj = rooms.has(roomId) ? {
      users: [...rooms.get(roomId).get('users').values()],
      messages: [...rooms.get(roomId).get('messages').values()]
   } : { users: [], messages: [] }
   res.json(obj)
})

app.post('/rooms', (req, res) => {
   const { roomId, username } = req.body
   if (!rooms.has(roomId)) {
      rooms.set(roomId, new Map([
         ['users', new Map()],
         ['messages', []]
      ]))
   }
   res.send()
})

const io = new Server(server, {
   cors: {
      origin: '*',
      methods: ['GET', 'POST']
   }
})

io.on('connection', socket => {
   socket.on('join', ({ roomId, username }) => {
      socket.join(roomId)
      rooms.get(roomId).get('users').set(socket.id, username)
      const users = [...rooms.get(roomId).get('users').values()]
      socket.to(roomId).emit('setUsers', users)
   })
   socket.on('disconnect', () => {
      rooms.forEach((value, roomId) => {
         if (value.get('users').delete(socket.id)) {
            const users = [...value.get('users').values()]
            socket.broadcast.to(roomId).emit('setUsers', users)
         }
      })
   })
})

server.listen(PORT, (err) => {
   if (err) {
      throw new Error(err)
   }
   console.log('PORT is working')
})