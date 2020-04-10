import React, { Component } from 'react'
import BasePage from '../../../basePage/basePage'
import ManageTopic from './manageTopic'
import io from "socket.io-client"
import _ from 'lodash'
import moment from 'moment'
import axios from 'axios'

export default class mainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            isLoading: true,
            currentTotal: 1,
            resultMsg: '',
            msgColor: false,
            editTopic: {},
            currentUser: ''
        };

        this.socket = io('http://localhost:8000')
        this.socket.on('userCount', data => {
            this.setState({ currentTotal: data.counterUser })
        })

        this.socket.on('topics', data => {
            this.setState({ topics: data, isLoading: false })
        })

        this.socket.on('resultMsg', data => {
            this.setState({ resultMsg: data.text, msgColor: data.color })
        })

        this.handleAdd = this.handleAdd.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.logoutHandle = this.logoutHandle.bind(this)
    }

    handleAdd(topicName, content) {
        const newTopic = { topicName, content, }
        this.socket.emit('topic:add', { newTopic })
    }

    handleDelete(deleteId) {
        this.socket.emit('topic:delete', { deleteId })
    }

    handleEdit(topicName, content, id) {
        this.setState({
            editTopic: {}
        })

        const editTopic = { topicName, content, }
        this.socket.emit('topic:edit', { editTopic, id })
    }

    logoutHandle(id) {
        axios.post('/api/users/logout/' + id)
            .then(() => {
                this.socket.disconnect();
                this.props.history.goBack()
            })
            .catch(err => { console.log(err) })
    }

    async componentDidMount() {
        const res = await axios.get('/api/users/')
        const users = res.data

        const currentUser = users.find(user => user._id === this.props.history.location.search.replace('?user=', ''))
        if (!currentUser.isLogged)
            this.props.history.push('/').goBack()

        this.setState({ currentUser, isLoading: false })

    }

    componentWillUnmount() {
        this.socket.disconnect()
    }

    render() {
        const { _id, name } = this.state.currentUser
        const { topics, isLoading, resultMsg, msgColor, editTopic } = this.state

        console.log(topics)
        if (isLoading) {
            return <h2>Loading ... </h2>
        }

        return (
            <BasePage>
                <div className="flex">
                    <h3 className="font-weight-bold m-2 text-white w-75">Total User: {this.state.currentTotal}</h3>
                    <h3 className="font-weight-bold m-2 text-white w-25">Current User: {name}</h3>
                    <button onClick={() => this.logoutHandle(_id)}
                        className="btn btn-dark m-2" >LOGOUT</button>
                </div>
                {resultMsg && <h3 className="text-center font-weight-bold"
                    style={{ color: msgColor ? 'green' : 'red' }}>{resultMsg}</h3>}
                <div className="flex flex-row">
                    <ManageTopic title="Add" btnHandle={this.handleAdd} />
                    {!_.isEmpty(editTopic) && <ManageTopic title="Edit" btnHandle={this.handleEdit}
                        editTopic={editTopic} />}
                </div>
                <h4 className="font-weight-bold m-2">Topic List</h4>
                <div>
                    <table className="table text-center ">
                        <thead className="thead-light ">
                            <tr>
                                <th>Name</th>
                                <th>Content</th>
                                <th>CreatedAt</th>
                                <th>LastUpdateAt</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-white">
                            {topics.map((topic) => (
                                <tr key={topic._id}>
                                    <td>{topic.name}</td>
                                    <td>{topic.content}</td>
                                    <td>{moment(topic.createdAt).format("llll")}</td>
                                    <td>{moment(topic.updatedAt).format("llll")}</td>
                                    <td>
                                        <button onClick={() => this.setState({ editTopic: topic })}
                                            className="btn btn-dark m-2" >Edit</button>
                                        <button onClick={() => this.handleDelete(topic._id)}
                                            className="btn btn-dark m-2" >Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </BasePage >
        )
    }
}
