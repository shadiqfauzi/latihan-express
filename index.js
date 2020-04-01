const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 2000

// app.use(bodyParser())
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to my API</h1>')
})
app.post('/', (req, res) => {
    console.log(req.body)
    if(req.body.username === 'shadiq'){
        res.status(200).send('<h1>kuy lanjut</h1>')
    }else{
        res.status(500).send('<h1>ga boleh</h1>')
    }
})
app.patch('/:id', (req, res) => {
    console.log(req.params)
    res.status(200).send('<h1>Patch</h1>')
})
app.put('/', (req, res) => {
    console.log(req.query)
    res.status(200).send('<h1>Put</h1>')
})
app.delete('/', (req, res) => {
    res.status(200).send('<h1>Delete</h1>')
})

// req.body => ambil data dari front end (use body parser)
// req.params => ambil data lewat url endpoint /:id/:password
// req.query => ambil data lewat url lewat '?'

// Router => simpen semua alamat => Url & Method
// Controller => function yang di execute ketika url endpoint & method diakses


const { userRouter } = require('./router')
app.use('/users', userRouter)

app.listen(port, () => console.log(`API Active at port ${port}`))