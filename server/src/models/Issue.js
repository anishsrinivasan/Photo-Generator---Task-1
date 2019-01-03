import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Issue = new Schema({
    postTitle:{
        type:String
    },
    postContent:{
        type:String
    },
    status:{
        type:String,
        default:'Open'
    }
})

export default mongoose.model('Issue',Issue)