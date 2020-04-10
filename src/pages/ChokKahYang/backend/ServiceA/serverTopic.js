const axios = require('./axiosConfig')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 4000

require('dotenv').config({ path: './config.env' })

app.use(express.json())

//MongoDB
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
}).catch(err => {
    console.log(`Topic DB Error: ${err.message}`)
})

mongoose.connection.once('open', () =>
    console.log(`MongoDB database (Topic) connection established successfully`)
)
/////////
const topicsRouter = require('./routes/topics')
app.use('/api/topics', topicsRouter)
////////
const server = require('http').createServer(app)
const io = require('socket.io')(server)


let topics = []


//Get all topics
const getTopicAndEmit = async socket => {
    try {
        const res = await axios.get('/api/topics')
        topics = res.data
        socket.emit('topics', topics)
    } catch (err) {
        console.log(`${err}`)
    }
}


io.on("connection", socket => {
    console.log(`Connect: --ServiceTopic-- ${socket.id}`)

    socket.on('disconnectTopic', () => {
        console.log(`Disconnected: --ServiceTopic-- ${socket.id}`)
    })

    getTopicAndEmit(socket)

    socket.on('topic:delete', async data => {
        try {
            const resDel = await axios.delete('/api/topics/' + data.deleteId)
            topics = topics.filter(topic => topic._id !== data.deleteId)

            socket.emit('topic:delete', {
                msg: {
                    text: resDel.data,
                    color: false
                },
                topics
            })
        } catch (err) {
            console.log(`Error: ${err}`)
        }
    })

    socket.on('topic:add', async data => {
        try {
            const resAdd = await axios.post('/api/topics/add', data.newTopic)
            const newTopics = await axios.get('/api/topics')
            topics = newTopics.data

            socket.emit('topic:add', {
                msg: {
                    text: resAdd.data,
                    color: true
                },
                topics
            })
        } catch (err) {
            socket.emit('topic:add', {
                msg: {
                    text: "Topic existed! Please enter another...",
                    color: false
                },
                topics
            })
        }
    })

    socket.on('topic:edit', async data => {
        try {
            const resEdit = await axios.post('/api/topics/edit/' + data.id, data.editTopic)
            const newTopics = await axios.get('/api/topics')
            topics = newTopics.data

            socket.emit('topic:edit', {
                msg: {
                    text: resEdit.data,
                    color: true
                },
                topics
            })
        } catch (err) {
            socket.emit('topic:edit', {
                msg: {
                    text: "Topic name existed! Please enter another...",
                    color: false
                },
                topics
            })
        }
    })
})


server.listen(port, () => {
    console.log(`Topic socket server is running on port : ${port}`)
})
