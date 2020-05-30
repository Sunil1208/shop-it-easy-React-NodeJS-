const Query = require('../models/query')

exports.createQuery = (req,res) => {
    const query = new Query(req.body);
    query.save((err,query) => {
        if(err){
            return res.status(400).json({
                error: `${err}`
            })
        }
        res.json({query})
    })
}

exports.getAllQuery = (req,res) => {
    Query.find().exec((err, queries) => {
        if(err){
            return res.status(400).json({
                error: "No queries found"
            })
        }
        res.json(queries)
    })
}