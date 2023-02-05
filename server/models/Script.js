const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScriptSchema = new Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
    castNumber:{
        type: Number,
        required: true,
        default: 0,
    },
    extraNumber:{
        type: Number,
        required: true,
        default: 0,
    },
});


const Script = mongoose.model('script', ScriptSchema);
Script.createIndexes();
module.exports = Script;