const router = require('express').Router()
const bcrypt = require('bcrypt')

let User = require('../models/userModel')

const validateUser = async (name, psw) => {
    const existUsers = await User.find().then(users => users)
    const checkExist = existUsers.some(existUser => existUser.name === name)

    let err = ''
    if (checkExist)
        err += `Username existed. \n`
    if (name.length < 2)
        err += `Name must be at least 2 characters. \n`
    if (psw.length < 6)
        err += `Password must be at least 6 characters. \n`

    return err
}

const encryptPsw = async (password) => {
    return hashedPassword = await bcrypt.hash(password, 10)
}

const loginUser = async (name, psw) => {
    const user = await User.findOne({ name })
    if (user === null) return { msg: 'Cannot find user' }
    if (user.isLogged) return { msg: 'User is currently logged in' }
    if (await bcrypt.compare(psw, user.psw)) {
        user.isLogged = !user.isLogged
        user.save()
        return { user }
    } else {
        return { msg: 'Wrong Password' }
    }
}

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post(async (req, res) => {
    const err = await validateUser(req.body.name, req.body.psw)

    if (err) res.status(400).json(`${err}`)
    else {
        const name = req.body.name
        const psw = await encryptPsw(req.body.psw)
        const age = Number(req.body.age)
        const position = req.body.position
        const newUser = new User({ name, psw, age, position })

        newUser.save()
            .then(() => res.json('User added!'))
            .catch(() => res.status(400).json(`${err}`))
    }

})

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((user) => res.json(`${user.name} removed.`))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/edit/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(async user => {
            user.name = req.body.name
            user.psw = req.body.psw
            user.age = Number(req.body.age)
            user.position = req.body.position

            const err = await validateUser(user)

            user.save()
                .then(() => res.json('User updated!'))
                .catch(() => res.status(400).json(`${err}`))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/login').post(async (req, res) => {
    const response = await loginUser(req.body.name, req.body.psw)
    try {
        res.json(response)
    } catch (err) {
        res.status(400).json('Error: ' + err)
    }
})

router.route('/logout/:id').post(async (req, res) => {
    const user = await User.findById(req.params.id)
    user.isLogged = !user.isLogged

    user.save()
        .then(() => res.json({
            user,
            msg: `${user.name} Logged out`
        }))
        .catch((err) => res.status(400).json(err))

})


module.exports = router