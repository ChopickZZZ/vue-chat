const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const server = require('http').Server(app)
const { Server } = require('socket.io')

const PORT = 3000
const rooms = new Map()

app.get('/rooms', (req, res) => {
   res.json(rooms)
})

app.post('/rooms', (req, res) => {
   const { roomId, username } = req.body
   if (!rooms.has(roomId)) {
      rooms.set(roomId, new Map([
         ['users', new Map()],
         ['messages', []]
      ]))
   }
   res.json([...rooms.keys()])
})

const io = new Server(server, {
   cors: {
      origin: '*',
      methods: ['GET', 'POST']
   }
})

io.on('connection', socket => {
   socket.on('joined', ({ roomId, username }) => {
      socket.join(roomId)
      rooms.get(roomId).get('users').set(socket.id, username)
      const users = [...rooms.get(roomId).get('users').values()]
      socket.broadcast.to(roomId).emit('joined', users)
   })
   console.log('user connected', socket.id)
})

server.listen(PORT, (err) => {
   if (err) {
      throw new Error(err)
   }
   console.log('PORT is working')
})