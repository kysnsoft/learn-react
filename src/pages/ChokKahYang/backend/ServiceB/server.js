const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 8000

const server = require('http').createServer(app)
const io = require('socket.io')(server)
const client = require('socket.io-client');

let counterUser = 0

io.on("connection", socket => {

    const serviceA = client.connect('http://localhost:4000', {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: Infinity
    })

    console.log(`Connect: --Client-- ${socket.id}`)
    counterUser++
    io.emit('userCount', { counterUser })

    socket.on('disconnect', (data) => {
        serviceA.emit('disconnectTopic')

        console.log(`Disconnected: --Client-- ${socket.id}`)
        counterUser--
        io.emit('userCount', { counterUser })
    })


    serviceA.on('topics', (data) => {
        io.emit('topics', data)
    })

    socket.on('topic:delete', data => {
        serviceA.emit('topic:delete', data)
    })

    serviceA.on('topic:delete', data => {
        io.emit('topics', data.topics)
        socket.emit('resultMsg', data.msg)
    })

    socket.on('topic:add', data => {
        serviceA.emit('topic:add', data)
    })

    serviceA.on('topic:add', data => {
        io.emit('topics', data.topics)
        socket.emit('resultMsg', data.msg)
    })

    socket.on('topic:edit', data => {
        serviceA.emit('topic:edit', data)
    })

    serviceA.on('topic:edit', data => {
        io.emit('topics', data.topics)
        socket.emit('resultMsg', data.msg)
    })

})





server.listen(port, () => {
    console.log(`Socket server is running on port : ${port}`)
})