const db = require('../database')

let data = [
    {
        id: 1,
        username: 'shadiq',
        password: '123',
        role: 'user'
    },
    {
        id: 2,
        username: 'admin',
        password: 'admin',
        role: 'admin'
    },
    {
        id: 3,
        username: 'adminbohong',
        password: 'adminasdsad',
        role: 'admin'
    },
    {
        id: 4,
        username: 'fauzi',
        password: '321',
        role: 'user'
    }
]

module.exports = {
    getAllUsers : (req, res) => {
        res.status(200).send(data)
    },
    getUserById : (req, res) => {
        let userById = data.find(val => val.id === parseInt(req.params.id))
        if(userById){
            res.status(200).send(userById)
        }else{
            res.status(404).send('<h1>Not Found</h1>')
        }
    },
    searchByUsername : (req, res) => {
        let found = data.filter(val => {
            let data = []
            for(i=0;i<req.query.username.length;i++){
                data.push(val.username[i])
            }
            if(data.join('') === req.query.username){
                return true
            }
        })
        if(found){
            res.status(200).send(found)
        }else{
            res.status(404).send('<h1>Not Found</h1>')
        }
    },
    login: (req, res) => {
        let user = req.body.username
        let pass = req.body.password
        let find = data.find(val => val.username === user)
        if(find){
            if(find.password === pass){
                res.status(200).send('<h1>Welcome!</h1>')
            }else{
                res.status(200).send('<h1>Wrong Password</h1>')
            }
        }else{
            res.status(404).send('<h1>Username not found</h1>')
        }
    },
    searchByRole : (req, res) => {
        let found = data.filter(val => val.role.includes(req.query.role))
        if(found){
            res.status(200).send(found)
        }else{
            res.status(404).send('<h1>Not Found</h1>')
        }
    },
    LoginSql: (req, res) => {
        const { username, password } = req.body
        let sql = `select * from users where username = '${username}' and password = '${password}'`
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err.message)
            }else{
                if(results.length !== 0){
                    res.status(200).send({
                        status: 'logged in',
                        message: 'Silahkan masuk brow'
                    })
                }else{
                    res.status(404).send({
                        status: 'Not Found',
                        message: 'Username not found'
                    })
                }
            }
        })
    },
    RegisterSql : (req, res) => {
        // const { username, password } = req.body
        let sql = `insert into users set ?`
        // eval(require('locus'))
        db.query(sql, req.body, (err, results) => {
            if(err){
                if(err.errno === 1062){
                    return res.status(500).send({
                        status: 'Failed',
                        message: 'Username already exists'
                    })
                }
                res.status(500).send(err)
            }else{
                let sql = `select * from users where id = ${results.insertId}`
                db.query(sql, (err, results) => {
                    if(err){
                        res.status(500).send(err.message)
                    }else{
                        if(results.length !== 0){
                            res.status(200).send(results[0])
                        }else{
                            res.status(404).send({
                                status: 'Not Found',
                                message: 'Username not found'
                            })
                        }
                    }
                })
            }
        })
    }
}