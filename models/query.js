const mongoose = require('mongoose')

const QuerySchema = new mongoose.Schema({
    firstname:{
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type:String
    },
    subject: {
        type: String
    },
    query: {
        type: String
    }
},{timestamps: true})

module.exports =mongoose.model("Query",QuerySchema)