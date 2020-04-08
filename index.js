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


const { userRouter, productRouter, cartRouter} = require('./router')
app.use('/users', userRouter)
app.use('/products', productRouter),
app.use('/cart', cartRouter)

let dataBuah = [
    {
        id: 1,
        nama: 'apel',
        harga: 10000
    },
    {
        id: 2,
        nama: 'jeruk',
        harga: 20000
    },
    {
        id: 3,
        nama: 'mangga',
        harga: 30000
    },
    {
        id: 4,
        nama: 'kiwi',
        harga: 40000
    },
]

app.get('/testing', (req, res) => {
    const nama = req.query.nama
    const min = parseInt(req.query.hargaMin)
    const max = parseInt(req.query.hargaMax)
    let findData = dataBuah

    if(nama){
        findData = findData.filter(val => val.nama.includes(nama))
    }
    if(min || max){
        findData = findData.filter(val => {
            return max ? val.harga <= max : true && min ? val.harga >= min : true
        })
    }    
    res.send(findData)
})

app.get('/try', (req, res) => {
    // testing block of code di dalam try
    try{
        console.lg('masuk try')
        res.status(200).send('Berhasil')
    }catch(err){
        res.status(500).send(err.message)
    }
})


app.listen(port, () => console.log(`API Active at port ${port}`))