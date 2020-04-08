const db = require('../database')

module.exports = {
    getCart: (req, res) => {
        let sql = `select 
            u.username, 
            p.nama, 
            p.harga,
            c.qty,
            p.harga*c.qty as 'total'
            from cart c 
            join product p 
            on p.id = c.productId
            join users u
            on c.userId = u.id
            where u.id = ${req.params.id}`
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send(results)
        })
    }
}