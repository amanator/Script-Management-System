const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    category:{
        type:String,
        required:true,
    },
    script:{
        type:String,
        required:true,
    },
    scene:{
        type:String,
        required:true,
    },
    group:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        default:""
    },

},{strict:false} );


const Item = mongoose.model('item', ItemSchema);
Item.createIndexes();
module.exports = Item;