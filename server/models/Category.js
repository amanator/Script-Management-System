const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    scene:{
        type:String,
        required:true,
    },
    script:{
        type:String,
        required:true,
    },
    color:{
        type: String,
        default: ""
    },
    name:{
        type: String,
        required: true,
    },
    group:{
        type: Number,
        required: true
    },

});


const Category = mongoose.model('category', CategorySchema);
Category.createIndexes();
module.exports = Category;