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
                res.send('Welcome!')
            }else{
                res.send('Wrong Password')
            }
        }else{
            res.send('Username not found')
        }
    },
    searchByRole : (req, res) => {
        let found = data.filter(val => val.role.includes(req.query.role))
        if(found){
            res.status(200).send(found)
        }else{
            res.status(404).send('<h1>Not Found</h1>')
        }
    }
}