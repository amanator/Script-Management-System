const mongoose = require('mongoose');
const { Schema } = mongoose;

const SceneSchema = new Schema({
    script:{
        type:String,
        required:true,
        unique:false
    },
    number:{
        type: Number,
        required:true,
        unique: false
    },
    ie:{
        type: String,
        unique:false
    },
    dn:{
        type: String,
        unique:false
    },
    location:{
        type: String,
        unique:false
    },
    description:{
        type: String,
        unique:false
    },
    set:{
        type:String,
        unique:false
    },
    pagecount:{
        type:Number,
        unique:false
    },
    est:{
        type:Number,
        unique:false
    }

});


const Scene = mongoose.model('scene', SceneSchema);
Scene.createIndexes();
module.exports = Scene;