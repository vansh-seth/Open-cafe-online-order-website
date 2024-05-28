//Model1.js
const mongoose = require('mongoose');

const schema = {
    name: String,
    password: String,
    email: String,
}

const record = mongoose.model("record",schema);

module.exports = record;