const db = require('../database')

module.exports = ({
    getProduct: (req, res) => {
        const { orderBy, limit, offset } = req.params
        let sql = `select * from product order by id ${orderBy} limit ${limit} offset ${offset}`
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send(results)
        })
    },
    searchProduct: (req, res) => {
        let { name, hargaMax, hargaMin } = req.query
        let sql = `select * from product where nama like '%${name}%'`
        // if(hargaMin || hargaMax){
        //     sql += ` and`
        // }
        if(hargaMin){
            sql += ` and harga > ${hargaMin}`
        }
        if(hargaMax){
            sql += ` and harga < ${hargaMax}`
        }
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send(results)
        })
    },
    addProduct : (req, res) => {

        // const {nama, harga} = req.body
        // let sql = `insert into product (nama, harga) values ('${nama}', '${harga}')`
        const sql = `insert into product set ?`
        db.query(sql, req.body, (err, results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send({
                status: 'Created',
                message: 'Data Successfully Created'
            })
        })
    },
    editProduct: (req, res) => {
        const { id } = req.params
        const { harga } = req.body
        let sql = `update product set harga = ${harga} where id = ${id}`
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send({
                status: 'Updated',
                message: 'Data Successfully Updated'
            })
        })
    },
    deleteProduct: (req, res) => {
        const { id } = req.params
        let sql = `delete from product where id = ${id};`
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send({
                status: 'Deleted',
                message: 'Data Successfully Deleted'
            })
        })
    }
})