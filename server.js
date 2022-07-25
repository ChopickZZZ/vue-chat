const express = require('express')
const useSocket = require('socket.io')

const app = express()
const server = require('http').Server(app)
const io = useSocket(server)

const PORT = 3000

app.get('/rooms', (req, res) => {
   res.json(rooms)
})

server.listen(PORT, (err) => {
   if (err) {
      throw new Error(err)
   }
   console.log('PORT is working')
})